const mongoose = require('mongoose');

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
        type: Number, // You can add min/max values if needed
        required: true
    },
   
    tags: {
        type: String
    }, category: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Category
        ref: 'Category', // Name of the Category model
        required: true
    },
    specialDiscounts: {
        type: String
    },
    isBookingOpen: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
