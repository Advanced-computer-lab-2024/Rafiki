const express = require('express');
const Order = require('../models/order'); // Import the Order model
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
  
module.exports = router;
