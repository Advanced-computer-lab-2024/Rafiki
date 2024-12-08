import { useState } from "react";

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

  const validatePromoCode = async () => {
    try {
      const response = await fetch("/api/PromoCodeRoute/use", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: promoCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid promo code.");
      }

      const { promoCode: usedPromoCode } = await response.json();
      const discountAmount = (product.Price * usedPromoCode.discount) / 100;
      const discountedPrice = product.Price - discountAmount;

      setFinalPrice(discountedPrice.toFixed(2));
      setMessage(`Promo code applied! You saved ${discountAmount.toFixed(2)}.`);
    } catch (err) {
      setError(err.message);
      setFinalPrice(product.Price);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-md p-5 max-w-3xl w-full">
        {/* Product Image */}
        <div className="flex justify-center mb-5">
          <img
            src={`/uploads/${product.Picture}`}
            alt={product.Name}
            className="rounded-lg shadow-md transition-transform transform hover:scale-105 w-full max-h-80 object-cover"
          />
        </div>
  
        {/* Product Name */}
        <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">{product.Name}</h4>
  
        {/* Price and Currency Selector */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-lg font-medium text-gray-700">
            {currency} {(parseFloat(finalPrice) * currencyMultiplier).toFixed(2)}
          </span>
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="border border-gray-300 bg-transparent rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-400"
          >
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
  
        {/* Promo Code */}
        <div className="mb-5">
          <label
            htmlFor="promoCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Promo Code:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              id="promoCode"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-grow border border-gray-300 bg-transparent rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-400"
            />
            <button
              onClick={validatePromoCode}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Apply
            </button>
          </div>
        </div>
  
        {/* Messages */}
        {message && <p className="text-green-600 font-medium mb-4">{message}</p>}
        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
  
        {/* Product Details */}
        <div className="space-y-3 text-sm text-gray-700">
          <p><strong>Description:</strong> {product.Description}</p>
          <p><strong>Seller:</strong> {product.Seller}</p>
          <p><strong>Ratings:</strong> {product.Ratings}</p>
          <p><strong>Reviews:</strong> {product.Reviews}</p>
          <p><strong>Available Quantity:</strong> {product.AvailableQuantity}</p>
        </div>
      </div>
    </div>
  );
  
};

export default ProductDetails;
