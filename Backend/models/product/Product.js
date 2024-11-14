const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user_id:{
    type:Number,
    required:true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    enum: ['Groceries', 'Fashion', 'Bazaar', 'Appliances', 'Mobiles', 'Electronics', 'Home', 'Beauty', 'Furniture'],
    required: true,
  },
  productDiscount: {
    type: String,
    enum: ['Discount', 'No Discount'], // Can be updated to 'discountType' if preferred
    required: true,
  },
  discountValue: {
    type: Number,
    min: 1, // Minimum value for the discount
    max: 99, // Max discount allowed is 99%
  },
  shippingMethod: {
    type: String,
    enum: ['Shipping on own', 'Shipping by us'],
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  charges: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, // Since the product requires an image
  },
  // Add bestSelling if needed
  // bestSelling: {
  //   type: Boolean,
  //   default: false,
  // },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
