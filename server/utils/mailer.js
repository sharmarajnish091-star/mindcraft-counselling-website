const nodemailer = require('nodemailer');

// Primary: Resend (HTTPS API — works on Render free tier)
// Fallback: Gmail SMTP (works locally, blocked on some hosting)
const sendViaResend = async ({ from, to, subject, html, replyTo }) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: from || `MindCraft Counselling <${process.env.RESEND_FROM || 'onboarding@resend.dev'}>`,
      to: [to],
      subject,
      html,
      reply_to: replyTo || undefined,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Resend API error ${response.status}: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
};

// Fallback: Gmail SMTP (for local dev or if Resend not configured)
const sendViaGmail = async ({ from, to, subject, html, replyTo }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const result = await Promise.race([
    transporter.sendMail({ from, to, subject, html, replyTo }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gmail SMTP timeout (15s)')), 15000)
    ),
  ]);

  return result;
};

const sendEmail = async ({ subject, html, replyTo }) => {
  const to = process.env.EMAIL_TO || 'mindcraftjpr@gmail.com';
  const from = process.env.RESEND_API_KEY
    ? `MindCraft Counselling <${process.env.RESEND_FROM || 'onboarding@resend.dev'}>`
    : `"MindCraft Counselling Services" <${process.env.EMAIL_USER}>`;

  // No credentials at all — log to console
  if (!process.env.RESEND_API_KEY && !process.env.EMAIL_USER) {
    console.log('--- EMAIL (No credentials configured) ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Reply-To:', replyTo);
    console.log('--- END ---');
    return { messageId: 'no-credentials' };
  }

  try {
    let result;

    // Try Resend first (HTTPS — works on all hosting including Render free tier)
    if (process.env.RESEND_API_KEY) {
      console.log('Sending email via Resend API...');
      result = await sendViaResend({ from, to, subject, html, replyTo });
      console.log('Email sent via Resend:', result.id || result.messageId);
      return result;
    }

    // Fallback to Gmail SMTP
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Sending email via Gmail SMTP...');
      result = await sendViaGmail({ from, to, subject, html, replyTo });
      console.log('Email sent via Gmail:', result.messageId);
      return result;
    }
  } catch (error) {
    console.error('Email send failed:', error.message);
    // Don't throw — let the caller continue even if email fails
    return { messageId: 'failed', error: error.message };
  }
};

module.exports = { sendEmail };
