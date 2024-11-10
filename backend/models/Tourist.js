const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const touristSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
   
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
    default:0, // Default wallet value
    
  },

  LoyaltyPoints: {
    type: Number,
    default: 0, // Default loyalty points value
  },

  BadgeLevel: {
    type: String,
    default: "Level 1" // Default badge level
  },

  TotalPoints: { 
    type: Number,
     default: 0,
  }, // Total points earned over time
  attendedActivities: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Activity' }]



}, { timestamps: true });

const TouristModel = mongoose.model('Tourist', touristSchema);
module.exports = TouristModel;
