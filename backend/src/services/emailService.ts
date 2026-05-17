import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to: string, subject: string, html: string, attachments: any[] = []) => {
  try {
    // Générer un messageId unique avec le domaine Brevo
    const messageId = `<${crypto.randomUUID()}@smtp-relay.brevo.com>`;

    const fromEmail = (process.env.BREVO_FROM || process.env.BREVO_USER || '').trim();
    const fromName = (process.env.BREVO_FROM_NAME || 'MamSitter').trim();
    const fromHeader = `"${fromName}" <${fromEmail}>`;

    const info = await transporter.sendMail({
      from: fromHeader,
      to,
      subject,
      html,
      messageId,
      attachments,
      headers: {
        'X-Mailer': 'MamSitter Mailer',
      },
    });
    console.log('Email envoyé : %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw error;
  }
};

export const sendBookingConfirmationEmail = async (email: string, mamanName: string, packageName: string, amount: number, currency: string) => {
  const subject = `✅ Réservation confirmée – Forfait ${packageName}`;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const currencyLabel = currency.toUpperCase() === 'EUR' ? '€' : currency.toUpperCase();

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation MamSitter</title>
  <!--[if mso]>
  <style>table,td{font-family:Arial,sans-serif!important;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#FAF7F2;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF7F2;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Main Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(26,60,52,0.06);">

          <!-- Header Band -->
          <tr>
            <td style="background-color:#1A3C34;padding:32px 40px;text-align:center;">
              <img src="cid:logo-mamsitter" alt="MamSitter" width="56" height="56" style="display:block;margin:0 auto 12px auto;border-radius:14px;" />
              <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">MamSitter</span>
            </td>
          </tr>

          <!-- Success Icon + Title -->
          <tr>
            <td style="padding:40px 40px 0 40px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#ECFDF5;border-radius:50%;width:64px;height:64px;text-align:center;vertical-align:middle;">
                    <span style="font-size:32px;line-height:64px;">✓</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:24px 0 8px 0;font-size:26px;font-weight:700;color:#1A3C34;">Paiement confirmé !</h1>
              <p style="margin:0 0 4px 0;font-size:16px;color:#6B7280;line-height:1.5;">Bonjour <strong style="color:#1A3C34;">${mamanName}</strong>,</p>
              <p style="margin:0;font-size:15px;color:#9CA3AF;line-height:1.5;">Votre réservation a été validée avec succès.</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #F3F0EB;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- Receipt Details -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF7F2;border-radius:16px;">

                <!-- Section Title -->
                <tr>
                  <td colspan="2" style="padding:20px 24px 12px 24px;">
                    <span style="font-size:11px;font-weight:700;color:#C4A484;text-transform:uppercase;letter-spacing:2px;">Récapitulatif</span>
                  </td>
                </tr>

                <!-- Forfait -->
                <tr>
                  <td style="padding:8px 24px;font-size:14px;color:#6B7280;">Forfait</td>
                  <td style="padding:8px 24px;font-size:14px;color:#1A3C34;font-weight:700;text-align:right;">${packageName}</td>
                </tr>

                <!-- Date -->
                <tr>
                  <td style="padding:8px 24px;font-size:14px;color:#6B7280;">Date</td>
                  <td style="padding:8px 24px;font-size:14px;color:#1A3C34;font-weight:600;text-align:right;">${dateStr}</td>
                </tr>

                <!-- Statut -->
                <tr>
                  <td style="padding:8px 24px;font-size:14px;color:#6B7280;">Statut</td>
                  <td style="padding:8px 24px;text-align:right;">
                    <span style="display:inline-block;background-color:#D1FAE5;color:#059669;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:4px 14px;border-radius:20px;">Payé</span>
                  </td>
                </tr>

                <!-- Separator -->
                <tr>
                  <td colspan="2" style="padding:8px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr><td style="border-top:1px dashed #E2DDD6;"></td></tr>
                    </table>
                  </td>
                </tr>

                <!-- Total -->
                <tr>
                  <td style="padding:12px 24px 20px 24px;font-size:14px;color:#6B7280;font-weight:700;">Total payé</td>
                  <td style="padding:12px 24px 20px 24px;font-size:24px;color:#1A3C34;font-weight:800;text-align:right;">${amount}${currencyLabel}</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:28px 40px 0 40px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#6B7280;line-height:1.7;">
                Votre MamaSitter a été notifiée. Vous pouvez dès maintenant consulter votre espace et suivre votre réservation.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#C4A484;border-radius:14px;">
                    <a href="${frontendUrl}/#/profile" target="_blank" style="display:inline-block;padding:16px 40px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:1.5px;">
                      Mon Espace
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer inside card -->
          <tr>
            <td style="background-color:#F9F6F1;padding:24px 40px;text-align:center;border-top:1px solid #F3F0EB;">
              <p style="margin:0 0 4px 0;font-size:12px;color:#C4A484;font-weight:600;letter-spacing:1px;">BIENVEILLANCE · SOUTIEN · EXPERTISE</p>
              <p style="margin:0;font-size:11px;color:#D1CCC5;">Ce reçu a été généré automatiquement par MamSitter.</p>
            </td>
          </tr>

        </table>
        <!-- End Main Card -->

        <!-- Legal Footer -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td style="padding:24px 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#B0ACA6;line-height:1.6;">
                &copy; 2026 MamSitter – Tous droits réservés<br/>
                Cet e-mail vous a été envoyé suite à votre achat sur mamsitter.fr
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;

  const logoPath = path.join(process.cwd(), '../public/images/logo-carre.png');
  const attachments = [{
    filename: 'logo-mamsitter.png',
    path: logoPath,
    cid: 'logo-mamsitter'
  }];

  return sendEmail(email, subject, html, attachments);
};
