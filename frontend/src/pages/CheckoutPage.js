import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load your public Stripe key (You can use your live key when you're ready)
const stripePromise = loadStripe('pk_test_51QRh7PGXzdUVHQQyCc38J2ratksFl7JpemgvdwUsHiLvByX2SND0SJCAIVsz1vMa339b0H5UVaOeISZt01lI7mjl00H8NkPXgw'); // Replace with your public key

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // Default payment method
  const [totalPrice, setTotalPrice] = useState(0); // Total price for checkout
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe(); // Use Stripe hook inside the component
  const elements = useElements(); // Use Elements hook inside the component

  // Fetch the addresses when the component mounts
  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      const fetchAddresses = async () => {
        try {
          const response = await axios.get(`/api/TouristRoute/${username}/addresses`);
          setAddresses(response.data.addresses); // Set the addresses to state
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };

      fetchAddresses();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch the total price from the cart or backend
  useEffect(() => {
    const fetchCartTotalPrice = async () => {
      const username = localStorage.getItem("username");

      if (username) {
        try {
          const response = await axios.get(`/api/cartRoute/${username}`);
          const items = response.data.products || [];
          const total = items.reduce((total, item) => total + (item.product.Price * item.amount), 0);
          setTotalPrice(total);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartTotalPrice();
  }, []);

  // Handle address selection
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission and payment intent creation
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        // Log the total price and the amount to be sent to backend
        console.log("Total Price:", totalPrice);
        console.log("Amount to send to backend:", totalPrice * 100);  // Amount in cents

        const response = await axios.post('/api/payments/create-payment-intent', {
            amount: totalPrice * 100, // Convert to cents (e.g., $160 -> 16000 cents)
            paymentMethod: 'pm_card_visa', // Hardcoded payment method for now
            address: selectedAddress, // Selected address (if needed)
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

  return (
    <div>
      <h2>Checkout Page</h2>
      <h3>Select Delivery Address</h3>
      {addresses.length > 0 ? (
        <div>
          {addresses.map((address, index) => (
            <div key={index} className="address-card">
              <p>{address.street}</p>
              <p>{address.city}</p>
              <p>{address.postalCode}</p>
              <button onClick={() => handleAddressSelect(address)}>Select this Address</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No addresses available</p>
      )}

      <h3>Total Price: ${totalPrice}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="payment-method">Choose Payment Method:</label>
          <select id="payment-method" value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="wallet">Wallet</option>
            <option value="credit-card">Credit Card</option>
            <option value="cash-on-delivery">Cash on Delivery</option>
          </select>
        </div>

        {paymentMethod === 'credit-card' && (
          <div>
            <label htmlFor="card-element">Credit Card Information</label>
            <CardElement />
          </div>
        )}

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
