const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourguideSchema = new Schema({
    Username: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true, 
    },
    Password: {
        type: String,
        required: true,
    },
    MobileNumber: {
        type: Number,
        required: false,
    },
    Yearsofexperience: {
        type: String,
        required: false,
    },
    Previouswork: {
        type: String,
        required: false,
    },
    termsAccepted: { type: Boolean, 
        default: true }, 

}, { timestamps: true }); 

module.exports = mongoose.model('Tourguide', tourguideSchema);