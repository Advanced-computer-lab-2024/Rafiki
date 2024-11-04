const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  touristUsername: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  pointsEarned: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const PaymentModel = mongoose.model('Payment', paymentSchema);
module.exports = PaymentModel;
