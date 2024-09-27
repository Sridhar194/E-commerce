const express = require('express');
const Banner = require('../../../../models/buyer/Banner/Banner');



const router = express.Router();
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
module.exports= router;