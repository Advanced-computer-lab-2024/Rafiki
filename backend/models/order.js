const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Can be 'Pending', 'Processing', 'Completed', etc.
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
