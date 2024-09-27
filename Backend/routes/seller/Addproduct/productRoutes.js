const express = require('express');
const Product = require('../../../models/product/Product');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
// const { body, validationResult } = require('express-validator');


// Set up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Add a new product with image upload
router.post('/products',upload.single('image'),async (req, res) => {
    const { productName, productDescription, productPrice, productCategory, productDiscount, shippingMethod, pickupAddress, charges} = req.body;

    // Ensure session is available and user_id is set
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in' });
  }
    const{ user_id }= req.session;//added to fetch user id from session 
    // Get the Cloudinary URL of the uploaded image
    const imageUrl = req.file.path || req.file.url;
    
    try {
      const newProduct = new Product({
        user_id,
        productName,
        productDescription,
        productPrice,
        productCategory,
        productDiscount,
        shippingMethod,
        pickupAddress,
        charges,
        imageUrl, // Save the Cloudinary image URL
        // bestSelling: bestSelling === 'true'  // Convert string 'true' or 'false' to boolean
      });

      const savedProduct = await newProduct.save();
      console.log('Product saved:', savedProduct);
      res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Error adding product', error });
    }
  }
);

// Fetch products for buyer homepage
router.get('/products', async (req, res) => {
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

module.exports = router;
