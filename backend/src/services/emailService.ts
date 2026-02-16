import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
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
