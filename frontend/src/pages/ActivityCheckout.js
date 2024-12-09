import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load your public Stripe key
const stripePromise = loadStripe('pk_test_51QRh7PGXzdUVHQQyCc38J2ratksFl7JpemgvdwUsHiLvByX2SND0SJCAIVsz1vMa339b0H5UVaOeISZt01lI7mjl00H8NkPXgw'); // Replace with your public key

const ActivityCheckout = () => {
  const [totalPrice, setTotalPrice] = useState(0); // Total price for checkout
  const [touristWallet, setTouristWallet] = useState(0); // Tourist's wallet balance
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // Default payment method (wallet)
  const [isProcessing, setIsProcessing] = useState(false);
  const [activity, setActivity] = useState(null); // Store activity data
  const [isLoading, setIsLoading] = useState(true); // To track the loading state
  const navigate = useNavigate();
  const { activityId } = useParams(); // Get the activity ID from the URL
  const stripe = useStripe(); // Use Stripe hook inside the component
  const elements = useElements(); // Use Elements hook inside the component

  // Get username from localStorage
  const username = localStorage.getItem("username");

  // Fetch the tourist's wallet balance when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        console.error("Username is missing");
        return;
      }

      try {
        // Fetch the tourist's wallet balance using /api/payments/{username}/wallet
        const walletResponse = await axios.get(`/api/payments/${username}/wallet`);
        setTouristWallet(walletResponse.data.balance); // Assuming wallet balance is in balance
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, [username]);

  // Fetch the activity data and price when the component mounts
  useEffect(() => {
    if (!activityId) {
      console.error("Activity ID is missing");
      return;
    }

    const fetchActivityData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        // Fetch the activity data (not just the price)
        const response = await axios.get(`/api/ActivityRoute/${activityId}`);
        console.log("API Response:", response.data); // Log the response

        // Set activity data to state
        setActivity(response.data);
        setTotalPrice(response.data.price); // Assuming price is inside the activity data
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchActivityData();
  }, [activityId]); // Dependency on activityId

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'wallet') {
      // Check if wallet has sufficient funds
      if (touristWallet < totalPrice) {
        alert('Insufficient funds in wallet!');
        setIsProcessing(false);
        return;
      }

      // Proceed with the wallet payment
      alert('Wallet payment successful!');
      try {
        // Call the wallet payment handler
        await handleWalletPayment(totalPrice);

        setIsProcessing(false);
      } catch (error) {
        console.error('Error processing wallet payment:', error);
        alert('Failed to process payment.');
        setIsProcessing(false);
      }

      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      alert(error.message);
      setIsProcessing(false);
    } else {
      // Proceed with the Stripe payment
      const response = await axios.post('/api/payments/create-payment-intent', {
        amount: totalPrice * 100, // Convert to cents (e.g., $160 -> 16000 cents)
        paymentMethod: 'pm_card_visa', // Use the generated token for payment
      });

      const data = response.data;
      if (data.clientSecret) {
        alert('Payment Successful!');
      } else {
        alert('Payment Failed');
      }

      setIsProcessing(false);
    }
  };

  const handleWalletPayment = async (activityPrice) => {
    try {
      // Post the wallet payment request to the backend
      const response = await axios.post(`/api/orders/payactivity/${username}`, {
        activityId,
        totalPrice: activityPrice, // The activity price
      });

      console.log('Wallet payment successful:', response.data);

      const updatedBalance = await axios.get(`/api/payments/${username}/wallet`);
      setTouristWallet(updatedBalance.data.balance); // Update the wallet balance
      alert('Payment successful!');
    } catch (error) {
      console.error('Error during wallet payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Activity Checkout</h2>

      {isLoading ? (
        <p>Loading activity data...</p>
      ) : activity ? (
        <>
          <div className="border-t border-gray-300 pt-6">
            <h3 className="text-xl font-semibold text-gray-800">Activity: {activity.name}</h3>
            <h3 className="text-lg text-gray-700 mt-2">Total Price: ${totalPrice}</h3>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="payment-method" className="block text-lg font-medium text-gray-700">Choose Payment Method:</label>
                <select
                  id="payment-method"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="wallet">Wallet</option>
                  <option value="credit-card">Credit Card</option>
                </select>
              </div>

              {paymentMethod === 'credit-card' && (
                <div>
                  <label htmlFor="card-element" className="block text-lg font-medium text-gray-700">Credit Card Information</label>
                  <CardElement className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {isProcessing ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Submit Payment'
                )}
              </button>
            </form>
          </div>
        </>
      ) : (
        <p className="text-gray-700">No activity data available.</p>
      )}
    </div>
  );
};

export default ActivityCheckout;
