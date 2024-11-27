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
    default: 0, // Default wallet value
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
  },
  attendedActivities: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Activity' 
  }],
  BookedActivity: {
    type: Number,
    required: false, 
  },
  BookedActivities: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Activity' }],
  
  BookedItineraries: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Itinerary' 
  }],

  PurchasedProducts: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'products' }],

  attendedItineraries: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Itinerary' 
  }],

  paidActivities: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Activity' }],

  paidItineraries: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Itinerary' 
    }],
  
}, { timestamps: true });

// Prevent re-compilation error by checking if the model already exists
const TouristModel = mongoose.models.Tourist || mongoose.model('Tourist', touristSchema);
module.exports = TouristModel;
