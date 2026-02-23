
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './models/User';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function createAdmin() {
    try {
        console.log('⏳ Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('✅ Connecté.');

        const adminEmail = 'admin@mamsitter.ch';
        const adminPassword = 'AdminPassword2026!';

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('ℹ️ Un compte admin existe déjà avec cet email.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const admin = new User({
            email: adminEmail,
            password: hashedPassword,
            name: 'Super Admin',
            role: 'Admin',
            isVerified: true, // L'admin est vérifié d'office
            isApproved: true
        });

        await admin.save();
        console.log('-----------------------------------');
        console.log('🚀 COMPTE ADMIN CRÉÉ AVEC SUCCÈS');
        console.log(`📧 Email: ${adminEmail}`);
        console.log(`🔑 Mot de passe: ${adminPassword}`);
        console.log('-----------------------------------');

        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur:', err);
        process.exit(1);
    }
}

createAdmin();
