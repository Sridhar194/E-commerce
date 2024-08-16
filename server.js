// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
