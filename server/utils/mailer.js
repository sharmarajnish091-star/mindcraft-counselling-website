const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ subject, html, replyTo }) => {
  const mailOptions = {
    from: `"MindCraft Counselling Services" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || 'mindcraftjpr@gmail.com',
    subject,
    html,
    replyTo,
  };

  // In development, log instead of sending
  if (!process.env.EMAIL_USER || process.env.NODE_ENV === 'development') {
    console.log('--- EMAIL (Dev Mode) ---');
    console.log('To:', mailOptions.to);
    console.log('Subject:', mailOptions.subject);
    console.log('Reply-To:', replyTo);
    console.log('--- END ---');
    return { messageId: 'dev-mode' };
  }

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
