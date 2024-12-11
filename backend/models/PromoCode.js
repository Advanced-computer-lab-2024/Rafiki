const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    discount: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true // Promo code is available by default
    }
}, { timestamps: true });

const PromoCode = mongoose.model('PromoCode', PromoCodeSchema);

module.exports = PromoCode;
