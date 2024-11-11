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
      type: String,
      required: true
    },
    Name: {  
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: false
    },
    Picture: { // New field for profile picture
        type: String,
        required: false
    }
}, { timestamps: true });

const Seller = mongoose.model('Seller', userSchema);
module.exports = Seller;
