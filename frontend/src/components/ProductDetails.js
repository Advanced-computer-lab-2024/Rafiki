import { useState } from 'react';

const ProductDetails = ({ product }) => {
    const [currency, setCurrency] = useState('USD');
    const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

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
      console.log("Product Price:", product.price);

    return (
        <div className="product-details">
            <h4>{product.Name}</h4>
            {/* <p><strong>Picture: </strong>${product.Picture}</p> */}
            <img src={`/uploads/${product.Picture}`} alt={product.Name} style={{ width: '100%', height: 'auto' }} />
            <p><strong>Price: </strong>
        {currency} {(parseFloat(product.Price) * currencyMultiplier).toFixed(2)}
        <select value={currency} onChange={handleCurrencyChange} style={{ marginLeft: '10px' }}>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
          <option value="EUR">EUR</option>
        </select>
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
