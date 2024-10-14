const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    Name:{
        type: String,
        required : true,

    },
    Picture: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true
    },
    Description: {
      type: String,
      required: true},
    Seller:{  
        type:String,
        required:true
    },
    Ratings:{
        type: Number,
        required:true
    },
    Reviews:{
        type:String,
        required:true
    },
    AvailableQuantity:{
        type: Number,
        required: true
    },
    isArchived: {
      type: Boolean,
      default: false,  // By default, products are not archived
    }

    }, { timestamps: true });

const products = mongoose.model('products', userSchema);
module.exports = products;