const mongoose = require('mongoose');


// Schema for Museums and Historical Places
const museumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: {
    type: String, // An array of picture URLs
  },
  location: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  ticketPrices: {
    type: Number, // Assume ticket price is a number
    required: true,
  },
  tag: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Museum', museumSchema);
