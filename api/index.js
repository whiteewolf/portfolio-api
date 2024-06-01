const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const messageRoutes = require('./routes/messages');
const authRoutes = require('./routes/auth');
// const admin = require('firebase-admin');
require('dotenv').config(path.join(__dirname, '../.env'));

const app = express();
const PORT = 3000;

// const serviceAccount = require('./config/firebaseServiceAccountKey.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://<your-database-name>.firebaseio.com" // Replace <your-database-name>
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_session_secret', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
    res.redirect('/api/auth/login')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});