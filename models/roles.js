const mongoose = require('mongoose');

// Define the schema for the rba collection
const rbaSchema = new mongoose.Schema({
    Buyer: Number,
    Seller: Number,
});

// Create a model for the rba collection
const RBA = mongoose.model('RBA', rbaSchema, 'rba');

const uniqueRBAId = '66b9b681ba6cbd4f207ec37a';

// Function to get the role ID based on the role name
async function getRoleID(role) {
    try {
        // Fetch the rba document using the unique ID
        const rba = await RBA.findById(uniqueRBAId);
        console.log('Fetched RBA document:', rba);

        if (!rba) {
            throw new Error('RBA document not found');
        }

        // Return the appropriate role ID based on the role name
        if (role === 'Buyer') {
            return rba.Buyer;
        } else if (role === 'Seller') {
            return rba.Seller;
        } else {
            throw new Error('Invalid role specified');
        }
    } catch (error) {
        console.error('Error fetching role ID:', error);
        throw error;
    }
}

module.exports = { getRoleID };
