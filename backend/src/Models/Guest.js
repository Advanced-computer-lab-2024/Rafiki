const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: Number,
    required: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
  },
  Nationality: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Job: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Guest = mongoose.model('Guest', userSchema);
module.exports = Guest;