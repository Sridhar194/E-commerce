const express = require('express');
const Videoad = require('../../../../models/buyer/videoad/videoad');


const router = express.Router();
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
module.exports= router;