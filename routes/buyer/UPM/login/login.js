const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../../../models/User/User');
const { getRoleID } = require('../../../../models/roles/roles');


const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;
    
    if (!emailOrPhone) {
        return res.status(400).json({ message: 'Please enter an email or phone number.' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Please enter a password.' });
    }

    // Check if emailOrPhone is a phone number (no '@' symbol)
    if (!emailOrPhone.includes('@')) {
        if (emailOrPhone.length !== 10) {
            return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
        }
    }
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
        req.session.user_id = user.user_id;
        console.log(req.session.user_id);
        req.session.roleID = user.roleID;
        console.log(req.session.roleID);

       // If session is stored successfully, then update the status to 'active'
       if (req.session.user_id && req.session.roleID) {
        user.status = 'active';
        const updatedUser = await user.save();

        return res.status(200).json({
            message: 'Logged in successfully',
            userId: updatedUser.user_id,
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
module.exports= router;