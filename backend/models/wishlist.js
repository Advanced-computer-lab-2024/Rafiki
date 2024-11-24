const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Products: [
        {
            type: Schema.Types.ObjectId, // References another document
            ref: 'products' // Refers to the products model
        }
    ]
}, { timestamps: true });

const wishlist = mongoose.model('wishlist', wishlistSchema);
module.exports = wishlist;



