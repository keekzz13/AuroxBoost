const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const total = new Map();

// allow frontend (replace * with your netlify domain if you want stricter)
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(bodyParser.json());

// serve static files if you put them in "public/"
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// your /total, /api/submit, and helper functions stay the same...

// IMPORTANT: Render requires process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
