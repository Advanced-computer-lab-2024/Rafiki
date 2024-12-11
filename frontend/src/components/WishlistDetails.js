import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";


import Rating from '../components/Rating';
import { fetchProductss, fetchproductRatings, submitproductRating } from '../components/productService';

const WishlistDetails = () => {
    const [wishlist, setWishlist] = useState(null); // State to store the wishlist
    const [username, setUsername] = useState(""); // State to store the entered username
    const [isFieldVisible, setIsFieldVisible] = useState(false); // Toggle field visibility
    const [amount, setAmount] = useState(1); // State to track the amount
    const [isVisibleSearchCart, setIsVisibleSearchCart] = useState(false);
    const [Cartusername, setCartUsername] = useState("");

    const [ratings, setRatings] = useState({}); // To hold ratings for each activity
    const [tourists, setTourists] = useState(null);
 
    const [nameBeforeRating, setNameBeforeRating] = useState(''); // New state for the entered name

    const [visibleRating, setVisibleRating] = useState({});
        const handleRateProduct = async (productId, rating, comment) => {
            try {
                await submitproductRating(productId, rating, comment, nameBeforeRating); // Submit the rating
                const updatedRatings = await fetchproductRatings(productId); // Fetch the updated ratings
        
                // Update state with the new ratings
                setRatings(prevRatings => ({
                    ...prevRatings,
                    [productId]: updatedRatings,
                }));
        
                console.log("Rating submitted successfully for", nameBeforeRating);
            } catch (error) {
                console.error("Failed to submit rating:", error);
            }
        };
        

    const handleRateProductButtonClick = (productId) => {
        const name = prompt("Please enter your name to rate this product:");
        if (!name) {
            alert("Name is required to rate the product.");
            return;
        }
        const tourist = tourists?.find(t => t.Username?.toLowerCase() === name.toLowerCase());
        if (tourist && tourist.PurchasedProducts?.includes(productId)) {
            setNameBeforeRating(name); // Set the entered name
            setVisibleRating(prev => ({ ...prev, [productId]: true }));
        } else {
            alert("You must have purchased this product to rate it.");
        }
    };

    useEffect(() => {
        const fetchTourists = async () => {
            const response = await fetch('/api/TouristRoute');
            const json = await response.json();

            if (response.ok) {
                setTourists(json);
            }
        };

        fetchTourists();
    }, []);
    useEffect(() => {
        const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
        setRatings(savedRatings);
    }, []); // Runs only on mount
    
    useEffect(() => {
        if (Object.keys(ratings).length) {
            localStorage.setItem('ratings', JSON.stringify(ratings));
        }
    }, [ratings]);

    const purchaseProduct = async (productId) => {
        // Prompt the user for their name to identify them as the purchaser
        const name = prompt("Please enter your name to purchase the product:");
        if (!name) {
            alert("Name is required to purchase the product.");
            return;
        }
    
        // Find the tourist based on the provided name
        const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
        if (!tourist) {
            alert("Tourist not found. Please ensure your name is correct.");
            return;
        }
    
        try {
            // Send a POST request to the API endpoint to complete the purchase
            const response = await fetch(`/api/TouristRoute/PurchaseProduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ touristId: tourist._id, ProductId: productId })
            });
    
            // Check if the response is successful
            if (response.ok) {
                alert("Product purchased successfully!");
            } else {
                alert("Failed to purchase product.");
            }
        } catch (error) {
            console.error("Error purchasing product:", error);
        }
    };
    

    // Fetch the wishlist when the component mounts or when `username` changes
    
      const fetchWishlist = async () => {
          const response = await fetch(`/api/wishlistRoute/${username}`); // API call
          const data = await response.json();
          setWishlist(data); // Store the wishlist data
      };

    const removeProductFromWishlist = async (username, productId) => {
        const response = await fetch('/api/wishlistRoute/remove', {
        method: 'POST', // Use DELETE to signify a removal action
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, productId }), // Send username and productId in the request body
        });
    };

    const addProductToCart = async (username, productId, amount) => {
        const response = await fetch('/api/cartRoute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, productId , amount}),
        });
    };


    return (
        <div>
          {/* Button to toggle username input visibility */}
          <button onClick={() => setIsFieldVisible(!isFieldVisible)}>
            {isFieldVisible ? "Hide" : "Enter Username to View Wishlist"}
          </button>
      
          {/* Username input and Show Wishlist button */}
          {isFieldVisible && (
            <div>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={fetchWishlist}>Show Wishlist</button>
            </div>
          )}
      
          {/* Product details section */}
          {isFieldVisible && (
            <div className="products">
              {wishlist && wishlist.products && wishlist.products.length > 0 ? (
                wishlist.products.map((product) => (
                  <div key={product._id} className="product-item">
                    <ProductDetails product={product} />
      
                    <button onClick={() => purchaseProduct(product._id)}>
                      Purchase This Product
                    </button>
                    <button onClick={() => handleRateProductButtonClick(product._id)}>
                      {visibleRating[product._id] ? "Hide Rating" : "Rate"}
                    </button>
      
                    {visibleRating[product._id] && (
                      <Rating
                        itemId={product._id}
                        onRate={(id, rating, comment) =>
                          handleRateProduct(id, rating, comment)
                        }
                      />
                    )}
      
                    {/* Existing Ratings Section */}
                    <h5>Existing Ratings:</h5>
                    {(ratings[product._id] || []).map((entry, index) => (
                      <p key={index}>
                        <strong>{entry.name}</strong>: {entry.rating} - {entry.comment}
                      </p>
                    ))}
                        <div>
                        {/* Toggle Button */}
                        <button onClick={() => setIsVisibleSearchCart(!isVisibleSearchCart)}>
                            {isVisibleSearchCart ? 'Hide' : 'Add to Cart by Username'}
                        </button>

                        {/* Input Field and Search Button */}
                        {isVisibleSearchCart && (
                            <div>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                value={Cartusername}
                                onChange={(e) => setCartUsername(e.target.value)}
                            />
                            <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            min="1"
                            max= {product.AvailableQuantity}
                            />
                            <button onClick={() => addProductToCart(Cartusername, product._id,amount)}>
                             Add to Cart
                             </button> </div>
                        )}
                    </div>

                    <button onClick={() => removeProductFromWishlist(username, product._id)}>
                      Remove from Wishlist
                    </button>
                  </div>
                ))
              ) :  (
                <p>No products found in wishlist.</p>
              ) }
            </div>
          )}
        </div>
      );
    };   

export default WishlistDetails;