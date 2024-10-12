import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityDetails"; 
import MuseumDetails from "../components/museumDetails"; 
import ItineraryDetails from "../components/itineraryDetails";

const GuestDashboard = () => {
    // activities
    const [activities, setActivities] = useState(null); 
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


    return (
        <div>
            <h1>Guest Dashboard</h1>
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
            
            {isVisibleActivities && (
                <div className="activities">
                    {activities && activities.map(activity => (
                        <ActivityDetails activity={activity} key={activity._id} />
                    ))}
                </div>
            )}
            <br />
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
                        <MuseumDetails museum={museum} key={museum._id} />
                    ))}
                </div>
            )}
            <br />
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
                        <ItineraryDetails itinerary={itinerary} key={itinerary._id} />
                    ))}
                </div>
            )}

        </div>
    );
};

export default GuestDashboard;
