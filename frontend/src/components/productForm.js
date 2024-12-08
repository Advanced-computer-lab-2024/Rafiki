import { useState, useEffect } from "react";
import {
  FaTag,
  FaDollarSign,
  FaImage,
  FaFileAlt,
  FaStore,
  FaStar,
  FaCommentDots,
  FaBoxes,
} from "react-icons/fa";

const ProductForm = ({ existingProduct, onSubmit }) => {
  const [imageFile, setImageFile] = useState(null);
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [Seller, setSeller] = useState("");
  const [Ratings, setRatings] = useState("");
  const [Reviews, setReviews] = useState("");
  const [AvailableQuantity, setAvailableQuantity] = useState("");
  const [error, setError] = useState(null);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.Name || "");
      setPrice(existingProduct.Price || "");
      setDescription(existingProduct.Description || "");
      setSeller(existingProduct.Seller || "");
      setRatings(existingProduct.Ratings || "");
      setReviews(existingProduct.Reviews || "");
      setAvailableQuantity(existingProduct.AvailableQuantity || "");
    }
  }, [existingProduct]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch("/api/sellerRoute");
        const data = await response.json();
        if (response.ok) {
          setSellers(data);
        } else {
          console.error("Failed to fetch sellers:", data);
        }
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    if (imageFile) {
      formData.append("Picture", imageFile);
    }
    formData.append("Price", Price);
    formData.append("Description", Description);
    formData.append("Seller", Seller);
    formData.append("Ratings", Ratings);
    formData.append("Reviews", Reviews);
    formData.append("AvailableQuantity", AvailableQuantity);

    const response = await fetch("api/productsRoute/addProduct", {
      method: existingProduct ? "PUT" : "POST",
      body: formData,
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setName("");
      setImageFile(null);
      setPrice("");
      setDescription("");
      setSeller("");
      setRatings("");
      setReviews("");
      setAvailableQuantity("");

      if (onSubmit) onSubmit();
    }
  };

  return (
    
      <form
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaTag className="text-blue-500 mr-3" />
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full focus:outline-none"
            required
          />
        </div>

        {/* Picture */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaImage className="text-blue-500 mr-3" />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
            className="w-full focus:outline-none"
          />
        </div>
        {existingProduct && existingProduct.Picture && (
          <div className="text-center mt-2">
            <p className="text-gray-500 text-sm">Current Image:</p>
            <img
              src={`/uploads/${existingProduct.Picture}`}
              alt="Current"
              className="w-24 h-24 rounded shadow-md mx-auto"
            />
          </div>
        )}

        {/* Price */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaDollarSign className="text-blue-500 mr-3" />
          <input
            type="text"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaFileAlt className="text-blue-500 mr-3" />
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full focus:outline-none"
            rows="3"
            required
          />
        </div>

        {/* Seller */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaStore className="text-blue-500 mr-3" />
          <select
            value={Seller}
            onChange={(e) => setSeller(e.target.value)}
            className="w-full focus:outline-none"
            required
          >
            <option value="">Select a seller</option>
            {sellers.map((seller) => (
              <option key={seller._id} value={seller.Name}>
                {seller.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Ratings and Reviews */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaStar className="text-blue-500 mr-3" />
            <input
              type="text"
              value={Ratings}
              onChange={(e) => setRatings(e.target.value)}
              placeholder="Ratings"
              className="w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaCommentDots className="text-blue-500 mr-3" />
            <input
              type="text"
              value={Reviews}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="Reviews"
              className="w-full focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Available Quantity */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaBoxes className="text-blue-500 mr-3" />
          <input
            type="text"
            value={AvailableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
            placeholder="Available Quantity"
            className="w-full focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          {existingProduct ? "Update Product" : "Create Product"}
        </button>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center font-medium mt-2">
            {error}
          </div>
        )}
      </form>
    
  );
};

export default ProductForm;
