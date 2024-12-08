import { useState } from "react";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

const ProductDetails = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);

  return (
    <>
      {/* Card */}
      <div
        className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
        style={{ maxWidth: "300px" }}
      >
        {/* Product Image */}
        <img
          src={`/uploads/${product.Picture}`}
          alt={product.Name}
          className="rounded-lg w-full h-48 object-cover mb-3"
        />
        {/* Product Name */}
        <h4 className="text-lg font-bold text-gray-800 mb-2">{product.Name}</h4>
        {/* Product Price */}
        <p className="text-blue-600 font-semibold">
          USD ${product.Price.toFixed(2)}
        </p>
        {/* Show More Button */}
        <button
          onClick={handleShowDetails}
          className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-400"
        >
          Show Details
        </button>
      </div>

      {/* Modal for Full Details */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseDetails}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={handleCloseDetails}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Product Image */}
            <img
              src={`/uploads/${product.Picture}`}
              alt={product.Name}
              className="rounded-lg w-full h-56 object-cover mb-4"
            />
            {/* Product Name */}
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              {product.Name}
            </h4>
            {/* Product Price */}
            <p className="text-xl text-blue-600 font-semibold mb-4">
              USD ${product.Price.toFixed(2)}
            </p>
            {/* Product Details */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Description:</strong> {product.Description}
              </p>
              <p>
                <strong>Seller:</strong> {product.Seller}
              </p>
              <p>
                <strong>Ratings:</strong> {product.Ratings}
              </p>
              <p>
                <strong>Reviews:</strong> {product.Reviews}
              </p>
              <p>
                <strong>Available Quantity:</strong> {product.AvailableQuantity}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
