const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../../../models/User/User');
const { getRoleID } = require('../../../../models/roles/roles');
const Sequence = require('../../../../models/sequence/sequence')

const router = express.Router();
// Register Route
//generate user id
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
//routes
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    if (!phone) {
        return res.status(400).json({ message: 'Phone number is required.' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required.' });
    }
    console.log('Received registration request:', req.body);

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    console.log('Received registration request:', req.body);
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

        const roleID = await getRoleID('Seller');
        if (!roleID) {
            console.error('Failed to fetch role ID for seller');
            return res.status(400).json({ message: 'Role ID not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user_id = await generateUserId();

        const newUser = new User({
            user_id,
            name,
            email,
            phone,
            password: hashedPassword,
            roleID,
        });

        await newUser.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;