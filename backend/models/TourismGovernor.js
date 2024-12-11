const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true
  },
}, { timestamps: true });

const TourismGovernor = mongoose.model('TourismGovernor', userSchema);
module.exports = TourismGovernor;