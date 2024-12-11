// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  // Define the schema fields based on your application's requirements.
  advertiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser' },
  status: { type: String, required: true }, // e.g., 'paid'
  activityDate: { type: Date },
  itineraryDate: { type: Date }
});

module.exports = mongoose.model('Booking', BookingSchema);
