const express = require('express');
const Order = require('../models/order'); // Import the Order model
const TouristModel = require('../models/Tourist'); // Adjust the path based on where your model is located

const router = express.Router();

// Create order
router.post('/create', async (req, res) => {
  const { username, productName, price, status } = req.body;

  try {
    const newOrder = new Order({
      username,
      productName,
      price,
      status,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get orders by username
router.get('/orders/:username', async (req, res) => {
    const { username } = req.params;
  
    try {
      // Fetch all orders for the tourist
      const orders = await Order.find({ username });
  
      // Get today's date to categorize orders
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Set to midnight to only consider date without time
  
      // Separate orders into current and past
      const currentOrders = orders.filter(order => new Date(order.date) >= today);
      const pastOrders = orders.filter(order => new Date(order.date) < today);
  
      // Update past orders status to 'Completed' if still 'Pending'
      await Order.updateMany(
        { username, date: { $lt: today }, status: 'Pending' },
        { $set: { status: 'Completed' } }
      );
  
      // Return the orders categorized
      res.json({ currentOrders, pastOrders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
// Update order status
router.put('/update/:orderId', async (req, res) => {
    const { status } = req.body;
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status },
        { new: true }
      );
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Error updating order status' });
    }
  });
  // Route to cancel an order
  router.patch('/orders/:username/cancel/:orderId', async (req, res) => {
    const { username, orderId } = req.params;
  
    try {
      // Log the incoming parameters
      console.log('Cancelling order for username:', username, 'orderId:', orderId);
  
      // Fetch the order by ID
      const order = await Order.findById(orderId);
      if (!order) {
        console.log('Order not found');
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check the order status
      console.log('Current order status:', order.status);
      if (order.status !== 'Pending' && order.status !== 'Processing') {
        console.log('Order cannot be cancelled because it is not in a valid state.');
        return res.status(400).json({ message: 'Order cannot be cancelled' });
      }
  
      // Update the order status to "Cancelled"
      order.status = 'Cancelled';
      await order.save();
      console.log('Order status updated to Cancelled');
  
      // Optionally update the user's wallet if applicable
      const tourist = await TouristModel.findOne({ Username: username });
      if (tourist) {
        console.log('User found, updating wallet balance.');
        tourist.Wallet += order.price; // Refund the wallet (if needed)
        await tourist.save();
        console.log('Wallet updated:', tourist.Wallet);
      } else {
        console.log('User not found for wallet update.');
      }
  
      // Respond with the updated order
      res.status(200).json(order);
  
    } catch (error) {
      console.error('Error during order cancellation:', error); // Log the error
      res.status(500).json({ message: 'Error canceling order' });
    }
  });
  // In your backend (OrderRoute.js or wherever it fits)
router.get('/wallet/:username', async (req, res) => {
    const { username } = req.params;
    try {
      // Find the tourist (user) by username
      const tourist = await TouristModel.findOne({ Username: username });
  
      if (!tourist) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send back the wallet balance
      res.json({ walletBalance: tourist.Wallet });
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      res.status(500).json({ message: 'Failed to fetch wallet balance' });
    }
  });
  // Route to handle successful payment and update wallet
  router.post('/pay/:username', async (req, res) => {
    const { username } = req.params;
    const { totalPrice } = req.body; // Retrieve the total amount
  
    try {
      // Fetch the tourist (user) by username
      const tourist = await TouristModel.findOne({ Username: username });
      if (!tourist) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has sufficient balance
      if (tourist.Wallet < totalPrice) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
      }
  
      // Deduct the total price from the wallet
      tourist.Wallet -= totalPrice;
      await tourist.save();
  
      // Respond with the updated wallet balance
      res.status(200).json({ walletBalance: tourist.Wallet });
    } catch (error) {
      console.error('Error during wallet payment:', error);
      res.status(500).json({ message: 'Error processing wallet payment' });
    }
  });

  
  
  
module.exports = router;
