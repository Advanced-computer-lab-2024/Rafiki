import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityDetailsForGuest";
import MuseumDetails from "../components/museumDetailsforTouristSignup";
import ItineraryDetails from "../components/itineraryDetailsForGuest";
import TouristForm from "../components/touristForm";
import TouristDetails from "../components/TouristDetails";
import ProductDetails from "../components/productDetailsForGuest";
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
import pic from '../pics/pic3.jpg'


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


const GuestDashboard = () => {
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

   

    const [activeMenu, setActiveMenu] = useState("seller");





    return (
        <div
          className="flex min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(${pic})`, // Replace with your actual background image URL
          }}
        >
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-900 text-white p-6">
            {/* Profile Section */}
            <div className="flex items-center mb-8">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"></div>
              <span className="ml-4 text-lg font-semibold">Welcome! </span>
            </div>
     
            {/* Sidebar Menu */}
            <ul className="space-y-6">
              <li>
                <button
                  onClick={() => setActiveMenu("activities")}
                  className={`w-full text-left flex items-center px-4 py-2 rounded ${
                    activeMenu === "activities"
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
                  Activities
                </button>
              </li>
              <li>
                
                <button
                  onClick={() => setActiveMenu("museums")}
                  className={`w-full text-left flex items-center px-4 py-2 rounded ${
                    activeMenu === "museums"
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
                      d="M9 12h6M4 6h16M4 18h16"
                    />
                  </svg>
                  Museums
                </button>
              </li>
              <li>
  <button
    onClick={() => setActiveMenu("itineraries")}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === "itineraries"
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18M3 16h18M3 12h18" />
    </svg>
    Itineraries
  </button>
</li>

<li>
  <button
    onClick={() => setActiveMenu("tourguides")}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === "tourguides"
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a2 2 0 10-4 0 2 2 0 014 0zM4 6h16M4 18h16" />
    </svg>
    Tour Guides
  </button>
</li>

<li>
  <button
    onClick={() => setActiveMenu("products")}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === "products"
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18M3 16h18M3 12h18" />
    </svg>
    Products
  </button>
</li>
<li>
  <button
    onClick={() => setActiveMenu("flightSearch")}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === "flightSearch"
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
        d="M9.75 9L15 4.75m0 0L20.25 9M15 4.75v14.5"
      />
    </svg>
    Search Flights
  </button>
</li>
{/* Sidebar Buttons */}


<ul className="space-y-6">
  {/* Existing Buttons */}
 
  {/* Search by Category */}
 

  {/* Filter by Budget */}
 

  {/* Filter by Date */}
  

  

 
    {/* Museums Search */}
    <li>
      <button
        onClick={() => setActiveMenu("museumsSearch")}
        className={`w-full text-left flex items-center px-4 py-2 rounded ${
          activeMenu === "museumsSearch"
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
            d="M10 10h4m-2 0v6m0-6a2 2 0 110-4 2 2 0 110 4zm0 10a2 2 0 11-4 0 2 2 0 114 0z"
          />
        </svg>
        Search Museums
      </button>
    </li>
</ul>


            </ul>
          </div>
     
          {/* Main Content */}
          <div className="w-3/4 p-6">
       {/* Itinerary Filters */}
{/* Category Search */}
<div className="mb-6">
 
   
  {isVisibleCategorySearch && (
    <div className="mt-3">
      <input
        type="text"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleCategorySearch}
        className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Search
      </button>
    </div>
  )}
</div>

{/* Budget Filter */}
{activeMenu === "budgetFilter" && (
    <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Filter by Budget</h3>
      <div className="mt-3">
        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleBudgetFilter}
          className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Apply Filter
        </button>
      </div>
    </div>
  )}

  {/* Date Filter */}
  {activeMenu === "dateFilter" && (
    <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Filter by Date</h3>
      <div className="mt-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDateFilter}
          className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Apply Filter
        </button>
      </div>
    </div>
  )}

  {/* Price Sort */}
  {activeMenu === "priceSort" && (
    <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Sort by Price</h3>
      <button
        onClick={handleSortByPrice}
        className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Sort
      </button>
    </div>
  )}

  {/* Museums Search */}
 

{activeMenu === "itineraryFilter" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
      Filter Itineraries
    </h3>

    {/* Budget Filter */}
    <div className="mb-4">
      <button
        onClick={() => setIsVisibleBudgetFilterItinerary(!isVisibleBudgetFilterItinerary)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isVisibleBudgetFilterItinerary ? "Hide Budget Filter" : "Filter by Budget"}
      </button>
      {isVisibleBudgetFilterItinerary && (
        <div className="mt-2">
          <input
            type="number"
            placeholder="Enter Budget"
            value={budgetItinerary}
            onChange={(e) => setBudgetItinerary(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={itineraryBudgetFilter}
            className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>

    {/* Date Filter */}
    <div className="mb-4">
      <button
        onClick={() => setIsVisibleDateFilterItinerary(!isVisibleDateFilterItinerary)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isVisibleDateFilterItinerary ? "Hide Date Filter" : "Filter by Date"}
      </button>
      {isVisibleDateFilterItinerary && (
        <div className="mt-2">
          <input
            type="date"
            value={dateItinerary}
            onChange={(e) => setDateItinerary(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={itineraryDateFilter}
            className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>

    {/* Language Filter */}
    <div>
      <button
        onClick={() => setIsVisibleLanguageFilter(!isVisibleLanguageFilter)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isVisibleLanguageFilter ? "Hide Language Filter" : "Filter by Language"}
      </button>
      {isVisibleLanguageFilter && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Enter Language"
            value={languageItinerary}
            onChange={(e) => setLanguageItinerary(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={itineraryLanguageFilter}
            className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  </div>
)}

{activeMenu === "sortByPrice" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Sort Itineraries by Price
    </h3>
    
  </div>
)}
{/* View Itineraries */}
{activeMenu === "viewItineraries" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Itineraries
    </h3>
    {isVisibleItineraries ? (
      <div>
        {/* Render your itineraries here */}
        <button
          onClick={() => setIsVisibleItineraries(false)}
          className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Hide Itineraries
        </button>
      </div>
    ) : (
      <button
        onClick={() => setIsVisibleItineraries(true)}
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        View Itineraries
      </button>
    )}
  </div>
)}
{/* Manage Popups */}
{activeMenu === "popups" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Manage Popups
    </h3>
    <div className="space-y-4">
      {isHotelPopupVisible && (
        <HotelPopup hotels={hotelsData} onClose={hideHotelPopup} />
      )}
      {isFlightPopupVisible && (
        <FlightPopup flights={flightPopupData} onClose={hideFlightPopup} />
      )}
      {isTransportationPopupVisible && (
        <TransportationPopup
          transportation={transportationData}
          onClose={hideTransportationPopup}
        />
      )}
    </div>
  </div>
)}

{/* Flight Search Form */}
{activeMenu === "flightSearch" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Search for Flights
    </h3>
    <form onSubmit={handleSearchForFlight} className="grid gap-4">
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Origin Location Code
        </label>
        <input
          type="text"
          value={flightData.originLocationCode}
          onChange={(e) =>
            setFlightData({ ...flightData, originLocationCode: e.target.value })
          }
          placeholder="Enter Origin Location Code"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Destination Location Code
        </label>
        <input
          type="text"
          value={flightData.destinationLocationCode}
          onChange={(e) =>
            setFlightData({ ...flightData, destinationLocationCode: e.target.value })
          }
          placeholder="Enter Destination Location Code"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Departure Date
        </label>
        <input
          type="date"
          value={flightData.departureDateTimeRange.date}
          onChange={(e) =>
            setFlightData({
              ...flightData,
              departureDateTimeRange: {
                ...flightData.departureDateTimeRange,
                date: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Departure Time
        </label>
        <input
          type="time"
          value={flightData.departureDateTimeRange.time}
          onChange={(e) =>
            setFlightData({
              ...flightData,
              departureDateTimeRange: {
                ...flightData.departureDateTimeRange,
                time: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Number of Passengers
        </label>
        <input
          type="number"
          value={flightData.travelers.length}
          onChange={(e) => {
            const numTravelers = parseInt(e.target.value) || 0;
            const newTravelers = Array(numTravelers).fill({ name: "" });
            setFlightData({ ...flightData, travelers: newTravelers });
          }}
          placeholder="Enter Number of Passengers"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-600">Passenger Details</h4>
        <ul className="space-y-2">
          {flightData.travelers.map((passenger, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="text-gray-600">{`Passenger ${index + 1}`}</span>
              <input
                type="text"
                value={passenger.name}
                onChange={(e) =>
                  setFlightData({
                    ...flightData,
                    travelers: flightData.travelers.map((p, i) =>
                      i === index ? { ...p, name: e.target.value } : p
                    ),
                  })
                }
                placeholder="Enter Passenger Name"
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </li>
          ))}
        </ul>
      </div>
     
    </form>
  </div>
)}


{activeMenu === "cart" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Your Cart
    </h3>

    {/* Name Input */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleShowCart}
        className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show Cart
      </button>
    </div>

    {/* Cart Items */}
    {cartItems.length > 0 ? (
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded shadow-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <p className="text-lg font-medium text-gray-700">
              {item.product.Name} - ${item.product.Price} (Amount: {item.amount})
            </p>
            <div className="flex space-x-2 mt-2">
            
             
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No items in the cart.</p>
    )}

  </div>
)}



{activeMenu === "cart" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Your Cart
    </h3>

    {/* Name Input */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     
    </div>

    {/* Cart Items */}
    {cartItems.length > 0 ? (
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded shadow-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <p className="text-lg font-medium text-gray-700">
              {item.product.Name} - ${item.product.Price} (Amount: {item.amount})
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleIncreaseAmount(item.product._id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                +
              </button>
              <button
                onClick={() => handleDecreaseAmount(item.product._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                -
              </button>
              
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No items in the cart.</p>
    )}

    {/* Checkout Button */}
   
  </div>
)}

{/* Existing Addresses */}
{activeMenu === "existingAddresses" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Existing Addresses
    </h3>

    {addresses.length === 0 ? (
      <p className="text-center text-gray-500">
        No addresses added yet. Start by adding a new address above.
      </p>
    ) : (
      <ul className="space-y-4">
        {addresses.map((address, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-gray-100 rounded shadow-md hover:bg-gray-200 transition"
          >
            {/* Address Details */}
            <div>
              <p className="text-lg font-medium text-gray-700">{address.street}</p>
              <p className="text-sm text-gray-500">
                {address.city}, {address.postalCode}
              </p>
            </div>

            {/* Action Buttons */}
           
           
          </li>
        ))}
      </ul>
    )}
  </div>
)}



{activeMenu === "redeemPoints" && isRedemptionVisible && selectedTourist && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Redeem Points
    </h3>
    <RedemptionForm
      tourist={selectedTourist}
      onClose={() => setIsRedemptionVisible(false)}
    />
  </div>
)}

{/* Add New Address */}
{activeMenu === "addAddress" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Add New Address
    </h3>
    <form className="grid gap-4">
      <input
        type="text"
        name="street"
        placeholder="Street"
        value={newAddress.street}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={newAddress.city}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={newAddress.postalCode}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
    </form>
  </div>
)}

{activeMenu === "pastItineraries" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Past Itineraries
    </h3>
    <PastItineraries touristId={touristId} />
  </div>
)}

{/* Bookmark Details */}
{activeMenu === "bookmarkDetails" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Bookmark Details
    </h3>
    <BookmarkDetails />
  </div>
)}

{/* Wishlist Details */}
{activeMenu === "wishlistDetails" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Wishlist Details
    </h3>
    <WishlistDetails />
  </div>
)}



{activeMenu === "upcomingActivities" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Upcoming Activities
    </h3>
    <UpcomingActivities touristId={touristId} />
  </div>
)}

{/* Upcoming Itineraries */}
{activeMenu === "upcomingItineraries" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Upcoming Itineraries
    </h3>
    <UpcomingItineraries touristId={touristId} />
  </div>
)}

{/* Past Activities */}
{activeMenu === "pastActivities" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Past Activities
    </h3>
    <PastActivities touristId={touristId} />
  </div>
)}

{/* Update Tourist */}
{activeMenu === "updateTourist" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Update Tourist
    </h3>
    <UpdateTourist
      existingTourguide={selectedTourguide}
      onUpdate={() => setSelectedTourguide(null)}
    />
  </div>
)}

{/* Complaint */}
{activeMenu === "complaint" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Complaint
    </h3>
    <ComplainCreateForm />
  </div>
)}


            {activeMenu === "tourguides" && (
  <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
      Tour Guides
    </h3>

    {tourguides && tourguides.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tourguides.map((tourguide) => (
          <div
            key={tourguide._id}
            className="p-4 border rounded shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            {/* Tour Guide Details */}
            <TourguideDetails tourguide={tourguide} />

           

            {/* Existing Ratings */}
            <div className="mt-3">
              <h5 className="text-lg font-semibold text-gray-600">
                Existing Ratings:
              </h5>
              {tourguide.ratings && tourguide.ratings.length > 0 ? (
                tourguide.ratings.map((entry, index) => (
                  <p key={index} className="text-sm text-gray-500">
                    <strong>{entry.name}</strong>: {entry.rating} - {entry.comment}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No ratings available for this tour guide.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
        ) : (
            <p className="text-center text-gray-500">
              No tour guides available at the moment.
            </p>
          )}
        </div>
      )}
      
      
      
                  {activeMenu === "products" && (
        <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
            Products
          </h3>
      
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="p-4 border rounded shadow-md bg-white hover:shadow-lg transition-shadow"
                >
                  {/* Product Details */}
                  <ProductDetails product={product} />
      
                 
      
                  {/* Purchase Product */}
                  
      
                  
      
                  {/* Rating Form */}
                  {visibleRating[product._id] && (
                    <div className="mt-2">
                      <Rating
                        itemId={product._id}
                        onRate={(id, rating, comment) => handleRateProduct(id, rating, comment)}
                      />
                    </div>
                  )}
      
                  {/* Existing Ratings */}
                  <div className="mt-3">
                    <h5 className="text-lg font-semibold text-gray-600">
                      Existing Ratings:
                    </h5>
                    {ratings[product._id] && ratings[product._id].length > 0 ? (
                      ratings[product._id].map((entry, index) => (
                        <p key={index} className="text-sm text-gray-500">
                          <strong>{entry.name}</strong>: {entry.rating} - {entry.comment}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No ratings available for this product.</p>
                    )}
                  </div>
      
                  {/* Wishlist Section */}
                  <div className="mt-4">
                
      
                    {isVisibleSearchWishlist && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Enter Username"
                          value={Wishlistusername}
                          onChange={(e) => setWishlistUsername(e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none"
                        />
                        
                        
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      )}
      
      
      
                  {activeMenu === "itineraries" && (
        <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
            Itineraries
          </h3>
      
          {itineraries && itineraries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {itineraries.map((itinerary) => (
                <div
                  key={itinerary._id}
                  className="p-4 border rounded shadow-md bg-white hover:shadow-lg transition-shadow"
                >
                  {/* Itinerary Details */}
                  <ItineraryDetails itinerary={itinerary} />
      
                  {/* Rate Button */}
                 
      
                  {/* Rating Form */}
                  {visibleRating[itinerary._id] && (
                    <div className="mt-2">
                      <Rating
                        itemId={itinerary._id}
                        onRate={(id, rating, comment) => handleRateItinerary(id, rating, comment)}
                      />
                    </div>
                  )}
      
                  {/* Existing Ratings */}
                  <div className="mt-3">
                    <h5 className="text-lg font-semibold text-gray-600">
                      Existing Ratings:
                    </h5>
                    {itinerary.ratings && itinerary.ratings.length > 0 ? (
                      itinerary.ratings.map((entry, index) => (
                        <p key={index} className="text-sm text-gray-500">
                          <strong>{entry.name}</strong>: {entry.rating} - {entry.comment}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No ratings available for this Itinerary.</p>
                    )}
                  </div>
      
                  {/* Bookmark Section */}
                  {itinerary.active && (
                    <div className="mt-4">
                     
      
                      {isVisibleItineraryBookmark && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Enter Username"
                            value={bookmarkusername}
                            onChange={(e) => setbookmarkUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none"
                          />
                         
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No itineraries available at the moment.
            </p>
          )}
        </div>
      )}
      
                  {activeMenu === "activities" && (
                    <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
                        Activities
                      </h3>
            
                      {visibleActivities.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {visibleActivities.map((activity) => (
                            <div
                              key={activity._id}
                              className="p-4 border rounded shadow-md bg-white"
                            >
                              {/* Activity Details */}
                              <ActivityDetails activity={activity} />
            
                             
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500">
                          No activities available at the moment.
                        </p>
                      )}
                    </div>
                  )}
            
                  {/* Museums Section */}
                  {activeMenu === "museums" && (
                    <div className="section-card mb-6 p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
                        Museums
                      </h3>
            
                      {museums.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {museums.map((museum) => (
                            <div
                              key={museum._id}
                              className="p-4 border rounded shadow-md bg-white"
                            >
                              {/* Museum Details */}
                              <MuseumDetails museum={museum} />
            
                              {/* Bookmark Button */}
                             
                              {isVisibleMuseumBookmark && (
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    placeholder="Enter Username"
                                    value={bookmarkusername}
                                    onChange={(e) => setbookmarkUsername(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                  />
                                  
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500">
                          No museums available at the moment.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
            
            
      };
      
      export default GuestDashboard;