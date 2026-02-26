import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';
import { User } from './models/User';
import { geocode } from './utils/geocode';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Migration : re-géocoder toutes les MamaSitters pour s'assurer de l'exactitude (FR/CH)
async function migrateCoordinates() {
  try {
    // On récupère toutes les MamaSitters
    const sitters = await User.find({ role: 'MamaSitter' });

    if (sitters.length === 0) {
      console.log('✅ Aucune MamaSitter à géocoder.');
      return;
    }

    console.log(`🔄 Migration: Vérification du géocodage pour ${sitters.length} MamaSitter(s)...`);

    for (const sitter of sitters) {
      if (!sitter.city && !sitter.postalCode) continue;

      const query = `${sitter.city || ''} ${sitter.postalCode || ''}`.trim();

      // On re-géocode systématiquement pour cette fois pour être sûr
      // (On pourra remettre un filtre plus tard si besoin)
      const coords = await geocode(query);

      if (coords) {
        // Est-ce que les coordonnées ont changé ?
        const oldCoords = sitter.location?.coordinates || [0, 0];
        if (oldCoords[0] !== coords[0] || oldCoords[1] !== coords[1]) {
          sitter.location = { type: 'Point', coordinates: coords } as any;
          await sitter.save();
          console.log(`  ✅ "${sitter.name}" corrigé: (${query}) → [${coords}]`);
        } else {
          console.log(`  ℹ️ "${sitter.name}" déjà correct.`);
        }
      } else {
        console.log(`  ⚠️ "${sitter.name}" (${query}) → impossible à géocoder`);
      }

      // Respecter le rate limit de Nominatim (1 req/sec)
      await new Promise(r => setTimeout(r, 1100));
    }

    console.log('✅ Migration des coordonnées terminée.');
  } catch (err) {
    console.error('❌ Erreur migration coordonnées:', err);
  }
}

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(async () => {
    console.log('✅ Connecté à MongoDB');
    await migrateCoordinates();
  })
  .catch(err => console.error('❌ Erreur connexion MongoDB:', err));

// Autoriser les requêtes depuis le frontend (localhost:5173 et 5174)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
