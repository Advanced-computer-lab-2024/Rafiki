import { useEffect, useState } from "react";
import ItineraryDetails from "../components/itineraryDetails"; 
import ActivityDetails from "../components/ActivityDetails"; 
import TouristForm from "../components/touristForm";
import TouristDetails from "../components/TouristDetails";
import ProductDetails from "../components/ProductDetails";
import  UpdateTourist  from "../components/UpdateTourist";
// components

const TouristSignup = () => {
    const [tourists, setTourists] = useState(null);
    const [itineraries, setItineraries] = useState(null); 
    const [activities, setActivities] = useState(null); 
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [products, setProducts] = useState([]);
    const [isProductVisible, setIsProductVisible] = useState(false);
    const [budget, setBudget] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    const [budget1, setBudget1] = useState('');
    const [date1, setDate1] = useState('');
    const [category1, setCategory1] = useState('');
    const [language, setLanguage] = useState('');

    const [searchTermActivities, setSearchTermActivities] = useState('');
    const [searchTermItineraries, setSearchTermItineraries] = useState('');

    const [selectedTourguide, setSelectedTourguide] = useState(null);


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
    useEffect(() => {
        const fetchActivities = async () => {
            const queryParams = new URLSearchParams();
            if (budget) queryParams.append('budget', budget);
            if (date) queryParams.append('date', date);
            if (category) queryParams.append('category', category);
            if (searchTermActivities) queryParams.append('tags', searchTermActivities); // Add search term

            const response = await fetch(`/api/ActivityRoute?${queryParams.toString()}`);
            const json = await response.json();

            if (response.ok) {
                setActivities(json);
            }
        };

        fetchActivities();
    }, [budget, date, category, searchTermActivities]); 

    // Fetch activities with filters
    useEffect(() => {
        const fetchItineraries = async () => {
            const queryParams = new URLSearchParams();
            if (budget1) queryParams.append('budget', budget1);
            if (date1) queryParams.append('date', date1);
            if (category1) queryParams.append('category', category1);
            if (language) queryParams.append('language', language);
            if (searchTermItineraries) queryParams.append('name', searchTermItineraries); // Add search term




            const response = await fetch(`/api/itineraryRoute?${queryParams.toString()}`);
            const json = await response.json();

            if (response.ok) {
                setItineraries(json);
            }
        };

        fetchItineraries();
    }, [budget1, date1, category1, language, searchTermItineraries]);

    // Fetch itineraries
    useEffect(() => {
        const fetchItineraries = async () => {
            const response = await fetch('/api/itineraryRoute');
            const json = await response.json();

            if (response.ok) {
                setItineraries(json);
            }
        };

        fetchItineraries();
    }, []);

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
    
    const handleClick2 = () => {
        setIsVisible2(!isVisible2);
    };
    
    const handleClick3 = () => {
        setIsVisible3(!isVisible3);
    };
    const handleProductClick = () => {
      setIsProductVisible(!isProductVisible);
    };

    return (
        <div>
            <h2>Tourist Dashboard</h2>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} Tourist Details
            </button>
            <button onClick={handleClick2}>
                {isVisible2 ? 'Hide' : 'View'} Itineraries
            </button>
            <button onClick={handleClick3}>
                {isVisible3 ? 'Hide' : 'View'} Activities
            </button>

            {/* Filter Inputs */}
            <div className="filters">
                <input 
                    type="number" 
                    placeholder="Budget" 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                />
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                />
                 <input 
                    type="text" 
                    placeholder="Search Activities" 
                    value={searchTermActivities} 
                    onChange={(e) => setSearchTermActivities(e.target.value)} 
                />
                
                <button onClick={() => { setBudget(''); setDate(''); setCategory(''); setSearchTermActivities(''); 
                     }}>Clear Filters</button>
            </div>

            <div className="itineraryFilters">
                <input 
                    type="number" 
                    placeholder="Budget" 
                    value={budget1} 
                    onChange={(e) => setBudget1(e.target.value)} 
                />
                <input 
                    type="date" 
                    value={date1} 
                    onChange={(e) => setDate1(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    value={category1} 
                    onChange={(e) => setCategory1(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Language" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Search Itineraries" 
                    value={searchTermItineraries} 
                    onChange={(e) => setSearchTermItineraries(e.target.value)} 
                />
                <button onClick={() => { setBudget1(''); setDate1(''); setCategory1(''); setLanguage(''); setSearchTermItineraries('');}}>Clear Filters</button>
            </div>

            {/* {isVisible && (
                <div className="tourist-details">
                    {tourists && tourists.map(tourist => (
                        <TouristDetails tourist={tourist} key={tourist._id} />
                    ))}
                </div>
            )} */}

{isVisible && (
                <div className="workouts">
                    {tourists && tourists.map(tourist => (
                        <div key={tourist._id}>
                            < TouristDetails tourist={tourist} />
                            <button onClick={() => handleUpdate(tourist)}>Update</button>
                        </div>
                    ))}
                </div>
            )}

            {isVisible2 && (
                <div className="itineraries">
                    {itineraries && itineraries.map(itinerary => (
                        <ItineraryDetails itinerary={itinerary} key={itinerary._id} />
                    ))}
                </div>
            )}

            {isVisible3 && (
                <div className="activities">
                    {activities && activities.map(activity => (
                        <ActivityDetails activity={activity} key={activity._id} />
                    ))}
                </div>
            )}
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
      

            {/* Tourist Signup Form */}
            <TouristForm />
            <UpdateTourist existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
        </div>
    );
};

export default TouristSignup;
