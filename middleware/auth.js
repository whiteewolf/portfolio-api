const secretPin = process.env.SECRET_PIN || '1234'; // Change this to your secret PIN

module.exports = (req, res, next) => {
    const { pin } = req.body;
    if (!pin) return res.status(401).json({ error: 'No PIN provided' });
    if (pin === secretPin) {
        next();
    } else {
        res.status(401).json({ error: 'Invalid PIN' });
    }
};