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
import PaymentForm from '../components/paymentForm';
import RedemptionForm from '../components/redemptionForm';

// components
import axios from 'axios';
import HotelPopup from "./HotelPopup";
import FlightPopup from "./FlightPopup";
import TransportationPopup from "./TransportationPopup";
import ComplainCreateForm from "../components/complainCreateForm"
import { useFlaggedActivities } from '../FlaggedActivitiesContext';

const TouristSignup = () => {
    const [ratings, setRatings] = useState({}); // To hold ratings for each activity
    const [comments, setComments] = useState({}); // To hold comments for each activity
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
    const [transportationData, setTransportationData ] = useState([]);
    const { flaggedActivities } = useFlaggedActivities();
    const [isVisibleRating, setIsVisibleRating] = useState(false);

    const toggleRatingForm = (id) => {
        setIsVisibleRating((prevVisibility) => ({
          ...prevVisibility,
          [id]: !prevVisibility[id], // Toggle the visibility for the specific product
        }));
      };
    
        
        
    
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


        const toggleRedemptionForm = (tourist) => {
            setSelectedTourist(tourist);
            setIsRedemptionVisible(!isRedemptionVisible);
        };
    

        const handleRateActivity = (id, rating, comment) => {
            setRatings((prevRatings) => ({
                ...prevRatings,
                [id]: rating,
            }));
        
            setComments((prevComments) => ({
                ...prevComments,
                [id]: comment,
            }));
        
            // Here you can also implement logic to save this data to your backend if needed
        };
        const TouristChangePassword = () => (
            <ChangePasswordForm apiEndpoint="/api/TouristRoute/changePassword" />
          );


    const showFlightPopup = () => setIsFlightPopupVisible(true);
    const hideFlightPopup = () => setIsFlightPopupVisible(false);
    const [isTransportationPopupVisible, setIsTransportationPopupVisible] = useState(false);
    const showTransportationPopup = () => setIsTransportationPopupVisible(true);
    const hideTransportationPopup = () => setIsTransportationPopupVisible(false);
    
   
    

    

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
                baseURL: 'https://test.api.amadeus.com/v2',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // Adjust this if needed
                }
            });

            const travelersData = flightData.travelers.map((traveler, index) => ({
                id: `${index + 1}`,
                travelerType: "ADULT",  // Adjust as needed for different types
                name: traveler.name
            }));

            // Step 3: Make the API request
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

            console.log('API request successful');
            console.log(response.data.data);
            setFlightPopupData(response.data.data);
            console.log(flightPopupData);
            showFlightPopup();
            console.log(isFlightPopupVisible)

        } catch (error) {
            console.error('Error:', error.message || 'An error occurred');
            console.error('Response data:', error.response?.data || 'No response data available');
            console.error('Request config:', error.config);
            console.error('Full error stack:', error.stack);
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
        const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
        const savedComments = JSON.parse(localStorage.getItem('comments')) || {};

        setRatings(savedRatings);
        setComments(savedComments);
    }, []);

    useEffect(() => {
        localStorage.setItem('ratings', JSON.stringify(ratings));
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [ratings, comments]);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('/api/ActivityRoute');
            const json = await response.json();
            if (response.ok) {
                setActivities(json);
            }
        };
        fetchActivities();
    }, []);

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


    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);


    const handlePaymentClickItinerary = (itinerary) => {
        setSelectedItinerary(itinerary);
        setSelectedMuseum(null);
        setSelectedActivity(null);
        setIsPaymentVisible(prev => !prev);
    };

    // Function to handle payment click for museums
    const handlePaymentClickMuseum = (museum) => {
        setSelectedMuseum(museum);
        setSelectedItinerary(null);
        setSelectedActivity(null);
        setIsPaymentVisible(prev => !prev);
    };

    // Function to handle payment click for activities
    const handlePaymentClickActivity = (activity) => {
        setSelectedActivity(activity);
        setSelectedItinerary(null);
        setSelectedMuseum(null);
        setIsPaymentVisible(prev => !prev);
    };

    // Function to close payment form
    const closePaymentForm = () => {
        setIsPaymentVisible(false);
        setSelectedItinerary(null);
        setSelectedMuseum(null);
        setSelectedActivity(null);
    };



    return (
        <div>
            <h2>Tourist Dashboard</h2>
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

                <button onClick={() => toggleRatingForm(product._id)} style={{ marginTop: '10px' }}>
                  {isVisibleRating[product._id] ? 'Hide payment' : 'Pay for this product'}
                </button>

                
                <Rating 
                    activityId={product._id} 
                    onRate={(id, rating, comment) => handleRateActivity(id, rating, comment)} 
                />
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
                </div>
            )}

            {/* Tourist Signup Form */}
            <TouristForm />
            <UpdateTourist existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
            <h4>Complaint:</h4>
            <ComplainCreateForm />

            <h4>Activities:</h4>

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
                {/* Add the Rating Component */}
                <Rating 
                    activityId={activity._id} 
                    onRate={(id, rating, comment) => handleRateActivity(id, rating, comment)} 
                />
                
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