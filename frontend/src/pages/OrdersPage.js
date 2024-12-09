import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
    const[walletBalance,setWalletBalance]=useState([]);
  // Get username from localStorage
  const username = localStorage.getItem('username');

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/orders/orders/${username}/cancel/${orderId}`
      );
      console.log('Order cancelled:', response.data);
      // After cancelling, you can fetch the updated wallet balance if it changes
      const updatedBalance = await axios.get(
        `http://localhost:4000/api/orders/wallet/${username}`
      );
      setWalletBalance(updatedBalance.data.walletBalance);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };
  
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/orders/wallet/${username}`
        );
        setWalletBalance(response.data.walletBalance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, [username]);


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
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Order History</h2>

      {/* Wallet Balance */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Wallet Balance</h3>
        <p className="text-xl text-green-600">${walletBalance}</p>
      </div>

      {/* Current Orders */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Orders</h3>
        {currentOrders.length > 0 ? (
          <ul className="space-y-4">
            {currentOrders.map((order) => (
              <li
                key={order._id}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <strong className="text-lg text-gray-800">{order.productName}</strong>
                  <p className="text-gray-600">Price: ${order.price}</p>
                  <p className={`text-sm ${order.status === 'Cancelled' ? 'text-red-500' : 'text-yellow-500'}`}>
                    Status: {order.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={order.status === 'Cancelled' }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
                >
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No current orders.</p>
        )}
      </div>

      {/* Past Orders */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Past Orders</h3>
        {pastOrders.length > 0 ? (
          <ul className="space-y-4">
            {pastOrders.map((order) => (
              <li
                key={order._id}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <strong className="text-lg text-gray-800">{order.productName}</strong>
                  <p className="text-gray-600">Price: ${order.price}</p>
                  <p className={`text-sm ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>
                    Status: {order.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No past orders.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;