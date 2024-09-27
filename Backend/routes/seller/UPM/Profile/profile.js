const express = require('express');
const User = require('../../../../models/User/User');
const multer = require('multer');
const upload = multer();

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

         // Fetch user by ID including all fields
        const user = await User.findOne({ user_id }).select('name phone email Address CompanyName WebsiteUrl BusinessType BusinessAddress State TaxImposed GST StoreAddress AccountType AccountHolderName IfscCode roleID');

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
router.put('/profile', upload.none(),async (req, res) => {
    const { name, phone, email, Address, CompanyName, WebsiteUrl, BusinessType, BusinessAddress, State, TaxImposed, GST, StoreAddress, AccountType, AccountHolderName, IfscCode } = req.body // Including address field
    const { user_id, roleID } = req.session;

    if (phone.length !== 10) {
        return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
    }

    try {
        if (!user_id || !roleID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findOne({ user_id });

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
        if (CompanyName) updateData.CompanyName = CompanyName; // Use proper casing
        if (WebsiteUrl) updateData.WebsiteUrl = WebsiteUrl; // Use proper casing
        if (BusinessType) updateData.BusinessType = BusinessType; // Use proper casing
        if (BusinessAddress) updateData.BusinessAddress = BusinessAddress; // Use proper casing
        if (State) updateData.State = State; // Use proper casing
        if (TaxImposed) updateData.TaxImposed = TaxImposed; // Use proper casing
        if (GST) updateData.GST = GST; // Use proper casing
        if (StoreAddress) updateData.StoreAddress = StoreAddress; // Use proper casing
        if (AccountType) updateData.AccountType = AccountType; // Use proper casing
        if (AccountHolderName) updateData.AccountHolderName = AccountHolderName; // Use proper casing
        if (IfscCode) updateData.IfscCode = IfscCode; // Use proper casing

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