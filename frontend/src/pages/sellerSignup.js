import { useEffect, useState } from "react";
import SellerForm from "../components/sellerForm";
import SellerDetails from "../components/sellerDetails";
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/productForm";
import UpdateSeller from "../components/UpdateSeller";
import ChangePasswordForm from '../components/ChangePasswordForm';
import ArchivedProducts from '../components/ArchivedProducts';  // Corrected import

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

  const SellerChangePassword = () => (
    <ChangePasswordForm apiEndpoint="/api/sellerRoute/changePassword" />
  );
  // Fetch sellers from the backend
  const fetchSellers = async () => {
    const response = await fetch('/api/sellerRoute');
    const json = await response.json();
    if (response.ok) {
      setSellers(json);
    } else {
      console.error('Error fetching sellers:', json);
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
      fetchProducts(); // Refresh product list
    } else {
      alert('Error archiving/unarchiving product.');
    }
  };

  const handleUpdate = (seller) => {
    setSelectedTourguide(seller);
    setIsUpdateVisible(true); // Show the update form
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
        fetchProducts(); // Refresh product list
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

  const handleUpdateClick = () => {
    if (selectedProduct) {
      setIsUpdateVisible(!isUpdateVisible);
    } else {
      alert("Please select a product to update.");
    }
  };

  const handleSellerClick = () => setIsSellerVisible(!isSellerVisible);
  const handleProductClick = () => setIsProductVisible(!isProductVisible);
  const handleArchivedClick = () => setIsArchivedVisible(!isArchivedVisible);
  const handleFilterClick = () => setIsFilterVisible(!isFilterVisible);

  return (
    <div>
      <h2>Seller Dashboard</h2>

      <button onClick={handleSellerClick}>
        {isSellerVisible ? 'Hide' : 'Show'} Seller Details
      </button>
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
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
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

      <button onClick={handleArchivedClick}>
        {isArchivedVisible ? 'Hide' : 'Show'} Archived Products
      </button>
      {isArchivedVisible && <ArchivedProducts />}

      <SellerForm onSellerAdded={fetchSellers} />
      <ProductForm onProductAdded={fetchProducts} />
      <SellerChangePassword/>
    </div>
  );
};

export default SellerSignup;


