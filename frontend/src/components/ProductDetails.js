import { useState } from 'react';
import axios from 'axios';

const ProductDetails = ({ product }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(product.Price); // Start with the original product price
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);

    // Set the conversion rate based on the selected currency
    switch (selectedCurrency) {
      case 'EGP':
        setCurrencyMultiplier(50);
        break;
      case 'EUR':
        setCurrencyMultiplier(0.92);
        break;
      default: // USD
        setCurrencyMultiplier(1);
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
      const discountAmount = (product.Price * usedPromoCode.discount) / 100;
      const discountedPrice = product.Price - discountAmount;

      setFinalPrice(discountedPrice.toFixed(2)); // Update final price with the discounted value
      setMessage(`Promo code applied! You saved ${discountAmount.toFixed(2)}.`);
    } catch (err) {
      setError(err.message);
      setFinalPrice(product.Price); // Reset to the original price if promo code is invalid
    }
  };


  return (
    <div className="product-details">
      <h4>{product.Name}</h4>
      {/* <p><strong>Picture: </strong>${product.Picture}</p> */}
      <img src={`/uploads/${product.Picture}`} alt={product.Name} style={{ width: '100%', height: 'auto' }} />
      <p><strong>Price: </strong>
        {currency} {(parseFloat(finalPrice) * currencyMultiplier).toFixed(2)}
        <select value={currency} onChange={handleCurrencyChange} style={{ marginLeft: '10px' }}>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
          <option value="EUR">EUR</option>
        </select>
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
      </p>
      <p><strong>Description: </strong>{product.Description}</p>
      <p><strong>Seller: </strong>{product.Seller}</p>
      <p><strong>Ratings: </strong>{product.Ratings}</p>
      <p><strong>Reviews: </strong>{product.Reviews}</p>
      <p><strong>AvailableQuantity: </strong>{product.AvailableQuantity}</p>
    </div>
  );
}

export default ProductDetails;
