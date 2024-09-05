const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { getRoleID } = require('../models/roles'); // Model for the rba collection
const Sequence = require('../models/sequence');
const Banner = require('../models/Banner');
const Videoad = require('../models/videoad');
// Routes code start
const router = express.Router(); // Created a router
//session
// const secret= crypto.randomBytes(64).toString('hex');//generating a secret key to use in session

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(session({
//     secret: secret, // Change this to a secure random string
//     resave: false,
//     saveUninitialized: true
// }));
//end session
// Middleware
// router.use(cors());
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
    address:{type:String},
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' } 
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
        //update status is active
        user.status='active';
        const updatedUser= await user.save(); // Set user status to active

        // Set session data
        if(updatedUser.status ==='active'){
          req.session.user_id = updatedUser._id;
          req.session.roleID = updatedUser.roleID;

        res.status(200).json({
            message: 'Logged in successfully',
            userId: updatedUser._id,
            roleID: updatedUser.roleID,
            status: updatedUser.status
        });
    } else {
        res.status(500).json({ message: 'Failed to set user status to active. Please try again.' });
    }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Fetch profile details
router.get('/profile', async (req, res) => {
    const { user_id, roleID, status } = req.session;

    try {
        // Check if session data is missing
        if (!user_id || !roleID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Fetch user by ID
        const user = await User.findById(user_id).select('name phone email address roleID');

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if roleID matches
        if (user.roleID !== roleID) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Return user profile details
        res.status(200).json({ user, status }); // Status 200 for successful retrieval

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update profile details
router.put('/profile', async (req, res) => {
    const { name, phone, email, address } = req.body; // Including address field
    const { user_id, roleID } = req.session;

    try {
        if (!user_id || !roleID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.roleID !== roleID) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Create an object for fields that are not empty
        let updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (email) updateData.email = email;
        if (address) updateData.address = address;

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            updateData, // Update only non-empty fields
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
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
// router.post('/cloudinary-webhook', async (req, res) => {
//     console.log('Webhook received:', req.body);
//     const { public_id, secure_url, resource_type, event_type } = req.body;

//     console.log('Received webhook:', req.body);

//     try {
//         if (resource_type === 'image') {
//             if (event_type === 'upload' || event_type === 'update') {
//                 // Handle image upload or update
//                 const updatedBanner = await Banner.findOneAndUpdate(
//                     { public_id: public_id },
//                     { url: secure_url , name: imageName },
//                     { new: true, upsert: true }
//                 );
//                 console.log('Image updated or created in MongoDB:', updatedBanner);
//             } else if (event_type === 'delete') {
//                 // Handle image deletion
//                 const deletedBanner = await Banner.findOneAndDelete({ public_id: public_id });
//                 console.log('Image deleted from MongoDB:', deletedBanner);
//             }
//         } else if (resource_type === 'video') {
//             if (event_type === 'upload' || event_type === 'update') {
//                 // Handle video upload or update
//                 // You might need to store video information in a different collection or model
//                 console.log('Video uploaded or updated. You might want to handle this differently.');
//             } else if (event_type === 'delete') {
//                 // Handle video deletion
//                 console.log('Video deleted. You might want to handle this differently.');
//             }
//         } else {
//             console.log('Unsupported resource type:', resource_type);
//         }

//         res.status(200).send('Resource updated');
//     } catch (error) {
//         console.error('Error handling webhook event:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

//videoad route
router.get('/video', async (req, res) => {
    try {
        console.log('Received request to fetch all video.');

        const videoad = await Videoad.find();
        console.log('Fetched video from MongoDB:',videoad);

        res.json(videoad);
        console.log('Sent video as JSON response.');
    } catch (err) {
        console.error('Error fetching video:', err);
        res.status(500).json({ error: 'Failed to fetch video images' });
    }
});
// Export the routes
module.exports = router;
