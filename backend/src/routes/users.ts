import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { authenticate, authorize } from '../middleware/auth';
import { geocode, haversineDistance } from '../utils/geocode';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const router = Router();

router.get('/me', authenticate, (req: any, res: Response) => {
  res.json(req.user);
});

// Route de mise à jour du profil
router.put('/me', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const { name, bio, hourlyRate, city, postalCode, avatar, rib, bankInfo } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable.' });
      return;
    }

    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (hourlyRate !== undefined) user.hourlyRate = Number(hourlyRate);
    if (avatar !== undefined) user.avatar = avatar;
    if (rib !== undefined) user.rib = rib;
    if (bankInfo !== undefined) user.bankInfo = bankInfo;

    let locationUpdated = false;
    if (city !== undefined && city !== user.city) {
      user.city = city;
      locationUpdated = true;
    }
    if (postalCode !== undefined && postalCode !== user.postalCode) {
      user.postalCode = postalCode;
      locationUpdated = true;
    }

    // Re-géocoder si l'adresse a changé OU si les coordonnées sont à [0,0]
    const hasZeroCoords = !user.location ||
      (user.location.coordinates[0] === 0 && user.location.coordinates[1] === 0);

    if ((locationUpdated || hasZeroCoords) && (user.city || user.postalCode)) {
      const query = `${user.city || ''} ${user.postalCode || ''}`.trim();
      const coords = await geocode(query);
      if (coords) {
        user.location = { type: 'Point', coordinates: coords } as any;
      }
    }

    await user.save();
    res.json({ message: 'Profil mis à jour avec succès.', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du profil.' });
  }
});

// --- STRIPE CONNECT ONBOARDING ---

router.post('/create-stripe-account', authenticate, authorize('MamaSitter'), async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    let stripeAccountId = user.stripeAccountId;

    // 1. Créer le compte Stripe Express si pas déjà fait
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      stripeAccountId = account.id;
      user.stripeAccountId = stripeAccountId;
      await user.save();
    }

    // 2. Créer le Account Link (Onboarding)
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${process.env.FRONTEND_URL}/#/profile?stripe=refresh`,
      return_url: `${process.env.FRONTEND_URL}/#/profile?stripe=success`,
      type: 'account_onboarding',
    });

    res.json({ url: accountLink.url });
  } catch (err: any) {
    console.error('Stripe Connect error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/stripe-status', authenticate, authorize('MamaSitter'), async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.stripeAccountId) {
      return res.json({ connected: false });
    }

    const account = await stripe.accounts.retrieve(user.stripeAccountId);
    res.json({
      connected: true,
      details_submitted: account.details_submitted,
      payouts_enabled: account.payouts_enabled,
      account_id: user.stripeAccountId
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du statut Stripe' });
  }
});

// --- ROUTES ADMIN ---

