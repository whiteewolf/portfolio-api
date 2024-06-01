const express = require('express');
const router = express.Router();
require("dotenv").config();

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

module.exports = router;