// routes/auth.js
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123456') {
    return res.json({ token: 'fake_token' });
  }

  res.status(401).json({ error: 'Login yoki parol noto‘g‘ri' });
});

module.exports = router;
