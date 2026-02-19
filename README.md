# Surbhi Sharma — Counsellor Psychologist Website

A modern, full-stack portfolio & booking website built with **React** (frontend) and **Node.js/Express** (backend).

---

## Features

- Modern dark theme with glassmorphism design
- Animated sections with Framer Motion
- Services showcase with booking links
- Professional experience timeline
- Education & certifications display
- Therapeutic approach walkthrough
- FAQ accordion section
- **Working contact form** with email notifications (via Nodemailer)
- Rate-limited API with input validation
- Fully responsive (mobile, tablet, desktop)
- SEO-optimized meta tags

---

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 18, Framer Motion, React Icons |
| Backend  | Node.js, Express                    |
| Email    | Nodemailer (SMTP)                   |
| Security | Helmet, CORS, express-rate-limit    |

---

## Quick Start (Local Development)

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd surbhi-sharma-website

# 2. Install all dependencies
npm run install-all

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your email credentials (for contact form)

# 4. Run in development mode (both server + client)
npm run dev
```

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`

---

## Environment Variables (.env)

```
PORT=5000
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=mindcraftjpr@gmail.com
```

> **Gmail Setup**: Go to Google Account → Security → 2-Step Verification → App Passwords → Generate a new app password for "Mail".

---

## Production Build & Deployment

### Build

```bash
npm run build    # Builds the React app into client/build/
```

### Run in Production

```bash
NODE_ENV=production npm start
```

The Express server serves both the API and the React build from a single port.

---

## Deployment Options

### Option 1: Railway / Render (Recommended)

1. Push code to GitHub
2. Connect repo to [Railway](https://railway.app) or [Render](https://render.com)
3. Set environment variables in the dashboard
4. Deploy — it auto-detects Node.js

### Option 2: VPS (DigitalOcean / AWS EC2)

```bash
# On server
git clone <repo>
cd surbhi-sharma-website
npm run install-all
npm run build
NODE_ENV=production PORT=80 node server/index.js
```

Use **PM2** for process management:
```bash
npm install -g pm2
pm2 start server/index.js --name surbhi-website
pm2 save
pm2 startup
```

### Option 3: Vercel (Frontend) + Railway (Backend)

- Deploy `client/` folder to Vercel
- Deploy root to Railway for the API
- Update the `proxy` in client/package.json to your Railway URL

---

## Project Structure

```
surbhi-sharma-website/
├── package.json              # Root (server dependencies + scripts)
├── .env.example              # Environment template
├── .gitignore
├── README.md
├── server/
│   ├── index.js              # Express server entry
│   ├── routes/
│   │   └── contact.js        # Contact form API
│   └── utils/
│       └── mailer.js         # Nodemailer helper
└── client/
    ├── package.json          # React dependencies
    ├── public/
    │   └── index.html        # HTML template
    └── src/
        ├── index.js          # React entry
        ├── App.js            # Main app component
        ├── components/
        │   ├── CursorGlow.jsx
        │   ├── Navbar.jsx
        │   ├── Hero.jsx
        │   ├── About.jsx
        │   ├── Services.jsx
        │   ├── Experience.jsx
        │   ├── Education.jsx
        │   ├── Certifications.jsx
        │   ├── Approach.jsx
        │   ├── FAQ.jsx
        │   ├── ContactForm.jsx
        │   └── Footer.jsx
        └── styles/
            └── index.css     # All styles
```

---

## Customization

- **Content**: Edit the data arrays at the top of each component
- **Colors**: Change CSS variables in `client/src/styles/index.css`
- **Email recipient**: Update `EMAIL_TO` in `.env`
- **Services**: Modify the `services` array in `Services.jsx`
- **FAQ**: Edit the `faqs` array in `FAQ.jsx`

---

## License

MIT — Built for Surbhi Sharma.
