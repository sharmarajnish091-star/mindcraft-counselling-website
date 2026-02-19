const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendEmail } = require('../utils/mailer');
const { saveSubmission } = require('../utils/storage');

const router = express.Router();

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('service').trim().notEmpty().withMessage('Please select a service'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, service, message } = req.body;

    // 1. Always save to JSON file (backup — never lose a lead)
    const submission = { name, email, phone, service, message };
    await saveSubmission(submission);
    console.log(`New inquiry saved: ${name} — ${service}`);

    // 2. Send email notification
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f766e, #14b8a6); padding: 30px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">New Inquiry from Website</h2>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Someone is interested in your services!</p>
        </div>
        <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 100px; vertical-align: top;">Name:</td>
              <td style="padding: 12px 0; color: #6b7280;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151; vertical-align: top;">Email:</td>
              <td style="padding: 12px 0; color: #6b7280;"><a href="mailto:${email}" style="color: #0f766e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151; vertical-align: top;">Phone:</td>
              <td style="padding: 12px 0; color: #6b7280;"><a href="tel:${phone}" style="color: #0f766e;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #374151; vertical-align: top;">Service:</td>
              <td style="padding: 12px 0; color: #6b7280;">${service}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #14b8a6;">
            <p style="font-weight: bold; color: #374151; margin: 0 0 8px;">Message:</p>
            <p style="color: #6b7280; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af; text-align: center;">
            This inquiry was submitted via your website contact form.
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      subject: `New Inquiry: ${service} — from ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    res.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Even if email fails, the data is already saved to JSON
    res.json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you soon.',
    });
  }
});

// GET endpoint to view all submissions (protected — for admin use)
router.get('/submissions', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', 'data', 'submissions.json');

    if (!fs.existsSync(filePath)) {
      return res.json({ submissions: [], count: 0 });
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ submissions: data, count: data.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read submissions' });
  }
});

module.exports = router;
