const Product = require('../../../../models/product/Product');
const express = require('express');




const router =express.Router();
router.get('/newarrivals', async (req, res) => {
    try {
      //finding products by sorting them in descending orders 
      const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(4);//limiting to 4 
      console.log('Fetched new arrival products:', newArrivals);
      res.status(200).json(newArrivals);
    } catch (error) {
      console.error('Error fetching new arrival products:', error);
      res.status(500).json({ message: 'Error fetching new arrival products', error });
    }
});
module.exports= router;