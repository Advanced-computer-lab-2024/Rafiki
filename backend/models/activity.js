const mongoose = require('mongoose');

// Define the Rating schema
const RatingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
});

// Define the Activity schema, with ratings using the RatingSchema
const activitySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: String
    },  
    category: {
        type: String
    },
    specialDiscounts: {
        type: String
    },
    isBookingOpen: {
        type: Boolean,
        default: true
    },
    touristsAttended: {
        type: Number,
        default: 0 // Counter to track the number of tourists
    },
    tourGuideUsername: {
        type: String, // Use the tour guide's username for linking
        required: true,
        },  
    flagged:{
        type: Boolean, // Use the tour guide's username for linking
        default: false
    },
    ratings: [RatingSchema]  // Array of RatingSchema objects
        
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
