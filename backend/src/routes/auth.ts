import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../services/emailService';
import { User } from '../models/User';

const router = Router();

// Inscription avec envoi de mail de vérification
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, city, postalCode, bio, hourlyRate, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Un compte existe déjà avec cette adresse email.' });
    }

    // Validation de la robustesse du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Géocodage si city/postalCode sont fournis
    let location = { type: 'Point', coordinates: [0, 0] };
    if (city || postalCode) {
      try {
        const query = `${city || ''} ${postalCode || ''}`.trim();
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=1`);
        const data: any = await response.json();
        if (data.features && data.features.length > 0) {
          location.coordinates = data.features[0].geometry.coordinates;
        }
      } catch (err) {
        console.error('Erreur geocodage inscription:', err);
      }
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      isVerified: false,
      role: role || 'Maman',
      city,
      postalCode,
      bio,
      hourlyRate: hourlyRate ? Number(hourlyRate) : 0,
      avatar,
      location
    });

    await newUser.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/#/verify-email?token=${verificationToken}`;

    try {
      const timestamp = new Date().toLocaleString('fr-FR');
      const emailHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirme ton compte MamSitter</title>
</head>
<body style="margin:0; padding:0; background-color:#F3ede0; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F3ede0; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:450px; background-color:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding:30px 35px; text-align:center;">
              <h1 style="color:#D39280; font-size:22px; margin:0 0 20px 0; font-weight:bold;">BIENVENUE CHEZ MAMSITTER</h1>
              <p style="color:#333333; font-size:16px; margin:0 0 15px 0; line-height:1.5;">Bonjour ${name || 'Maman'} !</p>
              <p style="color:#555555; font-size:14px; margin:0 0 25px 0; line-height:1.6;">Merci de t'être inscrit(e) sur MamSitter. Clique sur le bouton ci-dessous pour activer ton compte et commencer à utiliser nos services.</p>
              <a href="${verificationUrl}" style="display:inline-block; background-color:#D39280; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:14px;">Confirmer mon email</a>
              <p style="color:#888888; font-size:12px; margin:25px 0 0 0; line-height:1.5;">Si tu n'as pas créé de compte, ignore simplement cet email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 35px; border-top:1px solid #eeeeee; text-align:center;">
              <p style="color:#999999; font-size:11px; margin:0;">© 2026 MamSitter - Tous droits réservés</p>
              <p style="color:#bbbbbb; font-size:10px; margin:8px 0 0 0;">Email envoyé le ${timestamp}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
      console.log('📧 Envoi email de vérification à:', email);
      const result = await sendEmail(email, 'Confirme ton compte MamSitter', emailHtml);
      console.log('✅ Email de vérification envoyé:', result);
    } catch (e) {
      console.error("❌ Erreur envoi email de vérification:", e);
    }

    res.status(201).json({ message: 'Inscription réussie. Vérifie tes emails pour activer ton compte.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l’inscription.' });
  }
});

// Vérification de l'email
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    console.log('🔍 Token reçu pour vérification:', token);

    const user = await User.findOne({ verificationToken: token });
    console.log('👤 Utilisateur trouvé:', user ? user.email : 'Aucun');

    if (!user) {
      // Idempotence : si le token n'existe plus, renvoyer un message chaleureux
      // (le token peut avoir déjà été utilisé). On retourne 200 pour éviter
      // d'afficher une erreur aux utilisateurs qui cliquent plusieurs fois.
      console.log('ℹ️ Token non trouvé — probable réutilisation du lien');
      return res.json({ message: "Ton compte est déjà vérifié ou le lien a déjà été utilisé. Tu peux te connecter." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    console.log('✅ Compte vérifié avec succès:', user.email);

    res.json({ message: 'Email vérifié avec succès ! Tu peux maintenant te connecter.' });
  } catch (error) {
    console.error('❌ Erreur vérification:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification.' });
  }
});

// Connexion (ne marche que si vérifié)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'Merci de confirmer ton email avant de te connecter.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
});

// 1. Demande de réinitialisation de mot de passe
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // On envoie une réponse positive même si l'email n'existe pas
      // pour ne pas révéler quels emails sont dans la base de données.
      return res.json({ message: 'Si un compte est associé à cet email, un lien de réinitialisation a été envoyé.' });
    }

    // Générer le token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 heure
    await user.save();

    // Envoyer l'email
    const resetUrl = `${process.env.FRONTEND_URL}/#/reset-password?token=${resetToken}`;
    const timestamp = new Date().toLocaleString('fr-FR');
    const emailHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réinitialisation de mot de passe MamSitter</title>
</head>
<body style="margin:0; padding:0; background-color:#F3ede0; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F3ede0; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:450px; background-color:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding:30px 35px; text-align:center;">
              <h1 style="color:#D39280; font-size:22px; margin:0 0 20px 0; font-weight:bold;">RÉINITIALISER TON MOT DE PASSE</h1>
              <p style="color:#333333; font-size:14px; margin:0 0 15px 0; line-height:1.6;">Bonjour ${user.name || 'cher(e) membre'} !</p>
              <p style="color:#555555; font-size:14px; margin:0 0 25px 0; line-height:1.6;">Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous pour en créer un nouveau. Ce lien expire dans 1 heure.</p>
              <a href="${resetUrl}" style="display:inline-block; background-color:#D39280; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:14px;">Réinitialiser le mot de passe</a>
              <p style="color:#888888; font-size:12px; margin:25px 0 0 0; line-height:1.5;">Si tu n'as pas demandé cette réinitialisation, ignore simplement cet email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 35px; border-top:1px solid #eeeeee; text-align:center;">
              <p style="color:#999999; font-size:11px; margin:0;">© 2026 MamSitter - Tous droits réservés</p>
              <p style="color:#bbbbbb; font-size:10px; margin:8px 0 0 0;">Email envoyé le ${timestamp}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await sendEmail(user.email, 'Réinitialisation de votre mot de passe MamSitter', emailHtml);

    res.json({ message: 'Si un compte est associé à cet email, un lien de réinitialisation a été envoyé.' });

  } catch (error) {
    console.error('❌ Erreur forgot-password:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// 2. Réinitialisation effective du mot de passe
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Le lien est invalide ou a expiré. Veuillez refaire une demande.' });
    }

    // Validation de la robustesse du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
      });
    }

    // Mettre à jour le mot de passe
    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: 'Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.' });

  } catch (error) {
    console.error('❌ Erreur reset-password:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

export default router;