import { Router, Request, Response } from 'express';
import { User } from '../models/User';

import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, (req: any, res: Response) => {
  res.json(req.user);
});

// Route de mise à jour du profil
router.put('/me', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const { name, bio, hourlyRate, city, postalCode, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable.' });
      return;
    }

    // Mise à jour classique
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (hourlyRate !== undefined) user.hourlyRate = Number(hourlyRate);
    if (avatar !== undefined) user.avatar = avatar;

    // Si on a le rôle MamaSitter et qu'on modifie son adresse, il faut recalculer les coordonnées
    let locationUpdated = false;
    if (city !== undefined && city !== user.city) {
      user.city = city;
      locationUpdated = true;
    }
    if (postalCode !== undefined && postalCode !== user.postalCode) {
      user.postalCode = postalCode;
      locationUpdated = true;
    }

    if (locationUpdated && (user.city || user.postalCode)) {
      try {
        const query = `${user.city || ''} ${user.postalCode || ''}`.trim();
        const geocodeRes = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=1`);
        const geocodeData: any = await geocodeRes.json();

        if (geocodeData.features && geocodeData.features.length > 0) {
          user.location = {
            type: 'Point',
            coordinates: geocodeData.features[0].geometry.coordinates
          } as any;
        }
      } catch (err) {
        console.error('Erreur géocodage mise à jour profil:', err);
      }
    }

    await user.save();

    res.json({ message: 'Profil mis à jour avec succès.', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du profil.' });
  }
});

// Route de recherche des MamaSitters (Accès réservé aux Mamans et Admin)
router.get('/mamasitters', authenticate, authorize('Maman', 'Admin'), async (req: any, res: Response): Promise<void> => {
  try {
    const { city, postalCode, lat, lng, radius } = req.query;

    // Filtres de base
    const query: any = { role: 'MamaSitter' };

    if (city) {
      // Regex case-insensitive pour la ville
      query.city = { $regex: new RegExp(city as string, 'i') };
    }

    if (postalCode) {
      query.postalCode = postalCode;
    }

    // Filtre géographique
    if (lat && lng && radius) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);
      const radiusKm = parseFloat(radius as string);

      if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(radiusKm)) {
        // Formule pour MongoDB $centerSphere: [lng, lat], radians (radius / earth radius)
        const earthRadiusKm = 6378.1;
        query.location = {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], radiusKm / earthRadiusKm]
          }
        };
      }
    }

    const mamasitters = await User.find(query).select('-password -passwordResetToken -verificationToken');
    res.json(mamasitters);
  } catch (error) {
    console.error('Erreur lors de la recherche des MamaSitters:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des MamaSitters.' });
  }
});

export default router;