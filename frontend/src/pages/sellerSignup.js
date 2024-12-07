import { useEffect, useState } from "react";
import SellerDetails from "../components/sellerDetails";
import ProductForm from "../components/productForm";
import ProductDetails from "../components/ProductDetails";
import UpdateSeller from "../components/UpdateSeller";
import RevenueReport from "../components/RevenueReport"; // Adjust path if needed
import ChangePasswordForm from '../components/ChangePasswordForm';
import ArchivedProducts from '../components/ArchivedProducts';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from "react-icons/fa";
const SellerDashboard = () => {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedTourguide, setSelectedTourguide] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [activeContent, setActiveContent] = useState("seller"); // Default to description
  
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
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false); // Prevents multiple pop-ups
  const [sellerUsername, setSellerUsername] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false); // Dropdown for notifications
 
  

  useEffect(() => {
    const username = localStorage.getItem("sellerUsername"); // Replace with your key
    if (username) {
      setSellerUsername(username);
    } else {
      console.error("Seller username not found.");
    }
  }, []);

  

  const fetchCurrentSeller = async () => {
    const sellerId = localStorage.getItem("sellerId");
    if (!sellerId) {
      console.error("No seller ID found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(`/api/sellerRoute/${sellerId}`);
      if (response.status === 200) {
        setSellers([response.data]); // Store only the current seller
      }
    } catch (err) {
      console.error("Error fetching seller details:", err);
    }
  };

  useEffect(() => {
    fetchCurrentSeller();
  }, []);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  

  const SellerChangePassword = () => (
    <ChangePasswordForm apiEndpoint="/api/sellerRoute/changePassword" />
  );

  useEffect(() => {
    const username = localStorage.getItem('sellerUsername'); // Replace with your key
    if (username) {
      setSellerUsername(username);
    } else {
      console.error('Seller username not found.');
    }
  }, []);

 
  const fetchOutOfStockProducts = async () => {
    try {
      setLoading(true); // Start loading state
      const response = await axios.get('/api/productsRoute/check-stock2'); // Adjust the API endpoint
      const allOutOfStockProducts = response.data.products;

      // Filter products that belong to the current seller
      const sellerProducts = allOutOfStockProducts.filter(
        (product) => product.Seller === sellerUsername
      );

      setOutOfStockProducts(sellerProducts);

      if (sellerProducts.length > 0 && !notificationShown) {
        setShowNotification(true); // Show notification
        setNotificationShown(true); // Prevent further pop-ups in this session
      }

      setError(null); // Clear previous errors
    } catch (err) {
      console.error('Error fetching out-of-stock products:', err);
      setError('Failed to fetch out-of-stock products.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    if (sellerUsername) {
      fetchOutOfStockProducts();
    }
  }, [sellerUsername]);

  // Close the notification pop-up
  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  
  

  // Close the pop-up
  

  // Function to fetch sellers from the backend

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

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
  
    
    
    
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/productsRoute');
        const data = await response.json();
    
        if (response.ok) {
          const sellerName = localStorage.getItem('sellerName');
          const sellerProducts = data.filter((product) => product.Seller === sellerName);
          setProducts(sellerProducts); // Original list of products
          setFilteredProducts(sellerProducts); // Default to all products
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products.");
      }
    };
    
    
    useEffect(() => {
      fetchProducts();
    }, []);
    
    // Fetch out-of-stock products
 
  
    // Filter products by price range
    const filterProducts = () => {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
    
      // Ensure `products` is the source of truth
      const filtered = products.filter((product) => {
        const price = product.Price;
        return (isNaN(min) || price >= min) && (isNaN(max) || price <= max);
      });
    
      setFilteredProducts(filtered); // Update the filteredProducts state
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
      
    }, []);

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-6 h-full">
          {/* Profile Section */}
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
              {sellerUsername.charAt(0).toUpperCase()}
            </div>
            <span className="ml-4 text-lg font-semibold">Hi, {sellerUsername}</span>
          </div>
    
          {/* Sidebar Menu */}
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveContent("seller")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "seller" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Revenue Report
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("products")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "products" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
               My Products
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
                Update Seller
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveContent("filterProducts")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeContent === "filterProducts" ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
                }`}
              >
                Filter Products
              </button>
            </li>
          </ul>
        </div>
    
        {/* Main Content */}
        <div className="w-3/4 p-6 relative">
          {/* Notification Bell */}
          <div className="absolute top-4 right-6">
            <button
              onClick={() => setShowNotification((prev) => !prev)}
              className="text-gray-700 hover:text-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.5 14.5V11a6.001 6.001 0 00-5-5.917V5a2 2 0 10-4 0v.083A6.001 6.001 0 004.5 11v3.5c0 .415-.162.79-.405 1.095L3 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {showNotification && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                <h4 className="font-bold text-gray-800">Notifications</h4>
                <ul className="mt-2 space-y-2">
                  {outOfStockProducts.length > 0 ? (
                    outOfStockProducts.map((product) => (
                      <li key={product._id} className="text-gray-700">
                        {product.Name} is out of stock!
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No notifications</li>
                  )}
                </ul>
              </div>
            )}

          {/* Profile Icon */}
          <button
            onClick={toggleProfileDropdown}
            className="text-gray-700 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14c2.761 0 5-2.239 5-5S14.761 4 12 4 7 6.239 7 9s2.239 5 5 5zm0 0c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"
              />
            </svg>
          </button>
          {showProfileDropdown && (
            <div className="absolute right-10 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
              <h4 className="font-bold text-gray-800">Seller Details</h4>
              <div className="mt-2 text-gray-700">
                {sellers.length > 0 ? (
                  sellers.map((seller) => <SellerDetails key={seller._id} seller={seller} />)
                ) : (
                  <p className="text-gray-500">No details found.</p>
                )}
              </div>
            </div>
          )}
        </div>
    
          {/* Default Description */}
          {activeContent === "description" && (
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the Seller Dashboard</h3>
              <p className="text-lg text-gray-600">
                Manage your details, products, account settings, and more. Choose an option from the menu to get started.
              </p>
            </div>
          )}
    
          {/* Revenue Report */}
          {activeContent === "seller" && (
            <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Revenue Report</h3>
              {sellers.length > 0 ? (
                sellers.map((seller) => <RevenueReport key={seller._id} seller={seller} />)
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
                  <p className="text-gray-500">No products match the given criteria.</p>
                )}
              </div>
            </div>
          )}
        </div>
    
        {/* Terms Popup */}
        
      </div>
    );
    
};

export default SellerDashboard;
