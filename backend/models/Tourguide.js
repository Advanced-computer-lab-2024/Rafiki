const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Rating schema
const RatingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
});
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
    YearsOfExperience: {
        type: String,
        required: false,
    },
    PreviousWork: {
        type: String,
        required: false,
    },
    termsAccepted: { type: Boolean, 
        default: false }, 
    ratings: [RatingSchema]  // Array of RatingSchema objects
}, { timestamps: true }); 

module.exports = mongoose.model('Tourguide', tourguideSchema);