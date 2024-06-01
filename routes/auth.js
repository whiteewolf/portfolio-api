const express = require('express');
const router = express.Router();

const secretPin = process.env.SECRET_PIN || '1234'; // Change this to your secret PIN

router.post('/login', (req, res) => {
    const { pin } = req.body;
    if (pin === secretPin) {
        req.session.isAuthenticated = true;
        res.redirect('/messages/view');
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});

module.exports = router;