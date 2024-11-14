// In a new file models/sequence.js
const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, default: 0 }
}, { versionKey: false });

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
