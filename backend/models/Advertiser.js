const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true, // Ensure that email is unique
  },
  Password: {
    type: String, // Change to string for hashed password storage
    required: true,
  },
  MobileNumber: {
    type: Number, // Changed to String to account for country codes
    required: false,
  },
  Nationality: {
    type: String,
    required: false,
  },
  DOB: {
    type: Date,
    required: false,
  },
  Job: {
    type: String,
    required: false,
  },
  Website: {
    type: String, // Field for company's website link
    required: false, // Optional
  },
  Hotline: {
    type: Number, // Field for company's hotline
    required: false, // Optional
  },
  CompanyProfile: {
    type: String, // Field for a brief company profile description
    required: false, // Optional
  },
  IsAdvertiser: {
    type: Boolean, // To track if the user is an accepted advertiser
    default: false,
  }

}, { timestamps: true });

const Advertiser = mongoose.model('Advertiser', userSchema);
module.exports = Advertiser;
