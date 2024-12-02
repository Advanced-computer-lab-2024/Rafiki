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
import { useLocation } from "react-router-dom";
import axios from 'axios';
const SellerSignup = () => {
  const [sellers, setSellers] = useState([]);
  const [isSellerVisible, setIsSellerVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isArchivedVisible, setIsArchivedVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [selectedTourguide, setSelectedTourguide] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(true); // Show the popup initially
  const navigate = useNavigate();
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const handleAccept = () => {
    setShowPopup(false); // Hide the popup when terms are accepted
  };

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
  const fetchSellers = async () => {
    const response = await fetch('/api/sellerRoute');
    const json = await response.json();
    if (response.ok) {
      setSellers(json);
    } else {
      console.error('Error fetching sellers:', json);
    }
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

  const fetchProducts = async () => {
    const response = await fetch('/api/productsRoute');
    const json = await response.json();
    if (response.ok) {
      setProducts(json);
      setFilteredProducts(json);
    } else {
      console.error('Error fetching products:', json);
    }
  };

  useEffect(() => {
    fetchSellers();
    fetchProducts();
  }, []);

  const filterProducts = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    const filtered = products.filter(product => {
      const price = product.Price;
      return (isNaN(min) || price >= min) && (isNaN(max) || price <= max);
    });

    setFilteredProducts(filtered);
  };

  const handleArchive = async (productId, isArchived) => {
    const response = await fetch(`/api/productsRoute/archiveProduct/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isArchived: !isArchived })
    });

    if (response.ok) {
      alert(`Product ${isArchived ? 'unarchived' : 'archived'} successfully!`);
      fetchProducts();
    } else {
      alert('Error archiving/unarchiving product.');
    }
  };

  const handleUpdate = (seller) => {
    setSelectedTourguide(seller);
    setIsUpdateVisible(true);
  };

  const sortProducts = async (order) => {
    const response = await fetch(`/api/productsRoute/sortProducts?order=${order}`);
    const json = await response.json();
    if (response.ok) {
      setProducts(json);
      setFilteredProducts(json);
    } else {
      console.error('Error sorting products:', json.error);
    }
  };

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

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
        setIsUpdateVisible(false);
      } else {
        alert(`Error updating product: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  

  return (
    <div>
        {showPopup ? (
        <TermsPopup onAccept={handleAccept} />
      ) : (
        <div>
      
          <p>You have accepted the terms and conditions.</p>
        </div>
      )}
      <h2>Seller Dashboard</h2>

   
      <div>
          {/* Pop-up Notification */}
          {showNotification && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={handleCloseNotification}
                >
                  &times; {/* Close button */}
                </button>
                <h2 className="text-xl font-bold text-red-700">Out of Stock Products</h2>
                <ul className="mt-4 space-y-2">
                  {outOfStockProducts.map(product => (
                    <li key={product._id} className="text-gray-700">
                      {product.Name} is out of stock!
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          </div>
      {/* Button for requesting account deletion under the upload picture section */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => requestAccountDeletion(selectedTourguide?._id)}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Request my account to be deleted off the system
        </button>
      </div>

      <button onClick={() => setIsSellerVisible(!isSellerVisible)}>
        {isSellerVisible ? 'Hide' : 'Show'} Seller Details
      </button>

      {isSellerVisible && (
        <div className="workouts">
          {sellers && sellers.map(seller => (
            <div key={seller._id} style={{ marginBottom: '20px' }}>
              <SellerDetails seller={seller} />
              <button onClick={() => handleUpdate(seller)}>Update</button>
            </div>
          ))}
        </div>
      )}

      <UpdateSeller existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />

      <button onClick={() => setIsProductVisible(!isProductVisible)}>
        {isProductVisible ? 'Hide' : 'Show'} Product Details
      </button>

      {isProductVisible && (
        <div className="products">
          <button onClick={() => sortProducts('asc')}>Sort Ascending</button>
          <button onClick={() => sortProducts('desc')}>Sort Descending</button>
          <h3>Search Products</h3>
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product._id}>
                <ProductDetails product={product} />
                <button onClick={() => handleArchive(product._id, product.isArchived)}>
                  {product.isArchived ? 'Unarchive' : 'Archive'}
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setNewPrice(product.Price);
                    setNewDescription(product.Description);
                    setImageFile(null);
                    setIsUpdateVisible(true);
                  }}
                >
                  Update {product.Name}
                </button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      <button onClick={() => setIsUpdateVisible(!isUpdateVisible)}>
        {isUpdateVisible ? 'Hide' : 'Show'} Update Product
      </button>

      {isUpdateVisible && selectedProduct && (
        <form onSubmit={handleUpdateProduct}>
          <h4>Updating: {selectedProduct.Name}</h4>
          <input
            type="number"
            placeholder="New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="New Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
          />
          <button type="submit">Update Product</button>
        </form>
      )}

      <button onClick={() => setIsFilterVisible(!isFilterVisible)}>
        {isFilterVisible ? 'Hide' : 'Show'} Filter Products
      </button>

      {isFilterVisible && (
        <div className="products">
          <div>
            <h3>Filter Products by Price</h3>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={filterProducts}>Apply Filter</button>
          </div>

          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductDetails product={product} key={product._id} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      <button onClick={() => setIsArchivedVisible(!isArchivedVisible)}>
        {isArchivedVisible ? 'Hide' : 'Show'} Archived Products
      </button>
      {isArchivedVisible && <ArchivedProducts />}

      <ProductForm onProductAdded={fetchProducts} />
      <SellerChangePassword />

      {/* Display error or success messages */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
    </div>
  );
};

export default SellerSignup;
