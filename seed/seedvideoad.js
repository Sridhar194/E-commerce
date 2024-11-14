require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const VideoAd = require('../models/buyer/videoad/videoad'); // Assuming you create a VideoAd model

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Set up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fetch and Store Video Ads
const storeVideoAds = async () => {
    try {
        // Fetch videos from Cloudinary folder
        const result = await cloudinary.search
            .expression('folder:products/video') // Specify your Cloudinary folder and resource type
            .execute();

        const videos = result.resources.map(video => ({
            url: video.secure_url,
            public_id: video.public_id,
            name: video.public_id.split('/').pop()
        }));

        // Clear existing video ads in MongoDB
        await VideoAd.deleteMany();

        // Store the new video ads in MongoDB
        await VideoAd.insertMany(videos);

        console.log('Video ads stored successfully in MongoDB');
    } catch (err) {
        console.error('Error storing video ads:', err);
    } finally {
        mongoose.connection.close();
    }
};

storeVideoAds();
