const mongoose = require('mongoose');

const transportation = new mongoose.Schema({
    departureDate: {
        type: Date,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureLocation: {
        type: String,
        required: true
    },
    arrivalLocation: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    vehicleType: {
        type: String, // Example values: 'Bus', 'Train', 'Taxi', 'Flight'
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    },
   
    
}, { timestamps: true });

const Transportation = mongoose.model('Transportation', transportation);

module.exports = Transportation;