const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { getRoleID } = require('../models/roles');; // Model for the rba collection

// Routes code start
const router = express.Router(); // Created a router

// Middleware
router.use(cors());
router.use(bodyParser.json());
// End routes code

// Connect to MongoDB
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI,{
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


// Define a User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    phone: { type: String, required: true }, // Add phone number
    password: { type: String, required: true }, // Password
    roleID: { type: Number, required: true }, 
},{ versionKey: false }); // Disable version key

const User = mongoose.model('User', userSchema);

// API endpoint to handle registration routes
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log('Received registration request:', req.body);

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    } 
    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email is already registered. Try logging in.' });
            }
            if (existingUser.phone === phone) {
                return res.status(400).json({ message: 'Phone number is already registered. Try logging in.' });
            }
        }
        // Fetch the role ID for a buyer from the rba collection.
        const roleID = await getRoleID('Buyer');
        if (!roleID) {
            console.error('Failed to fetch role ID for buyer');
            return res.status(400).json({ message: 'Role ID not found' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword, // Save hashed password
            roleID,
        });

        await newUser.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;
    console.log('Login attempt with:', req.body); // Log the input data

    try {
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
        console.log('User found:', user); // Log the user found

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or phone number.' });
        }

        // Compare provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Log whether passwords match

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // Fetch the role ID for "buyer"
        const userRoleID = await getRoleID('Buyer');
        console.log('User Role ID:', user.roleID, 'Fetched Role ID:', userRoleID); // Log role IDs

        // Check if the user's role ID matches the expected role ID
        if (user.roleID !== userRoleID) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.status(200).json({ message: 'Logged in successfully', userId: user._id, roleID: user.roleID });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the routes
module.exports = router;
