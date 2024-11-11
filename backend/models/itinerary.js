const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    tourGuideId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Tourguide', 
    },
    activities: {
        type: [String], 
        required: true,
    }, 
    locations: {
        type: [String], 
        required: true,
    },
    timeline: {
        type: String, 
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
    },
    language: {
        type: String, 
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    availableDates: {
        type: [Date], 
        required: true,
    },
    accessibility: {
        type: String, 
        required: true,
    },
    pickupLocation: {
        type: String, 
        required: true,
    },
    dropOffLocation: {
        type: String,   
        required: true,
    },
}, { timestamps: true });

// Conditionally define the model to prevent overwrite errors

const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
