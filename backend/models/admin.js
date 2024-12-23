// admin model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email:{
    type:String,
    required: true
  },
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
