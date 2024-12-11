import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails"; // Assuming ProductDetails component is available

const ArchivedProducts = () => {
  const [archivedProducts, setArchivedProducts] = useState([]);

  useEffect(() => {
    const fetchArchivedProducts = async () => {
      const response = await fetch("/api/productsRoute/viewArchived");
      const data = await response.json();
      if (response.ok) {
        setArchivedProducts(data);
      } else {
        console.error("Error fetching archived products:", data);
      }
    };

    fetchArchivedProducts();
  }, []);

  const handleUnarchive = async (productId) => {
    const response = await fetch(
      `/api/productsRoute/archiveProduct/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isArchived: false }),
      }
    );

    if (response.ok) {
      alert("Product unarchived successfully!");
      setArchivedProducts(
        archivedProducts.filter((product) => product._id !== productId)
      );
    } else {
      alert("Error unarchiving product.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Archived Products</h2>
      {archivedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <ProductDetails product={product} />
              <button
                onClick={() => handleUnarchive(product._id)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Unarchive
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No archived products found.</p>
      )}
    </div>
  );
};

export default ArchivedProducts;
