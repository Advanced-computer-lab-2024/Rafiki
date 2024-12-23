import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityDetailsforTouriSignup";
import MuseumDetails from "../components/museumDetailsforTouristSignup";
import ItineraryDetails from "../components/itineraryDetailsforTouristSignup";
import TouristForm from "../components/touristForm";
import TouristDetails from "../components/TouristDetails";
import ProductDetails from "../components/ProductDetails";
import UpdateTourist from "../components/UpdateTourist";
import Rating from '../components/Rating';
import ChangePasswordForm from '../components/ChangePasswordForm';
import RedemptionForm from '../components/redemptionForm';
import { fetchProductss, fetchproductRatings, submitproductRating } from '../components/productService';
import TourguideDetails from "../components/tourguideDetails";
import UpcomingActivities from '../components/UpcomingActivities';
import UpcomingItineraries from "../components/UpcomingItineraries";
import PastActivities from "../components/PastActivities";
import PastItineraries from "../components/PastItineraries";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


// componentsf
import axios from 'axios';
import HotelPopup from "./HotelPopup";
import FlightPopup from "./FlightPopup";
import TransportationPopup from "./TransportationPopup";
import ComplainCreateForm from "../components/complainCreateForm"
import { useFlaggedActivities } from '../FlaggedActivitiesContext';
import { fetchActivities, fetchRatings, submitRating } from '../components/activityService';
import WishlistDetails from "../components/WishlistDetails";


import { fetchItineraries, fetchItineraryRatings, submitItineraryRating } from '../components/itineraryService';
import BookmarkDetails from "../components/BookmarkDetails";


