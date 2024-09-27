
const Product = require('../../../../models/product/Product');
const express = require('express');


const router =express.Router();
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
module.exports= router;