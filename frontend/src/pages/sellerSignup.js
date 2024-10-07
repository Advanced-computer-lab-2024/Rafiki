import { useEffect, useState } from "react";
import SellerForm from "../components/sellerForm"; // Import the seller form
// import ProductForm from "../components/productsForm"; // Import the product form
import SellerDetails from "../components/sellerDetails"; // Import seller details
// import ProductDetails from "../components/productsDetails"; // Import product details

const SellerSignup = () => {
  const [sellers, setSellers] = useState([]); // Initialize sellers
  // const [products, setProducts] = useState([]); // Initialize products
  const [isSellerVisible, setIsSellerVisible] = useState(false);
  // const [isProductVisible, setIsProductVisible] = useState(false);

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

  // Fetch products from the backend
  // const fetchProducts = async () => {
  //   const response = await fetch('/api/productsRoute/getProducts');
  //   const json = await response.json();
  //   if (response.ok) {
  //     setProducts(json); // Set the state with the fetched products
  //   } else {
  //     console.error('Error fetching products:', json); // Log errors
  //   }
  // };

  useEffect(() => {
    fetchSellers(); // Fetch sellers when the component mounts
    // fetchProducts(); // Fetch products when the component mounts
  }, []);

  // Toggle seller details visibility
  const handleSellerClick = () => {
    setIsSellerVisible(!isSellerVisible);
  };

  // // Toggle product details visibility
  // const handleProductClick = () => {
  //   setIsProductVisible(!isProductVisible);
  // };

  return (
    <div>
      <h2>Seller Dashboard</h2>
      <button onClick={handleSellerClick}>
        {isSellerVisible ? 'Hide' : 'Show'} Seller Details
      </button>
      {isSellerVisible && (
        <div className="sellers">
          {sellers.length > 0 ? (
            sellers.map(seller => (
              <SellerDetails seller={seller} key={seller._id} />
            ))
          ) : (
            <p>No sellers found.</p>
          )}
        </div>
      )}
      
      {/* <button onClick={handleProductClick}>
        {isProductVisible ? 'Hide' : 'Show'} Products
      </button>
      {isProductVisible && (
        <div className="products">
          {products.length > 0 ? (
            products.map(product => (
              <ProductDetails product={product} key={product._id} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )} */}
      
      <SellerForm onSellerAdded={fetchSellers} /> {/* Pass the fetch function */}
      {/* <ProductForm onProductAdded={fetchProducts} /> Pass the fetch function */}
    </div>
  );
};

export default SellerSignup;
