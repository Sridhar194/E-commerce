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
    type: String, // Can be updated to 'discountType' if preferred
    enum: ['No Discount', '% Discount', 'Fixed price'],
    required: true,
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
