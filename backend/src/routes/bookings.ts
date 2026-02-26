import express from 'express';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import Stripe from 'stripe';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

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

        // Paramètres Stripe Connect (si stripeAccountId existe)
        const sessionOptions: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: `Forfait ${packageName} - MamSitter: ${sitter.name}`,
                        },
                        unit_amount: amountInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/#/booking-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/#/services`,
            client_reference_id: booking._id.toString(),
            customer_email: req.user.email,
        };

        // Si la mamasitter a un compte Stripe Connect, on active le split
        if (sitter.stripeAccountId) {
            sessionOptions.payment_intent_data = {
                application_fee_amount: adminShare,
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
        res.status(500).json({ error: err.message });
    }
});

// Webhook Stripe (à configurer plus tard pour plus de sécurité)
// Pour l'instant, on peut faire une route de vérification simple
router.get('/verify-session/:sessionId', authenticate as any, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        if (session.payment_status === 'paid') {
            const booking = await Booking.findOne({ stripeSessionId: req.params.sessionId });
            if (booking && booking.status === 'pending') {
                booking.status = 'paid';
                booking.paymentIntentId = session.payment_intent as string;
                await booking.save();
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
