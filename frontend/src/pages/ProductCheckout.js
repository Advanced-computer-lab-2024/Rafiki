import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load your public Stripe key
const stripePromise = loadStripe('pk_test_51QRh7PGXzdUVHQQyCc38J2ratksFl7JpemgvdwUsHiLvByX2SND0SJCAIVsz1vMa339b0H5UVaOeISZt01lI7mjl00H8NkPXgw'); // Replace with your public key

const ProductCheckout = () => {
  const [totalPrice, setTotalPrice] = useState(0); // Total price for checkout
  const [touristWallet, setTouristWallet] = useState(0); // Tourist's wallet balance
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // Default payment method (wallet)
  const [isProcessing, setIsProcessing] = useState(false);
  const [productName, setProductName] = useState(''); // Store the product name entered by the user
  const [product, setProduct] = useState(null); // Store product data
  const [productPrice, setProductPrice] = useState(null); // Store product data
  const [isLoading, setIsLoading] = useState(false); // To track the loading state
  const navigate = useNavigate();
  const stripe = useStripe(); // Use Stripe hook inside the component
  const elements = useElements(); // Use Elements hook inside the component

  // Get username from localStorage
  const username = localStorage.getItem("username");

  // Log the username to ensure it's available
  console.log("Username:", username);

  // Function to fetch product price based on the product name entered by the user
  const fetchProductPrice = async () => {
    if (!productName) {
      alert('Please enter a product name.');
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const response = await axios.get(`/api/productsRoute/getProductPrice/${productName}`);
      const fetchedPrice = response.data.price;
      console.log("Fetched Product Price:", fetchedPrice);
      setProductPrice(fetchedPrice);
      setTotalPrice(fetchedPrice); // Update total price
      setIsLoading(false); // Stop loading
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching product price:", error);
      alert("Error fetching product price. Please try again.");
    }
  };

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


  const handleWalletPayment = async (productPrice) => {
    try {
      // Post the wallet payment request to the backend
      const response = await axios.post(`/api/orders/payproduct/${username}`, {
        productName,
        totalPrice: productPrice, // The product price
      });
  
      console.log('Wallet payment successful:', response.data);
  
      // Update the wallet balance in the frontend state
      const updatedBalance = await axios.get(`/api/payments/${username}/wallet`);
      setTouristWallet(updatedBalance.data.walletBalance); // Update the wallet balance
      alert('Payment successful!');
  
      // Optionally, navigate to orders or a success page
      navigate('/orders');
    } catch (error) {
      console.error('Error during wallet payment:', error);
      alert('Payment failed. Please try again.');
    }
  };
  


  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission and payment processing
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
        
        const orderResponse = await axios.post('/api/orders/create', {
          username,
          productName,
          price:totalPrice,
          paymentMethod: 'wallet',
        });
        console.log('Order created:', orderResponse.data);
      } catch (error) {
        console.error('Error creating order:', error);
      }

      try {
        // Call the wallet payment handler
        await handleWalletPayment(totalPrice);
  
        setIsProcessing(false);
      } catch (error) {
        console.error('Error processing wallet payment:', error);
        alert('Failed to process payment.');
        setIsProcessing(false);
      }
      
      navigate('/orders'); // Navigate to orders page 
      setIsProcessing(false);
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
        try {
        
          const orderResponse = await axios.post('/api/orders/create', {
            username,
            productName,
            price:totalPrice,
            paymentMethod: 'credit Card',
          });
          console.log('Order created:', orderResponse.data);
        } catch (error) {
          console.error('Error creating order:', error);
        }
        
        navigate('/orders'); // Navigate to orders page
      } else {
        alert('Payment Failed');
      }

      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Product Checkout</h2>
      
      <div className="mb-6">
        <label htmlFor="product-name" className="block text-lg font-medium text-gray-700">Enter Product Name:</label>
        <input
          type="text"
          id="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <button
          onClick={fetchProductPrice}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
        >
          {isLoading ? "Loading..." : "Fetch Product Price"}
        </button>
      </div>

      {productPrice && totalPrice > 0 ? (
        <>
          <div className="border-t border-gray-300 pt-6">
            <h3 className="text-xl font-semibold text-gray-800">Product: {productName}</h3>
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
        <p className="text-gray-700">Loading product data...</p>
      )}
    </div>
  );
};

export default ProductCheckout;
