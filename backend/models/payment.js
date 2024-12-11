const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
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

  paymentType: {
    type: String,
    enum: ['Activity', 'Itinerary', 'Museum'], // Specify the type of payment
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId, // ID of the activity, itinerary, or museum
    required: true,
    refPath: 'paymentType', // Reference based on paymentType
  },
}, { timestamps: true });

const PaymentModel = mongoose.model('Payment', paymentSchema);
module.exports = PaymentModel;
