import { useState, useEffect } from "react";

const ProductForm = ({ existingProduct, onSubmit }) => {
  const [imageFile, setImageFile] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [Seller, setSeller] = useState("");
  const [Ratings, setRatings] = useState("");
  const [Reviews, setReviews] = useState("");
  const [AvailableQuantity, setAvailableQuantity] = useState("");
  const [error, setError] = useState(null);
  const [sellers, setSellers] = useState([]); // List of sellers

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
    // Fetch sellers from the database
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
    }
    if (response.ok) {
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

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        {existingProduct ? "Update Product" : "Create Product"}
      </button>

      {isVisible && (
        <form
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mt-4 space-y-4"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-bold text-gray-800">
            {existingProduct ? "Update Product" : "Create Product"}
          </h3>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Name:</label>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-4 py-2 mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Picture:</label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
              className="border rounded px-4 py-2 mt-1"
            />
            {existingProduct && existingProduct.Picture && (
              <div className="mt-2">
                <p className="text-gray-500 text-sm">Current Image:</p>
                <img
                  src={`/uploads/${existingProduct.Picture}`}
                  alt="Current"
                  className="w-24 h-24 rounded shadow-md"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Price:</label>
            <input
              type="text"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded px-4 py-2 mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Description:</label>
            <textarea
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-4 py-2 mt-1"
              rows="3"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Seller:</label>
            <select
              value={Seller}
              onChange={(e) => setSeller(e.target.value)}
              className="border rounded px-4 py-2 mt-1"
            >
              <option value="">Select a seller</option>
              {sellers.map((seller) => (
                <option key={seller._id} value={seller.Name}>
                  {seller.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">Ratings:</label>
              <input
                type="text"
                value={Ratings}
                onChange={(e) => setRatings(e.target.value)}
                className="border rounded px-4 py-2 mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-600">Reviews:</label>
              <input
                type="text"
                value={Reviews}
                onChange={(e) => setReviews(e.target.value)}
                className="border rounded px-4 py-2 mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">
              Available Quantity:
            </label>
            <input
              type="text"
              value={AvailableQuantity}
              onChange={(e) => setAvailableQuantity(e.target.value)}
              className="border rounded px-4 py-2 mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            {existingProduct ? "Update Product" : "Create Product"}
          </button>

          {error && (
            <div className="text-red-500 mt-2 text-center font-medium">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ProductForm;
