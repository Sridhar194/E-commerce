
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Banner = require('../models/buyer/Banner/Banner'); // Assuming you have a Banner model

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

// Fetch and Store Banner Images
const storeBannerImages = async () => {
    try {
        // Fetch images from Cloudinary folder
        const result = await cloudinary.search
            .expression('folder:products/banner') // Specify your Cloudinary folder
            .execute();

        const images = result.resources.map(image => ({
            url: image.secure_url,
            public_id: image.public_id,
            name: image.public_id.split('/').pop()
        }));

        // Clear existing banner images in MongoDB
        await Banner.deleteMany();

        // Store the new images in MongoDB
        await Banner.insertMany(images);

        console.log('Banner images stored successfully in MongoDB');
    } catch (err) {
        console.error('Error storing banner images:', err);
    } finally {
        mongoose.connection.close();
    }
};

storeBannerImages();
