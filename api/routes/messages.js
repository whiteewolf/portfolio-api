const express = require('express');
// const admin = require('firebase-admin');
const authMiddleware = require('../middleware/auth');
const path = require("path")

const router = express.Router();
// const db = admin.firestore();
// const messagesCollection = db.collection('messages');

router.post('/', async (req, res) => {
    try {
        const newMessage = req.body;
        const messagesCollection = req.db.collection('messages');
        await messagesCollection.insertOne(newMessage);
        res.status(201).json({ message: 'Message received' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving message' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const messagesCollection = req.db.collection('messages');
        const messages = await messagesCollection.find({}).toArray();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving messages' });
    }
});

router.get('/view', authMiddleware, (req, res) => {
    res.sendFile('messages.html', { root: path.join(__dirname, '../../public') });
});

module.exports = router;