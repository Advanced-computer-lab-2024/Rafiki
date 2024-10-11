import { useEffect, useState } from "react";
import SellerForm from "../components/sellerForm"; // Import the seller form
import SellerDetails from "../components/sellerDetails"; // Import seller details
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/productForm";

import UpdateSeller from "../components/UpdateSeller"
const SellerSignup = () => {
  const [sellers, setSellers] = useState([]); // Initialize sellers
  const [isSellerVisible, setIsSellerVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [minPrice, setMinPrice] = useState(""); // State for minimum price
  const [maxPrice, setMaxPrice] = useState(""); // State for maximum price
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  const [selectedTourguide, setSelectedTourguide] = useState(null);
  // Fetch sellers from the backend
  const fetchSellers = async () => {
    const response = await fetch('/api/sellerRoute');
    const json = await response.json();
    if (response.ok) {
      setSellers(json); // Set the state with the fetched sellers
    } else {
      console.error('Error fetching sellers:', json); // Log errors
    }
  };
  const handleUpdate = (tourguide) => {
    setSelectedTourguide(tourguide);
};
  
  

  const fetchProducts = async () => {
    const response = await fetch('/api/productsRoute'); // Adjust the endpoint as necessary
    const json = await response.json();
    if (response.ok) {
      setProducts(json); // Set the state with the fetched products
    } else {
      console.error('Error fetching products:', json); // Log errors
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
      const price = product.Price; // Assuming Price is the field in your product object
      return (isNaN(min) || price >= min) && (isNaN(max) || price <= max);
    });

    setFilteredProducts(filtered);
  };


  const sortProducts = async (order) => {
    const response = await fetch(`/api/productsRoute/sortProducts?order=${order}`);
    const json = await response.json();
    if (response.ok) {
      setProducts(json); // Update the products state with sorted products
    } else {
      console.error('Error sorting products:', json.error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!selectedProduct || !newPrice || !newDescription) {
      alert("Please select a product and fill in the new price and description.");
      return;
    }

    try {
      const response = await fetch(`/api/productsRoute/updateProduct/${selectedProduct.Name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Price: parseFloat(newPrice), Description: newDescription }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product updated successfully!");
        fetchProducts(); // Refresh product list
        setSelectedProduct(null); // Reset selection
        setNewPrice(""); // Clear input
        setNewDescription(""); // Clear input
        setIsUpdateVisible(false); // Hide update form after successful update
      } else {
        alert(`Error updating product: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateClick = () => {
    // Show/hide update form only if a product is selected
    if (selectedProduct) {
      setIsUpdateVisible(!isUpdateVisible);
    } else {
      alert("Please select a product to update.");
    }
  };

  const handleSellerClick = () => {
    setIsSellerVisible(!isSellerVisible);
  };

  const handleProductClick = () => {
    setIsProductVisible(!isProductVisible);
  };

  const handleFilterClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div>
      <h2>Seller Dashboard</h2>
      <button onClick={handleSellerClick}>
        {isSellerVisible ? 'Hide' : 'Show'} Seller Details
      </button>
      {/* {isSellerVisible && (
        <div className="sellers">
          {sellers.length > 0 ? (
            sellers.map(seller => (
              <SellerDetails seller={seller} key={seller._id} />
            ))
          ) : (
            <p>No sellers found.</p>
          )}
        </div>
      )} */}
      {isSellerVisible && (
                <div className="workouts">
                    {sellers && sellers.map(seller => (
                        <div key={seller._id}>
                            <SellerDetails seller={seller} />
                            <button onClick={() => handleUpdate(seller)}>Update</button>
                        </div>
                    ))}
                </div>
            )}

<UpdateSeller existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />

      <button onClick={handleProductClick}>
        {isProductVisible ? 'Hide' : 'Show'} Product Details
      </button>
      {isProductVisible && (
        <div className="products">
           <button onClick={() => sortProducts('asc')}>Sort Ascending</button>
           <button onClick={() => sortProducts('desc')}>Sort Descending</button>
          {products.length > 0 ? (
            products.map(product => (
              <div key={product._id}>
                <ProductDetails product={product} />
                <button
                  onClick={() => {
                    setSelectedProduct(product); // Set the selected product
                    setNewPrice(product.Price); // Pre-fill with current price
                    setNewDescription(product.Description); // Pre-fill with current description
                    setIsUpdateVisible(true); // Show update form
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

      <button onClick={handleUpdateClick}>
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
          <button type="submit">Update Product</button>
        </form>
      )}

      <button onClick={handleFilterClick}>
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

      <SellerForm onSellerAdded={fetchSellers} />
      <ProductForm onProductAdded={fetchProducts} />
    </div>
  );
};

export default SellerSignup;
