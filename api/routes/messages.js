const express = require('express');
const Message = require('../models/message');
const authMiddleware = require('../middleware/auth');
const path = require('path');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ message: 'Message received' });
    } catch (error) {
        console.error('Error saving message:', error);
        next(error); // Pass the error to the error handling middleware
    }
});

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const messages = await Message.find({});
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        next(error); // Pass the error to the error handling middleware
    }
});

router.get('/view', authMiddleware, (req, res) => {
    res.sendFile('messages.html', { root: path.join(__dirname, '../../public') });
});

module.exports = router;