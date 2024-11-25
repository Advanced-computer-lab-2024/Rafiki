const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Products: [
        {
            product: {
                type: Schema.Types.ObjectId, // References another document
                ref: 'products', // Refers to the products model
                required: true
            },
            amount: {
                type: Number, // Specifies the amount for the product
                required: true,
                min: 1 // Ensures at least 1 unit
            }
        }
    ]
}, { timestamps: true });

const cart = mongoose.model('cart', CartSchema);
module.exports = cart;

