
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './models/User';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function cleanupUsers() {
    try {
        console.log('⏳ Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('✅ Connecté.');

        // Supprimer tous les utilisateurs sauf celui avec le rôle Admin
        const result = await User.deleteMany({ role: { $ne: 'Admin' } });

        console.log(`✅ Nettoyage terminé. ${result.deletedCount} utilisateur(s) supprimé(s).`);
        console.log('ℹ️ Le compte Admin a été conservé.');

        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur:', err);
        process.exit(1);
    }
}

cleanupUsers();