router.get('/pending-sitters', authenticate, authorize('Admin'), async (_req: Request, res: Response) => {
  try {
    const sitters = await User.find({ role: 'MamaSitter', isApproved: false }).select('-password');
    res.json(sitters);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

router.post('/approve-sitter', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  try {
    const { userId, approve } = req.body;
    const user = await User.findById(userId);

    if (!user || user.role !== 'MamaSitter') {
      return res.status(404).json({ error: 'MamaSitter introuvable.' });
    }

    if (approve) {
      user.isApproved = true;
      user.approvedAt = new Date();

      // Re-géocoder si les coordonnées sont absentes
      const hasZeroCoords = !user.location ||
        (user.location.coordinates[0] === 0 && user.location.coordinates[1] === 0);
      if (hasZeroCoords && (user.city || user.postalCode)) {
        const query = `${user.city || ''} ${user.postalCode || ''}`.trim();
        const coords = await geocode(query);
        if (coords) {
          user.location = { type: 'Point', coordinates: coords } as any;
        }
      }

      await user.save();
      res.json({ message: 'MamaSitter approuvée avec succès.' });
    } else {
      res.json({ message: 'Demande laissée en attente ou traitée.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

router.get('/all-sitters', authenticate, authorize('Admin'), async (_req: Request, res: Response) => {
  try {
    // On exclut les infos bancaires sensibles des listes de masse
    const sitters = await User.find({ role: 'MamaSitter' })
      .select('-password -rib -bankInfo')
      .sort({ createdAt: -1 });
    res.json(sitters);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Route ultra-sécurisée pour récupérer le RIB d'un utilisateur spécifique (Admin uniquement)
router.get('/:id/bank-details', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('rib bankInfo name');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    // Log d'audit (pour savoir quel admin a consulté quel RIB)
    console.log(`[AUDIT] Admin ${(req as any).user.email} a consulté les infos bancaires de ${user.name} (${user._id})`);

    res.json({
      rib: user.rib,
      bankInfo: user.bankInfo
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const updates = req.body;
    delete updates.password;
    Object.assign(user, updates);
    await user.save();
    res.json({ message: 'Utilisateur mis à jour', user });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/ban-user', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  try {
    const { userId, ban } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }

    user.isBanned = ban;
    user.bannedAt = ban ? new Date() : undefined;
    await user.save();

    res.json({ message: ban ? 'Utilisateur banni.' : 'Utilisateur réactivé.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// ====================================================================
// Route de recherche des MamaSitters — approche Haversine fiable
// ====================================================================
router.get('/mamasitters', authenticate, authorize('Maman', 'MamaSitter', 'Admin'), async (req: any, res: Response): Promise<void> => {
  try {
    const { city, postalCode, lat, lng, radius } = req.query;

    const latitude = lat ? parseFloat(lat as string) : undefined;
    const longitude = lng ? parseFloat(lng as string) : undefined;
    const radiusKm = radius ? parseFloat(radius as string) : 0;

    // Filtres de base
    const dbQuery: any = {
      role: 'MamaSitter',
      isApproved: true,
      isBanned: { $ne: true }
    };

    // Si PAS de rayon : filtres textuels classiques
    if (!radiusKm || radiusKm <= 0 || latitude === undefined || longitude === undefined) {
      if (city) {
        dbQuery.city = { $regex: new RegExp(city as string, 'i') };
      }
      if (postalCode) {
        dbQuery.postalCode = postalCode;
      }

      const results = await User.find(dbQuery).select('-password -passwordResetToken -verificationToken -idCard -rib -bankInfo');
      res.json(results);
      return;
    }

    // ===== RECHERCHE PAR RAYON (Haversine) =====
    // On récupère TOUTES les MamaSitters approuvées, puis on filtre par distance
    const allSitters = await User.find(dbQuery).select('-password -passwordResetToken -verificationToken -idCard -rib -bankInfo');

    const filtered: any[] = [];

    for (const sitter of allSitters) {
      let sLng = sitter.location?.coordinates?.[0] ?? 0;
      let sLat = sitter.location?.coordinates?.[1] ?? 0;

      // Si les coordonnées sont à [0,0], tenter un re-géocodage à la volée
      if (sLng === 0 && sLat === 0 && (sitter.city || sitter.postalCode)) {
        const q = `${sitter.city || ''} ${sitter.postalCode || ''}`.trim();
        const coords = await geocode(q);
        if (coords) {
          sLng = coords[0];
          sLat = coords[1];
          // Sauvegarder pour ne plus avoir à refaire
          sitter.location = { type: 'Point', coordinates: coords } as any;
          await sitter.save();
          console.log(`🔄 Re-géocodé "${sitter.name}" (${q}) → [${coords}]`);
        } else {
          // Coordonnées introuvables, on skip
          continue;
        }
      }

      // Ignorer les sitters toujours à [0,0]
      if (sLng === 0 && sLat === 0) continue;

      const distance = haversineDistance(latitude, longitude, sLat, sLng);

      if (distance <= radiusKm) {
        const sitterObj = sitter.toObject();
        (sitterObj as any)._distance = Math.round(distance * 10) / 10; // distance en km
        filtered.push(sitterObj);
      }
    }

    // Trier par distance croissante
    filtered.sort((a, b) => a._distance - b._distance);

    res.json(filtered);
  } catch (error) {
    console.error('Erreur lors de la recherche des MamaSitters:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des MamaSitters.' });
  }
});

export default router;