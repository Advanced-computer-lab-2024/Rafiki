// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    // Other fields if needed...
});

module.exports = mongoose.model('Document', documentSchema);