const TouristSignup = () => {
    const [isGuideVisible, setIsGuideVisible] = useState(false);

const handleGuideToggle = () => {
  setIsGuideVisible(!isGuideVisible);
};

    const [ratings, setRatings] = useState({}); // To hold ratings for each activity
    const [isHotelPopupVisible, setIsHotelPopupVisible] = useState(false);
    const [isFlightPopupVisible, setIsFlightPopupVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [CityName, setCityName] = useState('');
    const [tourists, setTourists] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isProductVisible, setIsProductVisible] = useState(false);
    const [selectedTourguide, setSelectedTourguide] = useState(null);
    const [searchByFlightVisible, setSearchByFlightVisible] = useState(false);
    const [searchForAHotelByCity, setSearchForAHotelByCity] = useState(false);
    const [hotelsData, setHotelsData] = useState([]);
    const [flightPopupData, setFlightPopupData] = useState([]);
    const showHotelPopup = () => setIsHotelPopupVisible(true);
    const hideHotelPopup = () => setIsHotelPopupVisible(false);
    const [visibleRating, setVisibleRating] = useState({});
    const [tourguides, setTourguides] = useState(null);
    const [touristId, setTouristId] = useState("67062f662447441db7434456"); //lazem login 3ashan yakhod el id lewahdo
    const [visibleSections, setVisibleSections] = useState({
        tourguides: false,

    });

    // activities
    const [activities, setActivities] = useState([]);
    const [isVisibleActivities, setIsVisibleActivities] = useState(false);
    const [isVisibleTagSearch, setIsVisibleTagSearch] = useState(false);
    const [isVisibleCategorySearch, setIsVisibleCategorySearch] = useState(false);
    const [isVisibleBudgetFilter, setIsVisibleBudgetFilter] = useState(false);
    const [isVisibleDateFilter, setIsVisibleDateFilter] = useState(false);
    const [isVisiblePriceSort, setIsVisiblePriceSort] = useState(false);
    const [tag, setTag] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [date, setDate] = useState('');
    const [transportationData, setTransportationData] = useState([]);
    const { flaggedActivities } = useFlaggedActivities();


    const location = useLocation();
    const promoCode = location.state?.promoCode;



    //museums
    const [museums, setMuseums] = useState(null);
    const [isVisibleMuseums, setIsVisibleMuseums] = useState(false);
    const [isVisibleTagSearchMuseums, setIsVisibleTagSearchMuseums] = useState(false);
    const [isVisibleSearchMuseums, setIsVisibleSearchMuseums] = useState(false);
    const [tagMuseum, setTagMuseum] = useState('');
    const [nameMuseum, setNameMuseum] = useState('');


    //itineraries
    const [itineraries, setItineraries] = useState(null);
    const [isVisibleItineraries, setIsVisibleItineraries] = useState(false);
    const [isVisibleLanguageFilter, setIsVisibleLanguageFilter] = useState(false);
    const [isVisibleBudgetFilterItinerary, setIsVisibleBudgetFilterItinerary] = useState(false);
    const [isVisibleDateFilterItinerary, setIsVisibleDateFilterItinerary] = useState(false);
    const [isVisiblePriceSortItinerary, setIsVisiblePriceSortItinerary] = useState(false);
    const [languageItinerary, setLanguageItinerary] = useState('');
    const [budgetItinerary, setBudgetItinerary] = useState('');
    const [dateItinerary, setDateItinerary] = useState('');


    const [selectedTourist, setSelectedTourist] = useState(null);
    const [isRedemptionVisible, setIsRedemptionVisible] = useState(false);
    const [isVisibleSearchWishlist, setIsVisibleSearchWishlist] = useState(false);
    const [Wishlistusername, setWishlistUsername] = useState("");

    const [isVisibleActivityBookmark, setIsVisibleActivityBookmark] = useState(false);
    const [isVisibleMuseumBookmark, setIsVisibleMuseumBookmark] = useState(false);
    const [isVisibleItineraryBookmark, setIsVisibleItineraryBookmark] = useState(false);
    const [bookmarkusername, setbookmarkUsername] = useState("");
    const [username, setUsername] = useState('');
    
    //address
    const [newAddress, setNewAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
    });
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);




    const [isCartVisible, setIsCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [name, setName] = useState('');

    const toggleRedemptionForm = (tourist) => {
        setSelectedTourist(tourist);
        setIsRedemptionVisible(!isRedemptionVisible);
    };

    const handleRateActivity = async (activityId, rating, comment) => {
        try {
            await submitRating(activityId, rating, comment, nameBeforeRating); // Pass nameBeforeRating here
            const updatedRatings = await fetchRatings(activityId); // Fetch the latest ratings after submitting
            setRatings(prevRatings => ({
                ...prevRatings,
                [activityId]: updatedRatings,
            }));
            console.log("Rating submitted successfully for", nameBeforeRating);
        } catch (error) {
            console.error("Failed to submit rating:", error);
        }
    };
    const handleRateItinerary = async (itineraryId, rating, comment) => {
        console.log("Submitting rating for itinerary:", itineraryId, rating, comment); // Log details
        try {
            const newRating = await submitItineraryRating(itineraryId, rating, comment, nameBeforeRating);
            setRatings(prevRatings => ({
                ...prevRatings,
                [itineraryId]: [...(prevRatings[itineraryId] || []), newRating],
            }));
            console.log("Rating submitted successfully for", nameBeforeRating);
        } catch (error) {
            console.error("Failed to submit rating:", error);
        }
    };

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

    const TouristChangePassword = () => (
        <ChangePasswordForm apiEndpoint="/api/TouristRoute/changePassword" />
    );
    const showFlightPopup = () => setIsFlightPopupVisible(true);
    const hideFlightPopup = () => setIsFlightPopupVisible(false);
    const [isTransportationPopupVisible, setIsTransportationPopupVisible] = useState(false);
    const showTransportationPopup = () => setIsTransportationPopupVisible(true);
    const hideTransportationPopup = () => setIsTransportationPopupVisible(false);
    const [nameBeforeRating, setNameBeforeRating] = useState(''); // New state for the entered name

    const handleRateButtonClick = (activityId) => {
        const name = prompt("Please enter your name to rate this activity:");
        if (!name) {
            alert("Name is required to rate the activity.");
            return;
        }


        const tourist = tourists?.find(t => t.Username?.toLowerCase() === name.toLowerCase());
        if (tourist && tourist.attendedActivities?.includes(activityId)) {
            setNameBeforeRating(name); // Set the entered name
            setVisibleRating(prev => ({ ...prev, [activityId]: true }));
        } else {
            alert("You must have attended this activity to rate it.");
        }
    };

    const handleRateButtonClick1 = (itineraryId) => {
        const name = prompt("Please enter your name to rate this itinerary:");
        if (!name) {
            alert("Name is required to rate the itinerary.");
            return;
        }
        const tourist = tourists?.find(t => t.Username?.toLowerCase() === name.toLowerCase());
        if (tourist && tourist.attendedItineraries?.includes(itineraryId)) {
            setNameBeforeRating(name); // Set the entered name
            setVisibleRating(prev => ({ ...prev, [itineraryId]: true }));
        } else {
            alert("You must have attended this activity to rate it.");
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

    // axios get request for transportation
    const fetchTransportationData = async () => {
        try {
            const response = await axios.get('/getAllTransportations');
            const data = response.data;
            console.log(data);
            setTransportationData(data);
            showTransportationPopup();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleSearchForTransportation = async () => {
        fetchTransportationData();
    };

    const [flightData, setFlightData] = useState({
        originLocationCode: '',
        destinationLocationCode: '',
        departureDateTimeRange: {
            date: '',
            time: ''
        },
        travelers: []
    });

    async function bookFlight() {
        try {
            // Step 1: Validate flightData inputs
            if (!flightData.originLocationCode || !flightData.destinationLocationCode) {
                console.error("Origin and Destination codes are required.");
                return;
            }
            if (!flightData.departureDateTimeRange.date || !flightData.departureDateTimeRange.time) {
                console.error("Departure date and time are required.");
                return;
            }

            // Step 2: Get access token
            const tokenResponse = await axios.post(
                'https://test.api.amadeus.com/v1/security/oauth2/token',
                {
                    grant_type: 'client_credentials',
                    client_id: 'p8pHTQfm3k74s8Y6yNDggKauNeQJfNse',
                    client_secret: 'bGJ8fKU4gQucuTF9'
                },
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            );

            const accessToken = tokenResponse.data.access_token;
            console.log("Access Token:", accessToken);

            // Step 3: Configure Axios with access token
            const amadeus = axios.create({
                baseURL: 'https://test.api.amadeus.com/v2',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // Step 4: Format travelers data
            const travelersData = flightData.travelers.map((traveler, index) => ({
                id: `${index + 1}`,
                travelerType: "ADULT",  // Adjust as needed for different traveler types
                name: { firstName: traveler.name.split(" ")[0], lastName: traveler.name.split(" ")[1] || '' }
            }));

            // Step 5: Make the API request to fetch flight offers
            const response = await amadeus.post('/shopping/flight-offers', {
                originDestinations: [
                    {
                        id: "1",
                        originLocationCode: flightData.originLocationCode,
                        destinationLocationCode: flightData.destinationLocationCode,
                        departureDateTimeRange: {
                            date: flightData.departureDateTimeRange.date,
                            time: flightData.departureDateTimeRange.time
                        }
                    }
                ],
                sources: ["GDS"],
                travelers: travelersData
            });

            // Step 6: Check if response data is as expected
            if (response.data && response.data.data) {
                setFlightPopupData(response.data.data);
                showFlightPopup();
                console.log("Flight data:", response.data.data);
            } else {
                console.error("Unexpected response format:", response.data);
            }

        } catch (error) {
            // Enhanced error logging
            console.error('Request failed:', error.message || 'An error occurred');
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Status code:', error.response.status);
            }
            console.error('Request config:', error.config);
        }
    }

    const handleSearchForFlight = async (e) => {
        e.preventDefault();

        console.log('Flight Data:', flightData);
        setFlightData({
            originLocationCode: '',
            destinationLocationCode: '',
            departureDateTimeRange: {
                date: '',
                time: ''
            },
            travelers: []
        });

        bookFlight();
    };

    const handleHotelSearch = async (e) => {
        e.preventDefault();
        try {

            // Step 1: Get access token
            const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
                grant_type: 'client_credentials',
                client_id: 'p8pHTQfm3k74s8Y6yNDggKauNeQJfNse',
                client_secret: 'bGJ8fKU4gQucuTF9'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(tokenResponse);

            const accessToken = tokenResponse.data.access_token;
            console.log(accessToken);

            // Step 2: Create Axios instance with the access token
            const amadeus = await axios.create({
                baseURL: 'https://test.api.amadeus.com/v1',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // Adjust this if needed
                }
            });

            // Step 3: Make the API request
            const response = await amadeus.get('/reference-data/locations/hotels/by-city', {
                params: {
                    cityCode: CityName
                }
            });


            console.log('API request successful');
            console.log(response.data.data);
            setHotelsData(response.data.data);
            console.log(hotelsData);
            showHotelPopup();
            console.log(isHotelPopupVisible)
        } catch (error) {
            console.error('Error:', error.message || 'An error occurred');
            console.error('Response data:', error.response?.data || 'No response data available');
            console.error('Request config:', error.config);
            console.error('Full error stack:', error.stack);
        }
    };

    useEffect(() => {
        const fetchTourguides = async () => {
            try {
                const response = await axios.get('/api/tourguideRoute');
                if (response.status === 200) {
                    setTourguides(response.data);
                }
            } catch (error) {
                console.error("Error fetching tour guides:", error);
            }
        };
        fetchTourguides();
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

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const activities = await fetchActivities();
                setActivities(activities);

                // Fetch ratings for each activity
                const allRatings = {};
                for (const activity of activities) {
                    const activityRatings = await fetchRatings(activity._id);
                    allRatings[activity._id] = activityRatings;
                }
                setRatings(allRatings);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchInitialData1 = async () => {
            try {
                const itineraries = await fetchItineraries();
                setItineraries(itineraries);

                // Fetch ratings for each activity
                const allRatings = {};
                for (const itinerary of itineraries) {
                    const itineraryRatings = await fetchItineraryRatings(itinerary._id);
                    allRatings[itinerary._id] = itineraryRatings;
                }
                setRatings(allRatings);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchInitialData1();
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Make sure you are calling fetchProducts()
                const fetchedProducts = await fetchProductss();
                setProducts(fetchedProducts);

                const allRatings = {};
                for (const product of fetchedProducts) {
                    const productRatings = await fetchproductRatings(product._id);
                    allRatings[product._id] = productRatings;
                }
                setRatings(allRatings);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        fetchInitialData();
    }, []); // Runs once when the component mounts

    const visibleActivities = activities.filter(activity => !flaggedActivities.includes(activity._id));

    const handleTagSearch = async () => {
        const response = await fetch(`/api/ActivityRoute/searchT/${tag}`);
        const json = await response.json();
        if (response.ok) {
            setActivities(json);
        }
    };

    const handleCategorySearch = async () => {
        const response = await fetch(`/api/ActivityRoute/searchC/${category}`);
        const json = await response.json();
        if (response.ok) {
            setActivities(json);
        }
    };

    const handleBudgetFilter = async () => {
        const response = await fetch(`/api/ActivityRoute/filter/${budget}`);
        const json = await response.json();
        if (response.ok) {
            setActivities(json);
        }
    };

    const handleDateFilter = async () => {
        const response = await fetch(`/api/ActivityRoute/filterDate/${date}`);
        const json = await response.json();
        if (response.ok) {
            setActivities(json);
        }
    };

    const handleSortByPrice = async () => {
        const response = await fetch('/api/ActivityRoute/sort/price');
        const json = await response.json();
        if (response.ok) {
            setActivities(json);
        }
    };

    //museum
    useEffect(() => {
        const fetchMuseum = async () => {
            const response = await fetch('/api/museumRoute');
            const json = await response.json();
            if (response.ok) {
                setMuseums(json);
            }
        };
        fetchMuseum();
    }, []);

    const museumNameSearch = async () => {
        const response = await fetch(`/api/museumRoute/search/${nameMuseum}`);
        const json = await response.json();
        if (response.ok) {
            setMuseums(json);
        }
    };

    const museumTagSearch = async () => {
        const response = await fetch(`/api/museumRoute/searchT/${tagMuseum}`);
        const json = await response.json();
        if (response.ok) {
            setMuseums(json);
        }
    };

    //itineraries
    useEffect(() => {
        const fetchItinerary = async () => {
            const response = await fetch('/api/itineraryRoute');
            const json = await response.json();
            if (response.ok) {
                setItineraries(json);
            }
        };
        fetchItinerary();
    }, []);

    const itineraryBudgetFilter = async () => {
        const response = await fetch(`/api/itineraryRoute/filter/${budgetItinerary}`);
        const json = await response.json();
        if (response.ok) {
            setItineraries(json);
        }
    };

    const itineraryDateFilter = async () => {
        const response = await fetch(`/api/itineraryRoute/filterDate/${dateItinerary}`);
        const json = await response.json();
        if (response.ok) {
            setItineraries(json);
        }
    };

    const itineraryLanguageFilter = async () => {
        const response = await fetch(`/api/itineraryRoute/filterLanguage/${languageItinerary}`);
        const json = await response.json();
        if (response.ok) {
            setItineraries(json);
        }
    };

    const ItinerarySortByPrice = async () => {
        const response = await fetch('/api/itineraryRoute/sort/price');
        const json = await response.json();
        if (response.ok) {
            setItineraries(json);
        }
    };

    const toggleVisibility = (section) => {
        setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Fetch tourists
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

    const handleUpdate = (tourguide) => {
        setSelectedTourguide(tourguide);
    };
    const handleRateTourGuide = async (tourGuideId) => {
        const touristName = prompt("Please enter your name to rate this tour guide:");

        if (!touristName) {
            alert("Name is required to rate the tour guide.");
            return;
        }

        // Find the tourist by name
        const tourist = tourists?.find(t => t.Username?.toLowerCase() === touristName.toLowerCase());

        if (!tourist) {
            alert("Tourist not found. Please enter a valid tourist name.");
            return;
        }

        // Check if the tourist has attended any itinerary under this tour guide
        const hasAttendedItineraryWithGuide = itineraries?.some(itinerary =>
            itinerary.tourGuideId === tourGuideId &&
            tourist.attendedItineraries.includes(itinerary._id)
        );

        if (!hasAttendedItineraryWithGuide) {
            alert("You can only rate a tour guide for itineraries you've attended with them.");
            return;
        }

        // Prompt for rating and comment
        const rating = parseInt(prompt("Please enter your rating (1-5):"), 10);
        const comment = prompt("Leave a comment for the tour guide:");

        try {
            const response = await axios.post(`/api/tourguideRoute/${tourGuideId}/ratings`, {
                name: touristName, // Use 'name' to match the schema
                rating,
                comment
            });

            if (response.status === 200) {
                alert("Thank you! Your rating has been submitted.");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error submitting rating: " + error.message);
        }
    };

    // Fetch activities with filters
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

        fetchProducts();
    }, []);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleProductClick = () => {
        setIsProductVisible(!isProductVisible);
    };

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
                navigate('/ProductCheckout');
            } else {
                alert("Failed to purchase product.");
            }
        } catch (error) {
            console.error("Error purchasing product:", error);
        }
    };

    const addProductToWishlist = async (username, productId) => {
        const response = await fetch('/api/wishlistRoute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, productId }),
        });
    };

    const addItemToBookmark = async (username, itemId, type) => {
        const response = await fetch('/api/bookmarkRoute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, itemId, type }),
        });
    };

    const handleAddToCart = async (productId, username) => {
        try {
            // alert to add username to username field
            if (!username) {
                alert("Please enter your username to add the product to cart.");
                return;
            }

            console.log('Adding product to cart...', productId, username);

            const response = await axios.post('/api/cartRoute', {
                productId,
                username,
                amount: 1, // Default amount to add
            });

            alert(response.data.message); // Show success message
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
            alert('Failed to add product to cart.');
        }
    };

    const handleShowCart = async () => {
        console.log('Fetching cart items for:', name);
        if (name) {
            try {
                const response = await axios.get(`/api/cartRoute/${name}`);
                console.log('Cart items:', response.data);

                // Assuming response.data.products contains the cart items
                setCartItems(response.data.products || []);  // Update state with cart items or empty array if no products
                setIsCartVisible(true);  // Show the cart section
            } catch (error) {
                console.error('Error fetching cart data:', error);
                // Handle error appropriately
            }
        } else {
            alert('Please enter a name.');
        }
    };

    // Increase item amount
    const handleIncreaseAmount = async (productId) => {
        try {
            await axios.post('/api/cartRoute/updateAmount', { username: name, productId, amount: 1 });
            // Re-fetch cart after updating the amount
            handleShowCart();
        } catch (error) {
            console.error('Error increasing amount:', error);
        }
    };

    // Decrease item amount
    const handleDecreaseAmount = async (productId) => {
        try {
            await axios.post('/api/cartRoute/updateAmount', { username: name, productId, amount: -1 });
            // Re-fetch cart after updating the amount
            handleShowCart();
        } catch (error) {
            console.error('Error decreasing amount:', error);
        }
    };

    // Remove item from cart
    const handleRemoveItem = async (productId, amount) => {
        try {
            await axios.post('/api/cartRoute/remove', { username: name, productId, amount });
            // Re-fetch cart after removing the product
            handleShowCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    // Handle adding address
    const handleAddAddress = async () => {
        // Validate address fields
        if (!newAddress.street || !newAddress.city || !newAddress.postalCode) {
          alert("All address fields are required!");
          return;
        }
    
        try {
          const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
    
          // Make the POST request to add the address
          const response = await axios.post(`/api/TouristRoute/${username}/addAddress`, newAddress);
    
          // Check if the request was successful
          if (response.status === 200) {
            alert("Address added successfully!");
            
            // Update the address list after adding the new address
            setAddresses(response.data.addresses); // Assuming the response contains the updated list of addresses
            setNewAddress({ street: '', city: '', postalCode: '' }); // Clear the form fields
          }
        } catch (error) {
          console.error("Error adding address:", error);
          setError("There was an error adding the address.");
        }
      };
    

    // Navigate to checkout page
    const handleCheckout = () => {
        navigate('/checkout', { state: { addresses } });  // Use navigate() instead of history.push
    };

    const handleOrder=()=>{
        navigate('/orders')
    }







    return (
        <div>
            <h2>Tourist Dashboard</h2>
            <button
  onClick={handleGuideToggle}
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
>
  {isGuideVisible ? 'Hide Vacation Guide' : 'View Vacation Guide'}
</button>
{isGuideVisible && (
  <div className="bg-gray-100 border border-gray-300 rounded p-4 mt-4">
    <h3 className="text-xl font-bold mb-3">Step-by-Step Vacation Guide</h3>
    <ol className="list-decimal ml-6">
      <li>Login to your account.</li>
      <li>Explore available activities, itineraries, and accommodations.</li>
      <li>Add your favorite activities to your cart.</li>
      <li>Confirm your bookings and make payments.</li>
      <li>Check your email for booking confirmations.</li>
      <li>Enjoy your vacation!</li>
    </ol>
    <div className="mt-4">
      <h4 className="text-lg font-semibold">Demo: How to Use the System</h4>
      <p className="mt-2 text-gray-700">
        Use the navigation bar to access various sections. Browse itineraries or activities, add them to your cart, and confirm your bookings through the checkout process. If you need assistance, contact support via the help section.
      </p>
    </div>
  </div>
)}

            {/* Display promo code if available */}
            {promoCode && (
                <div className="mt-6 bg-green-100 p-4 rounded shadow-lg">
                    <h3 className="text-lg font-bold text-green-700">🎉 Happy Birthday!</h3>
                    <p className="text-green-700">Here's your special promo code:</p>
                    <p className="text-green-900 font-bold text-xl">{promoCode.code}</p>
                    <p className="text-green-700">Enjoy a {promoCode.discount}% discount!</p>
                </div>
            )}
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} Tourist Details
            </button>
            {isVisible && (
                <div className="workouts">
                    {tourists && tourists.map(tourist => (
                        <div key={tourist._id}>
                            <TouristDetails tourist={tourist} />
                            <button onClick={() => toggleRedemptionForm(tourist)}>Redeem Points</button>
                            <button onClick={() => handleUpdate(tourist)}>Update</button>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={() => toggleVisibility('tourguides')}>
                {visibleSections.tourguides ? 'Hide' : 'Show'} Tourguide Details
            </button>
            {visibleSections.tourguides && (
                <div className="tourguides">
                    {tourguides && tourguides.map(tourguide => (
                        <div key={tourguide._id}>
                            <TourguideDetails tourguide={tourguide} />

                            {/* Rate Button for Each Tour Guide */}
                            <button onClick={() => handleRateTourGuide(tourguide._id)}>Rate</button>

                            {/* Display Existing Ratings */}
                            <div>
                                <h5>Existing Ratings:</h5>
                                {tourguide.ratings && tourguide.ratings.length > 0 ? (
                                    tourguide.ratings.map((entry, index) => (
                                        <p key={index}>
                                            <strong>{entry.name}</strong>: {entry.rating} - {entry.comment}
                                        </p>
                                    ))
                                ) : (
                                    <p>No ratings available for this tour guide.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Render RedemptionForm if visible */}
            {isRedemptionVisible && selectedTourist && (
                <RedemptionForm
                    tourist={selectedTourist}
                    onClose={() => setIsRedemptionVisible(false)}
                />
            )}

            <button onClick={handleProductClick}>
                {isProductVisible ? 'Hide' : 'Show'} Product Details
            </button>
            {isProductVisible && (
                <div className="products">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="product-item">
                                <ProductDetails product={product} />
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <button type="button" onClick={() => handleAddToCart(product._id, username)}>
                                    Add to cart
                                </button>

                                <button onClick={() => purchaseProduct(product._id)}>Purchase This Product</button>
                                <button onClick={() => handleRateProductButtonClick(product._id)}>
                                    {visibleRating[product._id] ? "Hide Rating" : "Rate"}
                                </button>

                                {visibleRating[product._id] && (
                                    <Rating
                                        itemId={product._id}
                                        onRate={(id, rating, comment) => handleRateProduct(id, rating, comment)}
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
                                    <button onClick={() => setIsVisibleSearchWishlist(!isVisibleSearchWishlist)}>
                                        {isVisibleSearchWishlist ? 'Hide' : 'Add to Wishlist by Username'}
                                    </button>

                                    {/* Input Field and Search Button */}
                                    {isVisibleSearchWishlist && (
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Enter Username"
                                                value={Wishlistusername}
                                                onChange={(e) => setWishlistUsername(e.target.value)}
                                            />
                                            <button onClick={() => addProductToWishlist(Wishlistusername, product._id)}>
                                                Add to Wishlist
                                            </button> </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}

            <UpcomingActivities touristId={touristId} />
            <UpcomingItineraries touristId={touristId} />
            <PastActivities touristId={touristId} />
            <PastItineraries touristId={touristId} />
            <BookmarkDetails />
            <WishlistDetails />
            <div></div>
            <UpdateTourist existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
            <h4>Complaint:</h4>
            <ComplainCreateForm />

            <button
                  onClick={() => handleOrder()}
                  
                >
                  My Orders
                </button>

            <div>
          
            <h3>Add New Address</h3>
            <input
                type="text"
                name="street"
                placeholder="Street"
                value={newAddress.street}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={handleInputChange}
            />
            <button onClick={handleAddAddress}>Add Address</button>

            <h3>Existing Addresses</h3>
            <ul>
                {addresses.length === 0 ? (
                    <p>No addresses added yet.</p>
                ) : (
                    addresses.map((address, index) => (
                        <li key={index}>
                            {address.street}, {address.city}, {address.postalCode}
                        </li>
                    ))
                )}
            </ul>

            {/* <button onClick={handleCheckout}>Go to Checkout</button> */}
        </div>
    






            <h4>Activities:</h4>

            <div>
                <button onClick={() => setIsCartVisible(!isCartVisible)}>
                    {isCartVisible ? 'Hide' : 'Show'} Cart
                </button>

                {isCartVisible && (
                    <div className="cart">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={handleShowCart}>Show Cart</button>

                        {cartItems.length > 0 ? (
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="cart-item">
                                        <p>{item.product.Name} - ${item.product.Price} (Amount: {item.amount})</p>
                                        <button onClick={() => handleIncreaseAmount(item.product._id)}>+</button>
                                        <button onClick={() => handleDecreaseAmount(item.product._id)}>-</button>
                                        <button onClick={() => handleRemoveItem(item.product._id, item.amount)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No items in cart.</p>
                        )}

                        { /* this button must redirect us to checkout page */}
                        <button onClick={handleCheckout}> Checkout</button>
                    </div>
                )}
            </div>

            {/* Search for transportaion */}

            <button onClick={handleSearchForTransportation}>
                Show All transportaion
            </button>

            {/* Search For flight */}
            <button onClick={() => setSearchByFlightVisible(!searchByFlightVisible)}>
                Search for a Flight
            </button>

            {searchByFlightVisible && (
                <form onSubmit={handleSearchForFlight}>
                    <input
                        type="text"
                        value={flightData.originLocationCode}
                        onChange={(e) => setFlightData({ ...flightData, originLocationCode: e.target.value })}
                        placeholder="Origin Location Code"
                    />
                    <input
                        type="text"
                        value={flightData.destinationLocationCode}
                        onChange={(e) => setFlightData({ ...flightData, destinationLocationCode: e.target.value })}
                        placeholder="Destination Location Code"
                    />
                    <input
                        type="text"
                        value={flightData.departureDateTimeRange.date}
                        onChange={(e) =>
                            setFlightData({
                                ...flightData,
                                departureDateTimeRange: {
                                    ...flightData.departureDateTimeRange,
                                    date: e.target.value
                                }
                            })
                        }
                        placeholder="Departure Date (YYYY-MM-DD)"
                    />
                    <input
                        type="text"
                        value={flightData.departureDateTimeRange.time}
                        onChange={(e) =>
                            setFlightData({
                                ...flightData,
                                departureDateTimeRange: {
                                    ...flightData.departureDateTimeRange,
                                    time: e.target.value
                                }
                            })
                        }
                        placeholder="Departure Time (HH:MM:SS)"
                    />
                    <input
                        type="number"
                        value={flightData.travelers.length}
                        onChange={(e) => {
                            const numTravelers = parseInt(e.target.value) || 0;
                            const newTravelers = Array(numTravelers).fill({ name: '' });
                            setFlightData({ ...flightData, travelers: newTravelers });
                        }}
                        placeholder="Number of Passengers"
                    />
                    <ul>
                        {flightData.travelers.map((passenger, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    value={passenger.name}
                                    onChange={(e) =>
                                        setFlightData({
                                            ...flightData,
                                            travelers: flightData.travelers.map((p, i) =>
                                                i === index ? { ...p, name: e.target.value } : p
                                            )
                                        })
                                    }
                                    placeholder={`Passenger ${index + 1} Name`}
                                />
                            </li>
                        ))}
                    </ul>
                    <button type="submit">Book Flight</button>
                </form>
            )}

            {/* Search For a Hotel */}
            <button onClick={() => setSearchForAHotelByCity(!searchForAHotelByCity)}>
                Search for a Hotel
            </button>

            {searchForAHotelByCity && (
                <form onSubmit={handleHotelSearch}>
                    <input
                        type="text"
                        placeholder="Enter City"
                        value={CityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            )}
            <div></div>
            {/* Search by Tag */}
            <button onClick={() => setIsVisibleTagSearch(!isVisibleTagSearch)}>
                {isVisibleTagSearch ? 'Hide Search' : 'Search by Tag'}
            </button>
            {isVisibleTagSearch && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                    <button onClick={handleTagSearch}>Search</button>
                </div>
            )}

            {/* Search by Category */}
            <button onClick={() => setIsVisibleCategorySearch(!isVisibleCategorySearch)}>
                {isVisibleCategorySearch ? 'Hide' : 'Search by Category'}
            </button>
            {isVisibleCategorySearch && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button onClick={handleCategorySearch}>Search</button>
                </div>
            )}

            {/* Filter by Budget */}
            <button onClick={() => setIsVisibleBudgetFilter(!isVisibleBudgetFilter)}>
                {isVisibleBudgetFilter ? 'Hide' : 'Filter by Budget'}
            </button>
            {isVisibleBudgetFilter && (
                <div>
                    <input
                        type="number"
                        placeholder="Enter Budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <button onClick={handleBudgetFilter}>Filter</button>
                </div>
            )}

            {/* Filter by Date */}
            <button onClick={() => setIsVisibleDateFilter(!isVisibleDateFilter)}>
                {isVisibleDateFilter ? 'Hide' : 'Filter by Date'}
            </button>
            {isVisibleDateFilter && (
                <div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button onClick={handleDateFilter}>Filter</button>
                </div>
            )}

            {/* Sort by Price */}
            <button onClick={() => setIsVisiblePriceSort(!isVisiblePriceSort)}>
                {isVisiblePriceSort ? 'Hide' : 'Sort by Price'}
            </button>
            {isVisiblePriceSort && (
                <button onClick={handleSortByPrice}>Sort</button>
            )}
            <br />
            {/* View Activities */}
            <button onClick={() => setIsVisibleActivities(!isVisibleActivities)}>
                {isVisibleActivities ? 'Hide' : 'View'} Activities
            </button>

            {/* {isVisibleActivities && (
                <div className="activities">
                    {activities && activities.map(activity => (
                        <ActivityDetails activity={activity} key={activity._id} />
                    ))}
                </div>
            )} */}


            {isVisibleActivities && (
                <div className="activities">
                    {visibleActivities.map(activity => (
                        <div key={activity._id}>
                            <ActivityDetails activity={activity} />
                            <button onClick={() => handleRateButtonClick(activity._id)}>
                                {visibleRating[activity._id] ? "Hide Rating" : "Rate"}
                            </button>
                            {visibleRating[activity._id] && (
                                <Rating
                                    itemId={activity._id}
                                    onRate={(id, rating, comment) => handleRateActivity(id, rating, comment)}
                                />
                            )}

                            <div>
                                <h5>Existing Ratings:</h5>
                                {activity.ratings && activity.ratings.length > 0 ? (
                                    activity.ratings.map((entry, index) => (
                                        <p key={index}>
                                            <strong>{entry.name}</strong>: {entry.rating} - {entry.comment}
                                        </p>
                                    ))
                                ) : (
                                    <p>No ratings available for this Activity.</p>
                                )}
                            </div>
                            {/* Toggle Button */}
                            <button onClick={() => setIsVisibleActivityBookmark(!isVisibleActivityBookmark)}>
                                {isVisibleActivityBookmark ? 'Hide' : 'Add to Bookmark by Username'}
                            </button>

                            {/* Input Field and Search Button */}
                            {isVisibleActivityBookmark && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter Username"
                                        value={bookmarkusername}
                                        onChange={(e) => setbookmarkUsername(e.target.value)}
                                    />
                                    <button onClick={() => addItemToBookmark(bookmarkusername, activity._id, 'Activities')}>
                                        Add to Bookmark
                                    </button> </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <br />
            <h4>Museums:</h4>

            {/* Search by Name */}
            <button onClick={() => setIsVisibleSearchMuseums(!isVisibleSearchMuseums)}>
                {isVisibleSearchMuseums ? 'Hide' : 'Search by Name'}
            </button>
            {isVisibleSearchMuseums && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={nameMuseum}
                        onChange={(e) => setNameMuseum(e.target.value)}
                    />
                    <button onClick={museumNameSearch}>Search</button>
                </div>
            )}
            {/* Search by Tag */}
            <button onClick={() => setIsVisibleTagSearchMuseums(!isVisibleTagSearchMuseums)}>
                {isVisibleTagSearchMuseums ? 'Hide Search' : 'Search by Tag'}
            </button>
            {isVisibleTagSearchMuseums && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Tag"
                        value={tagMuseum}
                        onChange={(e) => setTagMuseum(e.target.value)}
                    />
                    <button onClick={museumTagSearch}>Search</button>
                </div>
            )}
            <br />
            {/* View Museums */}
            <button onClick={() => setIsVisibleMuseums(!isVisibleMuseums)}>
                {isVisibleMuseums ? 'Hide' : 'View'} Museums
            </button>

            {isVisibleMuseums && (
                <div className="museums">
                    {museums && museums.map(museum => (
                        <div key={museum._id}>
                            <MuseumDetails museum={museum} />
                            <div>
                                {/* Toggle Button */}
                                <button onClick={() => setIsVisibleMuseumBookmark(!isVisibleMuseumBookmark)}>
                                    {isVisibleMuseumBookmark ? 'Hide' : 'Add to Bookmark by Username'}
                                </button>

                                {/* Input Field and Search Button */}
                                {isVisibleMuseumBookmark && (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Username"
                                            value={bookmarkusername}
                                            onChange={(e) => setbookmarkUsername(e.target.value)}
                                        />
                                        <button onClick={() => addItemToBookmark(bookmarkusername, museum._id, 'Museums')}>
                                            Add to Bookmark
                                        </button> </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <br />
            <h4>Itineraries:</h4>

            {/* Filter by Budget */}
            <button onClick={() => setIsVisibleBudgetFilterItinerary(!isVisibleBudgetFilterItinerary)}>
                {isVisibleBudgetFilterItinerary ? 'Hide' : 'Filter by Budget'}
            </button>
            {isVisibleBudgetFilterItinerary && (
                <div>
                    <input
                        type="number"
                        placeholder="Enter Budget"
                        value={budgetItinerary}
                        onChange={(e) => setBudgetItinerary(e.target.value)}
                    />
                    <button onClick={itineraryBudgetFilter}>Filter</button>
                </div>
            )}

            {/* Filter by Date */}
            <button onClick={() => setIsVisibleDateFilterItinerary(!isVisibleDateFilterItinerary)}>
                {isVisibleDateFilterItinerary ? 'Hide' : 'Filter by Date'}
            </button>
            {isVisibleDateFilterItinerary && (
                <div>
                    <input
                        type="date"
                        value={dateItinerary}
                        onChange={(e) => setDateItinerary(e.target.value)}
                    />
                    <button onClick={itineraryDateFilter}>Filter</button>
                </div>
            )}
            {/* Filter by Language */}
            <button onClick={() => setIsVisibleLanguageFilter(!isVisibleLanguageFilter)}>
                {isVisibleLanguageFilter ? 'Hide' : 'Filter by Language'}
            </button>
            {isVisibleLanguageFilter && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Language"
                        value={languageItinerary}
                        onChange={(e) => setLanguageItinerary(e.target.value)}
                    />
                    <button onClick={itineraryLanguageFilter}>Filter</button>
                </div>
            )}

            {/* Sort by Price */}
            <button onClick={() => setIsVisiblePriceSortItinerary(!isVisiblePriceSortItinerary)}>
                {isVisiblePriceSortItinerary ? 'Hide' : 'Sort by Price'}
            </button>
            {isVisiblePriceSortItinerary && (
                <button onClick={ItinerarySortByPrice}>Sort</button>
            )}
            <br />
            {/* View Itienary */}
            <button onClick={() => setIsVisibleItineraries(!isVisibleItineraries)}>
                {isVisibleItineraries ? 'Hide' : 'View'} Itineraries
            </button>

            {isVisibleItineraries && (
                <div className="Itineraries">
                    {itineraries && itineraries.map(itinerary => (
                        <div key={itinerary._id}>
                            <ItineraryDetails itinerary={itinerary} />
                            <button onClick={() => handleRateButtonClick1(itinerary._id)}>
                                {visibleRating[itinerary._id] ? "Hide Rating" : "Rate"}
                            </button>
                            {visibleRating[itinerary._id] && (
                                <Rating
                                    itemId={itinerary._id} // Ensure this prop is set correctly
                                    onRate={(id, rating, comment) => handleRateItinerary(id, rating, comment)}
                                />

                            )}

                            <div>
                                {itinerary.active ? (
                                    <div>
                                        {/* Display Existing Ratings */}
                                        <h5>Existing Ratings:</h5>
                                        {itinerary.ratings && itinerary.ratings.length > 0 ? ( // Check if ratings exist
                                            itinerary.ratings.map((entry, index) => (
                                                <p key={index}>
                                                    <strong>{entry.name}</strong>: {entry.rating} - {entry.comment}
                                                </p>
                                            ))
                                        ) : (
                                            <p>No ratings available for this Itinerary.</p>
                                        )}

                                        {/* Toggle Button for Bookmarking */}
                                        <div>
                                            <button onClick={() => setIsVisibleItineraryBookmark(!isVisibleItineraryBookmark)}>
                                                {isVisibleItineraryBookmark ? 'Hide' : 'Add to Bookmark by Username'}
                                            </button>

                                            {/* Input Field and Add to Bookmark Button */}
                                            {isVisibleItineraryBookmark && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Username"
                                                        value={bookmarkusername}
                                                        onChange={(e) => setbookmarkUsername(e.target.value)} // Set username
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            if (bookmarkusername.trim() !== "") {
                                                                addItemToBookmark(bookmarkusername, itinerary._id, 'Itineraries');
                                                            } else {
                                                                alert("Please enter a username.");
                                                            }
                                                        }}
                                                    >
                                                        Add to Bookmark
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : null}

                            </div>


                        </div>
                    ))}
                </div>
            )}

            <TouristChangePassword />
            {isHotelPopupVisible && <HotelPopup hotels={hotelsData} onClose={hideHotelPopup} />}
            {isFlightPopupVisible && <FlightPopup flights={flightPopupData} onClose={hideFlightPopup} />}
            {isTransportationPopupVisible && <TransportationPopup transportation={transportationData} onClose={hideTransportationPopup} />}
        </div>
    );
};

export default TouristSignup;