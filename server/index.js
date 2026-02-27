const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const bookingRoutes = require('./routes/booking');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy (required for Render, Railway, and other reverse-proxy hosts)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Contact form rate limit (stricter)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many form submissions. Please try again in an hour.' },
});

// Booking rate limit
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many booking attempts. Please try again in an hour.' },
});

// API Routes
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/booking', bookingLimiter, bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React build in production
const fs = require('fs');
const buildPath = path.resolve(__dirname, '..', 'client', 'build');

if (process.env.NODE_ENV === 'production') {
  console.log('Build path:', buildPath);
  console.log('Build directory exists:', fs.existsSync(buildPath));

  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'), (err) => {
        if (err) {
          console.error('sendFile error:', err);
          res.status(500).send('Server error — please try again.');
        }
      });
    });
  } else {
    console.error('WARNING: client/build not found! Run: cd client && npm run build');
    app.get('*', (req, res) => {
      res.status(503).send('Site is deploying — please refresh in a minute.');
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
