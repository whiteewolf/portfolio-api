const express = require('express');
const router = express.Router();
require("dotenv").config();
const path = require("path")

const secretPin = '2912'; // Change this to your secret PIN

router.post('/login', (req, res) => {
    const pin = req.body.pin;
    console.log(pin, secretPin)
    if (pin === secretPin) {
        req.session.isAuthenticated = true;
        res.redirect('/messages/view');
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: path.join(__dirname, '../../public') });
});

module.exports = router;