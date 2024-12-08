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
  const [promoCode, setPromoCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Total price for checkout
  const [touristWallet, setTouristWallet] = useState(0); // Tourist's wallet balance
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe(); // Use Stripe hook inside the component
  const elements = useElements(); // Use Elements hook inside the component
  const username = localStorage.getItem("username");
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

          // Fetch the tourist's wallet balance
          const walletResponse = await axios.get(`/api/payments/${username}/wallet`);
          setTouristWallet(walletResponse.data.balance); // Assuming wallet balance is in `balance`
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



  const handleWalletPayment = async (orderId, totalPrice) => {
    try {
      // Send the payment request to the backend
      const response = await axios.post(
        `http://localhost:4000/api/orders/pay/${username}`, 
        { orderId, totalPrice }
      );
  
      console.log('Wallet payment successful:', response.data);
  
      // Update the wallet balance in the state
      const updatedBalance = await axios.get(
        `http://localhost:4000/api/orders/wallet/${username}`
      );
  
      setTouristWallet(updatedBalance.data.walletBalance); // Update the wallet balance
      alert('Payment successful!');
  
      // Optionally, navigate to the orders page or show a success message
    } catch (error) {
      console.error('Error during wallet payment:', error);
      alert('Payment failed. Please try again.');
    }
  };
  

  const validatePromoCode = async () => {
    try {
      const response = await fetch('/api/PromoCodeRoute/use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: promoCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid promo code.');
      }

      const { promoCode: usedPromoCode } = await response.json();
      const discountAmount = (totalPrice * usedPromoCode.discount) / 100;
      const discountedPrice = totalPrice - discountAmount;

      setTotalPrice(discountedPrice.toFixed(2)); // Update final price with the discounted value
      setMessage(`Promo code applied! You saved ${discountAmount.toFixed(2)}.`);
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
      setTotalPrice(totalPrice); // Reset to the original price if promo code is invalid
    }
  };


  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission and payment intent creation
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // If payment method is 'cash-on-delivery', no Stripe interaction required.
    if (paymentMethod === 'cash-on-delivery') {
      // Mark payment as successful immediately for Cash on Delivery
      alert('Cash on Delivery payment successful!');
      await createOrder("Cash on Delivery");
      setIsProcessing(false);
      return;
    }
  
    // If payment method is 'wallet', check if the tourist has enough balance
    if (paymentMethod === 'wallet') {
      if (touristWallet < totalPrice) {
        alert('Insufficient funds in wallet!');
        setIsProcessing(false);
        return;
      }
      // Proceed with wallet payment
      alert('Wallet payment successful!');

      const orderId = await createOrder("Wallet");

      await handleWalletPayment(orderId, totalPrice);



      setIsProcessing(false);
      return;
    }
  
    if (!stripe || !elements) {
      return;
    }
  
    setIsProcessing(true);
  
    // Get the card details
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);
  
    if (error) {
      alert(error.message);
      setIsProcessing(false);
    } else {
      // Proceed with Stripe payment
      console.log("Total Price:", totalPrice);
      console.log("Amount to send to backend:", totalPrice * 100);  // Amount in cents
  
      const response = await axios.post('/api/payments/create-payment-intent', {
        amount: totalPrice * 100, // Convert to cents
        paymentMethod: 'pm_card_visa', // Use the generated token for payment
        address: selectedAddress, // Selected address
      });
  
      const data = response.data;
      if (data.clientSecret) {
        alert('Payment Successful!');
        await createOrder("Credit Card");
      } else {
        alert('Payment Failed');
      }
  
      setIsProcessing(false);
    }
  };
  
  // Create an order and send it to the backend
  const createOrder = async (paymentMethod) => {
   
    const username = localStorage.getItem("username");
    const orderData = {
      username: username,
      productName: "Some Product Name", // You can dynamically pull this from the cart or the product selected
      price: totalPrice,
      status: "Pending", // Initially set to "Pending"
      paymentMethod: paymentMethod, // Cash on Delivery, Wallet, Credit Card
      date: new Date()  // Set the order date to the current date
    };
  
    try {
      // Create a new order in the database
      await axios.post('/api/orders/create', orderData);
      console.log("Order created successfully.");
    } catch (error) {
      console.error("Error creating order:", error);
    }
    navigate('/orders');
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
      <div>
        <label>Promo Code:</label>
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
        />
        <button type="button" onClick={validatePromoCode}>
          Apply Promo Code
        </button>
      </div>

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
