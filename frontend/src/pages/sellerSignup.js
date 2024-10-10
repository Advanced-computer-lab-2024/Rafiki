import { useEffect, useState } from "react";
import SellerForm from "../components/sellerForm"; // Import the seller form
import SellerDetails from "../components/sellerDetails"; // Import seller details
import ProductDetails from "../components/ProductDetails";
import UpdateSeller from "../components/UpdateSeller"
const SellerSignup = () => {
  const [sellers, setSellers] = useState([]); // Initialize sellers
  const [isSellerVisible, setIsSellerVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isProductVisible, setIsProductVisible] = useState(false);
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

  
  const handleSellerClick = () => {
    setIsSellerVisible(!isSellerVisible);
  };

  const handleProductClick = () => {
    setIsProductVisible(!isProductVisible);
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
          {products.length > 0 ? (
            products.map(product => (
              <ProductDetails product={product} key={product._id} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
      
      
      
      <SellerForm onSellerAdded={fetchSellers} /> 
    </div>
  );
};

export default SellerSignup;
