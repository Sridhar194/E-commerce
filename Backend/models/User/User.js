const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    phone: { type: String, required: true }, // Add phone number
    password: { type: String, required: true }, // Password
    roleID: { type: Number, required: true },
    Address:{type:String},
    // Additional Fields
    CompanyName: { type: String },
    WebsiteUrl: { type: String },
    BusinessType: { type: String },
    BusinessAddress: { type: String },
    State: { type: String },
    TaxImposed: { type: String },
    GST: { type: String },
    StoreAddress: { type: String },
    AccountType: { type: String },
    AccountHolderName: { type: String },
    IfscCode: { type: String },

    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' } 
},{ versionKey: false }); // Disable version key
const User = mongoose.model('User', userSchema);

module.exports = User;

