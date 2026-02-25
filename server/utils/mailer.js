const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000, // 10 seconds to connect
    greetingTimeout: 10000,
    socketTimeout: 15000, // 15 seconds for socket
  });
};

const sendEmail = async ({ subject, html, replyTo }) => {
  const mailOptions = {
    from: `"MindCraft Counselling Services" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || 'mindcraftjpr@gmail.com',
    subject,
    html,
    replyTo,
  };

  // In development or if no credentials, log instead of sending
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('--- EMAIL (No credentials) ---');
    console.log('To:', mailOptions.to);
    console.log('Subject:', mailOptions.subject);
    console.log('Reply-To:', replyTo);
    console.log('--- END ---');
    return { messageId: 'no-credentials' };
  }

  try {
    const transporter = createTransporter();

    // Wrap in a timeout promise — never block more than 15 seconds
    const result = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email send timeout (15s)')), 15000)
      ),
    ]);

    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email send failed:', error.message);
    // Don't throw — let the caller continue even if email fails
    return { messageId: 'failed', error: error.message };
  }
};

module.exports = { sendEmail };
