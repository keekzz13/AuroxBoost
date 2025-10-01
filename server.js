const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const total = new Map();

// CORS for Netlify frontend
app.use(cors({
  origin: 'https://vanprojects.netlify.app', // <-- no /sharebooster/
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(bodyParser.json());

// === ROUTES ===

// health check root
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// progress tracker
app.get('/total', (req, res) => {
  const data = Array.from(total.values()).map((link, index) => ({
    session: index + 1,
    url: link.url,
    count: link.count,
    id: link.id,
    target: link.target,
  }));
  res.json(data || []);
});

// submit endpoint
app.post('/api/submit', async (req, res) => {
  const { cookie, url, amount, interval } = req.body;

  if (!cookie || !url || !amount || !interval) {
    return res.status(400).json({ error: 'Missing state, url, amount, or interval' });
  }

  try {
    const cookies = await convertCookie(cookie);
    if (!cookies) {
      return res.status(400).json({ status: 500, error: 'Invalid cookies' });
    }
    await share(cookies, url, amount, interval);
    res.status(200).json({ status: 200 });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err.message || err });
  }
});

// === HELPER FUNCTIONS (share, getPostID, getAccessToken, convertCookie) ===
// ... keep your existing code here ...

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
