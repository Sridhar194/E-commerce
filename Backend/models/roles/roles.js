const mongoose = require('mongoose');

// Define the schema for the rba collection
const rbaSchema = new mongoose.Schema({
    Buyer: { type: Number, required: true },
    Seller: { type: Number, required: true },
}, { versionKey: false });

// Create a model for the rba collection
const RBA = mongoose.model('RBA', rbaSchema, 'rba');

const uniqueRBAId = process.env.UNIQUE_RBA_ID || '66b9b681ba6cbd4f207ec37a'; // Use environment variable for ID

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
        switch (role) {
            case 'Buyer':
                return rba.Buyer;
            case 'Seller':
                return rba.Seller;
            default:
                throw new Error('Invalid role specified');
        }
    } catch (error) {
        console.error('Error fetching role ID:', error);
        throw error;
    }
}

module.exports = { getRoleID };
