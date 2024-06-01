const express = require('express');
const router = express.Router();
require("dotenv").config();

router.get('/api', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;