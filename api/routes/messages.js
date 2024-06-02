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
        // await messagesCollection.add(newMessage);
        res.status(201).json({ message: 'Message received' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving message' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        // const snapshot = await messagesCollection.get();
        // const messages = snapshot.docs.map(doc => doc.data());
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving messages' });
    }
});

router.get('/view', authMiddleware, (req, res) => {
    res.sendFile('messages.html', { root: path.join(__dirname, '../../public') });
});

module.exports = router;