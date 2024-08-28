const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { getRoleID } = require('../models/roles'); // Model for the rba collection
const Sequence = require('../models/sequence');
const Banner = require('../models/Banner');

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
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    phone: { type: String, required: true }, // Add phone number
    password: { type: String, required: true }, // Password
    roleID: { type: Number, required: true }, 
},{ versionKey: false }); // Disable version key

const User = mongoose.model('User', userSchema);
//user id 
async function generateUserId() {
    let sequence = await Sequence.findOne();

    if (!sequence) {
        sequence = new Sequence({ user_id: 1 });
    } else {
        sequence.user_id += 1;
    }

    await sequence.save();
    return sequence.user_id.toString();
}

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
        const user_id = await generateUserId();
        
        const newUser = new User({
            user_id,
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

//banner routes
// Route to get all banner images
router.get('/banner', async (req, res) => {
    try {
        console.log('Received request to fetch all banner images.');

        const banners = await Banner.find();
        console.log('Fetched banners from MongoDB:', banners);

        res.json(banners);
        console.log('Sent banners as JSON response.');
    } catch (err) {
        console.error('Error fetching banner images:', err);
        res.status(500).json({ error: 'Failed to fetch banner images' });
    }
});
// cloudinary webhook notification
// Handle Cloudinary webhook events
router.post('/cloudinary-webhook', async (req, res) => {
    const { public_id, secure_url, resource_type, event_type } = req.body;

    console.log('Received webhook:', req.body);

    try {
        if (resource_type === 'image') {
            if (event_type === 'upload' || event_type === 'update') {
                // Handle image upload or update
                const updatedBanner = await Banner.findOneAndUpdate(
                    { public_id: public_id },
                    { url: secure_url },
                    { new: true, upsert: true }
                );
                console.log('Image updated or created in MongoDB:', updatedBanner);
            } else if (event_type === 'delete') {
                // Handle image deletion
                const deletedBanner = await Banner.findOneAndDelete({ public_id: public_id });
                console.log('Image deleted from MongoDB:', deletedBanner);
            }
        } else if (resource_type === 'video') {
            if (event_type === 'upload' || event_type === 'update') {
                // Handle video upload or update
                // You might need to store video information in a different collection or model
                console.log('Video uploaded or updated. You might want to handle this differently.');
            } else if (event_type === 'delete') {
                // Handle video deletion
                console.log('Video deleted. You might want to handle this differently.');
            }
        } else {
            console.log('Unsupported resource type:', resource_type);
        }

        res.status(200).send('Resource updated');
    } catch (error) {
        console.error('Error handling webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Export the routes
module.exports = router;
