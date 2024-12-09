import { useState } from "react";
import { FaDollarSign, FaRegCreditCard, FaTag, FaEdit, FaStar, FaShoppingCart } from "react-icons/fa";

const ProductDetails = ({ product }) => {
  const [currency, setCurrency] = useState("USD");
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(product.Price);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);

    switch (selectedCurrency) {
      case "EGP":
        setCurrencyMultiplier(50);
        break;
      case "EUR":
        setCurrencyMultiplier(0.92);
        break;
      default:
        setCurrencyMultiplier(1);
    }
  };

  
  return (
    <div className="flex justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-6 max-w-3xl w-full">
        {/* Product Image */}
        <div className="flex justify-center mb-6">
          <img
            src={`/uploads/${product.Picture}`}
            alt={product.Name}
            className="rounded-lg shadow-md transition-transform transform hover:scale-105 w-full max-h-80 object-cover"
          />
        </div>
  
        {/* Product Name */}
        <h4 className="text-3xl font-semibold text-gray-800 text-center mb-4">{product.Name}</h4>
  
        {/* Price and Currency Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FaDollarSign className="text-blue-500 text-xl" />
            <span className="text-lg font-medium text-gray-700">
              {currency} {(parseFloat(finalPrice) * currencyMultiplier).toFixed(2)}
            </span>
          </div>
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="border border-gray-300 bg-transparent rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-400"
          >
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
  
       
  
        {/* Messages */}
        {message && <p className="text-green-600 font-medium mb-4">{message}</p>}
        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
  
        {/* Product Details */}
        <div className="space-y-3 text-sm text-gray-700">
          <p><strong className="font-semibold text-gray-800">Description:</strong> {product.Description}</p>
          <p><strong className="font-semibold text-gray-800">Seller:</strong> {product.Seller}</p>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-2" />
            <span>{product.Ratings} / 5 ({product.Reviews} reviews)</span>
          </div>
          <p><strong className="font-semibold text-gray-800">Available Quantity:</strong> {product.AvailableQuantity}</p>
        </div>
  
        {/* Add to Cart Button */}
        
      </div>
    </div>
  );
};

export default ProductDetails;
