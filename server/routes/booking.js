const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendEmail } = require('../utils/mailer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Validate booking data
const validateBooking = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('service').trim().notEmpty().withMessage('Please select a service'),
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('time').trim().notEmpty().withMessage('Time slot is required'),
  body('mode').trim().notEmpty().withMessage('Session mode is required'),
];

// Save booking to JSON file (backup — never lose a booking)
const saveBooking = async (booking) => {
  const dataDir = path.join(__dirname, '..', 'data');
  const filePath = path.join(dataDir, 'bookings.json');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let bookings = [];
  if (fs.existsSync(filePath)) {
    try {
      bookings = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      bookings = [];
    }
  }

  bookings.push({
    ...booking,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    status: 'pending',
    submittedAt: new Date().toISOString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
  return bookings[bookings.length - 1];
};

router.post('/', validateBooking, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, service, date, time, mode, notes } = req.body;

    // 1. Always save to JSON file first
    const booking = await saveBooking({ name, email, phone, service, date, time, mode, notes });
    console.log(`📅 New booking: ${name} — ${service} on ${date} at ${time} [${booking.id}]`);

    // 2. Send email notification
    const modeText = mode === 'online' ? '🖥️ Online (Google Meet)' : '🏥 In-Person (Jaipur Clinic)';
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2d7a6f, #3a9e8f); padding: 30px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">📅 New Session Booking!</h2>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Someone booked a session via the website.</p>
        </div>
        <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 12px 12px;">
          <div style="background: white; border-radius: 10px; padding: 20px; border-left: 4px solid #c4933f; margin-bottom: 20px;">
            <h3 style="margin: 0 0 6px; color: #2d7a6f; font-size: 18px;">${service}</h3>
            <p style="margin: 0; color: #6b7280; font-size: 15px;"><strong>${date}</strong> at <strong>${time}</strong></p>
            <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${modeText}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 80px; vertical-align: top;">Name:</td>
              <td style="padding: 10px 0; color: #6b7280;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151; vertical-align: top;">Phone:</td>
              <td style="padding: 10px 0; color: #6b7280;"><a href="tel:${phone}" style="color: #2d7a6f;">${phone}</a></td>
            </tr>
            ${email ? `<tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151; vertical-align: top;">Email:</td>
              <td style="padding: 10px 0; color: #6b7280;"><a href="mailto:${email}" style="color: #2d7a6f;">${email}</a></td>
            </tr>` : ''}
            ${notes ? `<tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151; vertical-align: top;">Notes:</td>
              <td style="padding: 10px 0; color: #6b7280; font-style: italic;">${notes}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 600;">
              ⏰ Please confirm this booking within 2 hours via WhatsApp or call.
            </p>
          </div>
          <p style="margin-top: 16px; font-size: 12px; color: #9ca3af; text-align: center;">
            Booking ID: ${booking.id} · Submitted via MindCraft website
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      subject: `📅 New Booking: ${service} — ${name} (${date} ${time})`,
      html: emailHtml,
      replyTo: email || undefined,
    });

    res.json({
      success: true,
      bookingId: booking.id,
      message: 'Booking request received! We will confirm within 2 hours.',
    });
  } catch (error) {
    console.error('Booking error:', error);

    // Even if email fails, the booking is already saved to JSON
    res.json({
      success: true,
      message: 'Booking received! We will get back to you soon.',
    });
  }
});

// GET bookings (admin only)
router.get('/', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const filePath = path.join(__dirname, '..', 'data', 'bookings.json');
    if (!fs.existsSync(filePath)) {
      return res.json({ bookings: [], count: 0 });
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ bookings: data, count: data.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read bookings' });
  }
});

module.exports = router;
