const express = require('express');
const User = require('../../../../models/User/User');

//router
const router = express.Router();
// Fetch profile details
router.get('/profile', async (req, res) => {
    const { user_id, roleID, status } = req.session;

    try {
        // Check if session data is missing
        if (!user_id || !roleID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Fetch user by ID
        const user = await User.findOne({user_id}).select('name phone email address roleID');

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
    const { name, phone, email, Address } = req.body; // Including address field
    const { user_id, roleID } = req.session;

    if (phone.length !== 10) {
        return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
    }
    
    try {
        if (!user_id || !roleID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findOne({user_id});

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
        if (Address) updateData.Address = Address;

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { user_id },
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
module.exports = router;