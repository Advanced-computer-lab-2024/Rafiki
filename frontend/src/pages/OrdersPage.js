import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get username from localStorage
  const username = localStorage.getItem('username');

  // Fetch current and past orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/orders/${username}`);
        setCurrentOrders(response.data.currentOrders);
        setPastOrders(response.data.pastOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>

      <div>
        <h3>Current Orders</h3>
        {currentOrders.length > 0 ? (
          <ul>
            {currentOrders.map((order) => (
              <li key={order._id}>
                <strong>{order.productName}</strong> - ${order.price}
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No current orders</p>
        )}
      </div>

      <div>
        <h3>Past Orders</h3>
        {pastOrders.length > 0 ? (
          <ul>
            {pastOrders.map((order) => (
              <li key={order._id}>
                <strong>{order.productName}</strong> - ${order.price}
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No past orders</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
