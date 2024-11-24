const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    discount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const PromoCode = mongoose.model('PromoCode', PromoCodeSchema);

module.exports = PromoCode;
