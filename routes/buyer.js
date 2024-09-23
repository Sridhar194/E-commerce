const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const { getRoleID } = require('../models/roles'); // Model for the rba collection
const Sequence = require('../models/sequence');
const Banner = require('../models/Banner');
const Videoad = require('../models/videoad');
// Routes code start
const router = express.Router(); // Created a router
// Connect to MongoDB
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI,{
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
router.use(cookieParser());
router.use(cors({
    origin:"http://localhost:3000",
    methods: ["POST","GET","PUT"],
    credentials: true
}));

router.use(session({
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
// Define a User schema
const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
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
         // Set session data first
        req.session.user_id = user._id;
        console.log(req.session.user_id);
        req.session.roleID = user.roleID;
        console.log(req.session.roleID);

       // If session is stored successfully, then update the status to 'active'
       if (req.session.user_id && req.session.roleID) {
        user.status = 'active';
        const updatedUser = await user.save();

        return res.status(200).json({
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
// // Logout route
// router.post('/logout', (req, res) => {
//     // Check if session exists
//     if (req.session.user_id) {
//         // Destroy the session
//         req.session.destroy((err) => {
//             if (err) {
//                 console.error('Error destroying session:', err);
//                 return res.status(500).json({ message: 'Failed to log out. Please try again.' });
//             }

//             // Clear the session cookie
//             res.clearCookie('connect.sid'); // Assuming you are using 'connect.sid' as session cookie name
//             res.status(200).json({ message: 'Logged out successfully.' });
//         });
//     } else {
//         // If no session found
//         res.status(400).json({ message: 'No active session found.' });
//     }
// });
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

// Fetch products for buyer homepage
router.get('/', async (req, res) => {
    try {
      const flashSales = await Product.find({ discountType: 'percentage' });
      const newArrivals = await Product.find().sort({ _id: -1 }).limit(10);
      const bestSelling = await Product.find({ bestSelling: true });
      res.status(200).json({ flashSales, newArrivals, bestSelling });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products', error });
    }
});

  //flash sales
router.get('/flashsales', async (req, res) => {
    try {
      // Fetch products where productDiscount is not null or an empty string
      const flashSales = await Product.find({ productDiscount: { $exists: true } });//$ne: ''
      res.status(200).json(flashSales);
    } catch (error) {
      console.error('Error fetching flash sales products:', error);
      res.status(500).json({ message: 'Error fetching flash sales products', error });
    }
});

router.get('/newarrivals', async (req, res) => {
    try {
      //finding products by sorting them in descending orders 
      const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(4);//limiting to 4 
      console.log('Fetched new arrival products:', newArrivals);
      res.status(200).json(newArrivals);
    } catch (error) {
      console.error('Error fetching new arrival products:', error);
      res.status(500).json({ message: 'Error fetching new arrival products', error });
    }
});
//http://localhost:5000/api/buyer/newarrivals
// Export the routes
module.exports = router;


