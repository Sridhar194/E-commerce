// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const session = require('express-session');
//const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//session
//generating a secret key to use in session
// app.use(session({
//     secret: '9e59e449d56f6cc6dc43140764bcffc322010e06ef8abbfbe8de41fc65e4c99a9805e175c98adaee8e683f1f615c80cf95bfa5565351d66cd387d212fad28fc2',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,     // Helps prevent XSS attacks by making the cookie inaccessible to JavaScript on the frontend
//         secure: false,      // Set this to true when using HTTPS
//         maxAge: 1000 * 60 * 60 * 24,  // Set an appropriate expiration time (e.g., 24 hours)
//         sameSite: 'lax'
//     }
// }));
//end session
// Import the buyer routes
const buyersRoutes = require('./routes/buyer');

//seller routes
//const buyerRoutes = require('./routes/seller');


// Use the buyer routes with a specific path
app.use('/api/buyer', buyersRoutes);

//seller routes
//app.use('/api/seller', sellerRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
