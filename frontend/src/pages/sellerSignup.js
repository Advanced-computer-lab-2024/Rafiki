import { useEffect, useState } from "react";
import SellerDetails from "../components/sellerDetails";
import ProductForm from "../components/productForm";
import ProductDetails from "../components/ProductDetails";
import UpdateSeller from "../components/UpdateSeller";
import RevenueReport from "../components/RevenueReport"; // Adjust path if needed
import ChangePasswordForm from '../components/ChangePasswordForm';
import ArchivedProducts from '../components/ArchivedProducts';
import pic from '../pics/pic3.jpg'
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
 
  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
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
 
    return (
      <div
      className="flex min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${pic})`, // Replace with your desired background image URL
      }}
    >
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-6">
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
            {sellerUsername.charAt(0).toUpperCase()}
          </div>
          <span className="ml-4 text-lg font-semibold">Hi, {sellerUsername}</span>
        </div>
  
        {/* Sidebar Menu */}
        <ul className="space-y-6">
          <li>
            <button
              onClick={() => setActiveContent("seller")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "seller"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m2 0a2 2 0 10-4 0 2 2 0 014 0zM4 6h16M4 18h16"
                />
              </svg>
              Revenue Report
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("filterProducts")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "filterProducts"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16l3 3 3-3m6-6l3-3 3 3m-9-6v18"
                />
              </svg>
              My Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("archivedProducts")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "archivedProducts"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Archived Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("addProduct")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "addProduct"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Product
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("changePassword")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "changePassword"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Change Password
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("updateSeller")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "updateSeller"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Update Seller
            </button>
          </li>
        </ul>
      </div>
  
      {/* Main Content */}
      <div className="w-3/4 p-6 relative">
      <div className="absolute top-4 right-6 flex items-center space-x-6 z-50">
  {/* Notification Bell */}
  <div className="relative">
    <button
      onClick={() => {
        toggleNotificationDropdown();
        if (showProfileDropdown) toggleProfileDropdown(); // Close profile dropdown if open
      }}
      className="text-black hover:text-yellow-400 z-50" // Ensure button is always in front
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.5 14.5V11a6.001 6.001 0 00-5-5.917V5a2 2 0 10-4 0v.083A6.001 6.001 0 004.5 11v3.5c0 .415-.162.79-.405 1.095L3 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </button>
    {showNotificationDropdown && (
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-40">
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
  </div>

  {/* Profile Icon */}
  <div className="relative">
    <button
      onClick={() => {
        toggleProfileDropdown();
        if (showNotificationDropdown) toggleNotificationDropdown(); // Close notification dropdown if open
      }}
      className="text-black hover:text-blue-700 z-50" // Ensure button is always in front
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14c2.761 0 5-2.239 5-5S14.761 4 12 4 7 6.239 7 9s2.239 5 5 5zm0 0c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"
        />
      </svg>
    </button>
    {showProfileDropdown && (
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-40">
        <h4 className="font-bold text-gray-800">Seller Details</h4>
        <div className="mt-2 text-gray-700">
          {sellers.length > 0 ? (
            sellers.map((seller) => (
              <SellerDetails key={seller._id} seller={seller} />
            ))
          ) : (
            <p className="text-gray-500">No details found.</p>
          )}
        </div>
      </div>
    )}
  </div>
</div>

  
        {/* Welcome Message */}
        {activeContent === "description" && (
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Welcome to the Seller Dashboard
            </h3>
            <p className="text-lg text-gray-600">
              Manage your details, products, account settings, and more. Choose
              an option from the menu to get started.
            </p>
          </div>
        )}
  
        {/* Revenue Report */}
        {activeContent === "seller" && (
          <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">
              Revenue Report
            </h3>
            {sellers.length > 0 ? (
              sellers.map((seller) => (
                <RevenueReport key={seller._id} seller={seller} />
              ))
            ) : (
              <p className="text-gray-500">No seller details found. Please log in.</p>
            )}
          </div>
        )}
  

{activeContent === "products" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md max-w-md mx-auto">
    <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">Products</h3>
    {products.length > 0 ? (
      products.map((product) => (
        <ProductDetails key={product._id} product={product} />
      ))
    ) : (
      <p className="text-gray-500 text-center">No products found.</p>
    )}
  </div>
)}

{/* Archived Products */}
{activeContent === "archivedProducts" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md max-w-md mx-auto">
    <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">Archived Products</h3>
    <ArchivedProducts />
  </div>
)}


      {/* Add New Product */}
      {activeContent === "addProduct" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md max-w-md mx-auto">
    <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">Add New Product</h3>
    <ProductForm onProductAdded={fetchProducts} />
  </div>
)}

{activeContent === "changePassword" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md max-w-md mx-auto">
    <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">Change Password</h3>
    <ChangePasswordForm apiEndpoint="/api/sellerRoute/changePassword" />
  </div>
)}

{/* Update Seller */}
{activeContent === "updateSeller" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md max-w-md mx-auto">
    <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">Update Seller</h3>
    <UpdateSeller
      existingTourguide={selectedTourguide}
      onUpdate={() => setSelectedTourguide(null)}
    />
  </div>
)}

      {/* Filter Products */}
      {activeContent === "filterProducts" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md max-w-5xl mx-auto">
    <h3 className="text-xl font-semibold text-center mb-4">My Products</h3>
    
    {/* Filter Inputs */}
    <div className="flex items-center mb-5 space-x-3">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 focus:ring focus:ring-blue-400 text-sm placeholder-gray-400"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 focus:ring focus:ring-blue-400 text-sm placeholder-gray-400"
      />
      <button
        onClick={filterProducts}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition"
      >
        Apply
      </button>
    </div>

    {/* Filtered Products */}
    <div className="mt-4 overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No products match the given criteria.
          </p>
        )}
      </div>
    </div>
  </div>
)}


    </div>
  </div>
    );
    
};

export default SellerDashboard;