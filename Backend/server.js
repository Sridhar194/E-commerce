// Load environment variables from .env file
require('dotenv').config();
const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
  origin:'http://localhost:3000',
  methods: ["POST","GET","PUT"],
  credentials: true
}));

console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI,{
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
app.use(session({
  secret: '9e59e449d56f6cc6dc43140764bcffc322010e06ef8abbfbe8de41fc65e4c99a9805e175c98adaee8e683f1f615c80cf95bfa5565351d66cd387d212fad28fc2',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,     // Helps prevent XSS attacks by making the cookie inaccessible to JavaScript on the frontend
      secure: false,      // Set this to true when using HTTPS
      maxAge: 1000 * 60 * 60 * 24,  // Set an appropriate expiration time (e.g., 24 hours)
      sameSite: 'lax'
  }
}));
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
//------------------------------------------------------------------------Seller routes---------------------------------------------------------------------------------------------------------------
//importing seller routes

// const productRoutes = require('./routes/productRoutes');
// const sellerRoutes = require('./routes/seller');
const loginRoute = require('../backend/routes/seller/UPM/login/login');
const RegisterRoute = require('../backend/routes/seller/UPM/register/register');
const ProfileRoutes = require('../backend/routes/seller/UPM/Profile/profile');
const productRoutes = require('../backend/routes/seller/Addproduct/productRoutes');
// Use routes

// app.use('/api/products', productRoutes);
// app.use('/api/seller', sellerRoutes);
app.use('/seller',loginRoute);
app.use('/seller',RegisterRoute);
app.use('/seller',ProfileRoutes);
app.use('/seller',productRoutes);

//------------------------------------------------------------------------Buyer routes---------------------------------------------------------------------------------------------------------------
//importing seller routes
const BuyerloginRoute = require('../backend/routes/buyer/UPM/login/login');
const BuyerProfileRoutes = require('../backend/routes/buyer/UPM/Profile/profile');
const BuyerRegisterRoute = require('../backend/routes/buyer/UPM/register/register');
const BuyerBannerRoutes = require('../backend/routes/buyer/HOMEPAGE/Banner/Banner');
const BuyerVideoadRoutes = require('../backend/routes/buyer/HOMEPAGE/videoad/videoad');
const BuyerFlashsalesRoutes = require('../backend/routes/buyer/HOMEPAGE/Flashsales/flashsales');
const BuyerNewarrivalsRoutes = require('../backend/routes/buyer/HOMEPAGE/Newarrivals/newarrivals');







// Use routes
app.use('/buyer',BuyerloginRoute);
app.use('/buyer',BuyerProfileRoutes);
app.use('/buyer',BuyerRegisterRoute);
app.use('/buyer',BuyerBannerRoutes);
app.use('/buyer',BuyerVideoadRoutes);
app.use('/buyer',BuyerFlashsalesRoutes);
app.use('/buyer',BuyerNewarrivalsRoutes);


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

