const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

/**
 * Save a contact form submission to a JSON file.
 * Every submission is timestamped and appended — data is never lost.
 */
const saveSubmission = async (data) => {
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Read existing submissions
  let submissions = [];
  if (fs.existsSync(SUBMISSIONS_FILE)) {
    try {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      submissions = JSON.parse(raw);
    } catch {
      // If file is corrupted, start fresh but back up old one
      const backupPath = SUBMISSIONS_FILE + '.backup.' + Date.now();
      fs.copyFileSync(SUBMISSIONS_FILE, backupPath);
      submissions = [];
    }
  }

  // Append new submission with metadata
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ...data,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  submissions.push(entry);

  // Write back
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf8');

  return entry;
};

module.exports = { saveSubmission };
