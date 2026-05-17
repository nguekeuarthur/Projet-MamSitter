import express from 'express';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import Stripe from 'stripe';
import { authenticate, authorize } from '../middleware/auth';
import { sendBookingConfirmationEmail } from '../services/emailService';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Webhook Stripe : Cette route doit recevoir le corps de la requête en RAW (brut)
// Elle est appelée par Stripe directement
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        if (!sig || !endpointSecret) {
            console.error('[STRIPE WEBHOOK] Signature ou Secret manquant');
            return res.status(400).send('Webhook Error: Missing signature or secret');
        }
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`[STRIPE WEBHOOK ERROR]: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gestion des événements
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.client_reference_id;

        console.log(`[STRIPE WEBHOOK] Paiement réussi pour la session ${session.id}, Booking: ${bookingId}`);

        if (bookingId) {
            const booking = await Booking.findById(bookingId);
            if (booking && booking.status === 'pending') {
                booking.status = 'paid';
                booking.paymentIntentId = session.payment_intent as string;
                await booking.save();
                console.log(`[STRIPE WEBHOOK] Réservation ${bookingId} marquée comme PAYÉE`);

                // On récupère les infos de la maman depuis la DB
                await booking.populate('mamanId', 'name email');
                const maman = booking.mamanId as any;

                // Envoyer l'email de confirmation à la maman
                try {
                    await sendBookingConfirmationEmail(
                        session.customer_details?.email || maman?.email || '',
                        maman?.name || session.customer_details?.name || 'Maman',
                        booking.packageName,
                        booking.amount,
                        booking.currency
                    );
                } catch (emailErr) {
                    console.error('[STRIPE WEBHOOK] Erreur envoi email:', emailErr);
                }
            }
        }
    }

    res.json({ received: true });
});

// Créer une session de paiement
router.post('/create-checkout-session', authenticate as any, async (req: any, res) => {
    try {
        const { sitterId, packageName, amount, currency } = req.body;
        const mamanId = req.user._id;

        // Vérifier la mamasitter
        const sitter = await User.findById(sitterId);
        if (!sitter || sitter.role !== 'MamaSitter') {
            return res.status(404).json({ error: 'MamaSitter non trouvée' });
        }

        // Calcul des parts (27% admin, 73% mamsitter)
        // Note: Stripe travaille en centimes
        const amountInCents = Math.round(amount * 100);
        const adminShare = Math.round(amountInCents * 0.27);
        const sitterShare = amountInCents - adminShare;

        // Création de l'objet de réservation en base (statut pending)
        const booking = new Booking({
            mamanId,
            sitterId,
            packageName,
            amount,
            currency,
            splitAdminAmount: adminShare / 100,
            splitSitterAmount: sitterShare / 100,
            status: 'pending'
        });
        await booking.save();

        // Configuration de la session Stripe
        const sessionOptions: any = {
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency.toLowerCase(),
                    product_data: {
                        name: `Forfait ${packageName} - MamSitter: ${sitter.name}`,
                    },
                    unit_amount: amountInCents,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/#/booking-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/#/booking/${sitterId}?booking=cancelled`,
            metadata: {
                bookingId: booking._id.toString(),
                sitterId: sitterId.toString(),
                mamanId: (req as any).user._id.toString(),
            },
            client_reference_id: booking._id.toString(),
            customer_email: (req as any).user.email,
        };

        // Split automatique via Stripe Connect si configuré
        if (sitter.stripeAccountId) {
            sessionOptions.payment_intent_data = {
                application_fee_amount: Math.round((booking.splitAdminAmount || 0) * 100),
                transfer_data: {
                    destination: sitter.stripeAccountId,
                },
            };
        }

        const session = await stripe.checkout.sessions.create(sessionOptions);

        booking.stripeSessionId = session.id;
        await booking.save();

        res.json({ id: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Session Error:', err);
        res.status(500).json({
            error: err.message,
            tip: "Si vous voyez une erreur de compte Connect, assurez-vous que la MamaSitter a bien fini son onboarding Stripe."
        });
    }
});

// Route de vérification manuelle (en fallback du webhook)
router.get('/verify-session/:sessionId', authenticate as any, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        if (session.payment_status === 'paid') {
            const booking = await Booking.findOne({ stripeSessionId: req.params.sessionId });
            if (booking && booking.status === 'pending') {
                booking.status = 'paid';
                booking.paymentIntentId = session.payment_intent as string;
                await booking.save();

                // On récupère les infos de la maman
                await booking.populate('mamanId', 'name email');
                const maman = booking.mamanId as any;

                // Envoyer l'email de confirmation
                try {
                    await sendBookingConfirmationEmail(
                        session.customer_details?.email || maman?.email || '',
                        maman?.name || session.customer_details?.name || 'Maman',
                        booking.packageName,
                        booking.amount,
                        booking.currency
                    );
                } catch (emailErr) {
                    console.error('[VERIFY SESSION] Erreur envoi email:', emailErr);
                }
            }
            return res.json({ status: 'paid', booking });
        }
        res.json({ status: session.payment_status });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Voir toutes les réservations
router.get('/all', authenticate as any, authorize('Admin') as any, async (req: any, res) => {
    try {
        const bookings = await Booking.find()
            .populate('mamanId', 'name email')
            .populate('sitterId', 'name email')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

