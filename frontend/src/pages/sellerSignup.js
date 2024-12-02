import { useEffect, useState } from "react";
import SellerForm from "../components/sellerForm";
import SellerDetails from "../components/sellerDetails";
import ProductForm from "../components/productForm";
import ProductDetails from "../components/ProductDetails";
import UpdateSeller from "../components/UpdateSeller";
import ChangePasswordForm from '../components/ChangePasswordForm';
import ArchivedProducts from '../components/ArchivedProducts';
import TermsPopup from "../components/TermsPopup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerDashboard = () => {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedTourguide, setSelectedTourguide] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [activeContent, setActiveContent] = useState("description"); // Default to description
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(true); // Terms popup state
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const SellerChangePassword = () => (
    <ChangePasswordForm apiEndpoint="/api/sellerRoute/changePassword" />
  );
  
  
  const fetchOutOfStockProducts = async () => {
    try {
      setLoading(true); // Start loading state
      const response = await axios.get('/api/productsRoute/check-stock'); // Replace with your backend URL
      const products = response.data.products;
      setOutOfStockProducts(products);
      setShowNotification(products.length > 0); // Show the notification if there are out-of-stock products
      setError(null); // Clear previous errors
    } catch (err) {
      console.error('Error fetching out-of-stock products:', err);
      setError('Failed to fetch out-of-stock products.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };




  useEffect(() => {
    fetchOutOfStockProducts();

    // Optional: Poll for updates every 30 seconds
    //const interval = setInterval(fetchOutOfStockProducts, 30000);
    //return () => clearInterval(interval); // Clean up interval
  }, []);

  // Close the pop-up
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  // Function to fetch sellers from the backend


  // Function to request account deletion for a seller
  const requestAccountDeletion = async (sellerId) => {
    try {
      const response = await fetch(`/api/sellerRoute/deleteRequest/${sellerId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Account deletion requested successfully! If eligible, it will be processed soon.");
        fetchSellers(); // Refresh the seller list
      } else {
        setError(result.message || "Failed to request account deletion due to pending obligations.");
      }
    } catch (error) {
      console.error("Error requesting account deletion:", error);
      setError("An error occurred while requesting account deletion.");
    }
  };
    // Fetch sellers
    const fetchSellers = async () => {
      try {
        const response = await fetch('/api/sellerRoute');
        const data = await response.json();
        if (response.ok) setSellers(data);
      } catch (err) {
        setError("Error fetching sellers.");
      }
    };
  
    const fetchCurrentSeller = async () => {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        setError("No seller ID found. Please log in again.");
        return;
      }
    
      try {
        const response = await axios.get(`/api/sellerRoute/${sellerId}`);
        if (response.status === 200) {
          setSellers([response.data]); // Store only the current seller
        }
      } catch (err) {
        setError("Error fetching seller details.");
      }
    };
    
    
    
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/productsRoute');
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (err) {
        setError("Error fetching products.");
      }
    };
  
    // Fetch out-of-stock products
 
  
    // Filter products by price range
    const filterProducts = () => {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
  
      const filtered = products.filter(product => {
        const price = product.Price;
        return (isNaN(min) || price >= min) && (isNaN(max) || price <= max);
      });
  
      setFilteredProducts(filtered);
    };
  
    // Search products by name
    const handleSearch = () => {
      const filtered = products.filter(product =>
        product.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    };
  
    // Handle updating a product
    const handleUpdateProduct = async (e) => {
      e.preventDefault();
  
      if (!selectedProduct || !newPrice || !newDescription) {
        alert("Please select a product and fill in the new price and description.");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("Price", parseFloat(newPrice));
        formData.append("Description", newDescription);
        if (imageFile) {
          formData.append("Picture", imageFile);
        }
  
        const response = await fetch(`/api/productsRoute/updateProduct/${selectedProduct.Name}`, {
          method: "PUT",
          body: formData,
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Product updated successfully!");
          fetchProducts();
          setSelectedProduct(null);
          setNewPrice("");
          setNewDescription("");
          setImageFile(null);
        } else {
          alert(`Error updating product: ${result.error}`);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };
  
    // Accept terms and conditions
    const handleAcceptTerms = () => setShowPopup(false);
  
    useEffect(() => {
      fetchCurrentSeller();
      fetchProducts();
      fetchOutOfStockProducts();
    }, []);

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-6 h-full">
          <h3 className="text-xl font-bold mb-4">Seller Dashboard</h3>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveContent("sellers")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "sellers" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Show Seller Details
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("products")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "products" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Show Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("archivedProducts")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "archivedProducts" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Archived Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("addProduct")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "addProduct" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Add New Product
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("changePassword")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "changePassword" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Change Password
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("updateSeller")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "updateSeller" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Show Update Seller
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("filterProducts")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "filterProducts" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Show Filter Products
              </button>
            </li>
            <li>
              <button
                onClick={() => requestAccountDeletion(selectedTourguide?._id)}
                className="w-full text-left bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Request My Account to Be Deleted
              </button>
            </li>
          </ul>
        </div>
    
        {/* Main Content */}
        <div className="w-3/4 p-6">
          {/* Default Description */}
          {activeContent === "description" && (
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the Seller Dashboard</h3>
              <p className="text-lg text-gray-600">
                Manage your details, products, account settings, and more. Choose an option from the menu to get started.
              </p>
            </div>
          )}
    
          {/* Seller Details */}
          {activeContent === "sellers" && (
  <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Details</h3>
    {sellers.length > 0 ? (
      sellers.map((seller) => (
        <SellerDetails key={seller._id} seller={seller} />
      ))
    ) : (
      <p className="text-gray-500">No seller details found. Please log in.</p>
    )}
  </div>
)}
    
          {/* Products */}
          {activeContent === "products" && (
            <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Products</h3>
              {products.length > 0 ? (
                products.map((product) => <ProductDetails key={product._id} product={product} />)
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </div>
          )}
    
          {/* Archived Products */}
          {activeContent === "archivedProducts" && <ArchivedProducts />}
    
          {/* Add New Product */}
          {activeContent === "addProduct" && (
            <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h3>
              <ProductForm onProductAdded={fetchProducts} />
            </div>
          )}
    
          {/* Change Password */}
          {activeContent === "changePassword" && (
            <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h3>
              <ChangePasswordForm apiEndpoint="/api/sellerRoute/changePassword" />
            </div>
          )}
    
          {/* Update Seller */}
          {activeContent === "updateSeller" && (
            <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Seller</h3>
              <UpdateSeller existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
            </div>
          )}
    
          {/* Filter Products */}
          {activeContent === "filterProducts" && (
            <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filter Products by Price</h3>
              <div className="flex items-center mb-4">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border rounded px-3 py-2 mr-4 w-1/2"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border rounded px-3 py-2 mr-4 w-1/2"
                />
                <button
                  onClick={filterProducts}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Apply Filter
                </button>
              </div>
              <div className="mt-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => <ProductDetails key={product._id} product={product} />)
                ) : (
                  <p className="text-gray-500">No products found.</p>
                )}
              </div>
            </div>
          )}
        </div>
    
        {/* Terms Popup */}
        {showPopup && <TermsPopup onAccept={handleAcceptTerms} />}
      </div>
    );
    
};

export default SellerDashboard;
