const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const touristSchema = new Schema({
  Username: {
    type: String,
    required: true,
    immutable: true // Username cannot be changed
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
    type: String,
    required: false,
  },
  Nationality: {
    type: String,
    required: false,
  },
  DOB: {
    type: Date,
    required: true,
    immutable: true // DOB cannot be changed
  },
  Job: {
    type: String,
    required: false,
  },
  Wallet: {
    type: Number,
    required: false,
    default: 0, // Default wallet value
    immutable: true // Wallet cannot be changed
  },
}, { timestamps: true });

const TouristModel = mongoose.model('Tourist', touristSchema);
module.exports = TouristModel;
