import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityDetails"; 
import MuseumDetails from "../components/museumDetails"; 
import ItineraryDetails from "../components/itineraryDetails";
import ChangePasswordForm from '../components/ChangePasswordForm';
import TagForm from "../components/TagForm";
import MuseumForm from '../components/museumForm';
// import '../CSS_files/GuestDashboard.css';

const GuestDashboard = () => {

    const [isGuideVisible, setIsGuideVisible] = useState(false);
    const handleGuideToggle = () => {
        setIsGuideVisible(!isGuideVisible);
    };

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

    const [museums, setMuseums] = useState(null); 
    const [isVisibleMuseums, setIsVisibleMuseums] = useState(false);
    const [isVisibleTagSearchMuseums, setIsVisibleTagSearchMuseums] = useState(false);
    const [isVisibleSearchMuseums, setIsVisibleSearchMuseums] = useState(false);
    const [tagMuseum, setTagMuseum] = useState('');
    const [nameMuseum, setNameMuseum] = useState('');

    const [itineraries, setItineraries] = useState(null);
    const [isVisibleItineraries, setIsVisibleItineraries] = useState(false);
    const [isVisibleLanguageFilter, setIsVisibleLanguageFilter] = useState(false);
    const [isVisibleBudgetFilterItinerary, setIsVisibleBudgetFilterItinerary] = useState(false);
    const [isVisibleDateFilterItinerary, setIsVisibleDateFilterItinerary] = useState(false);
    const [isVisiblePriceSortItinerary, setIsVisiblePriceSortItinerary] = useState(false);
    const [languageItinerary, setLanguageItinerary] = useState('');
    const [budgetItinerary, setBudgetItinerary] = useState('');
    const [dateItinerary, setDateItinerary] = useState('');
   
  const [isVisibleCreateTag, setIsVisibleCreateTag] = useState(false);
  const [isVisibleAddMuseum, setIsVisibleAddMuseum] = useState(false);
  const [isVisibleChangePassword, setIsVisibleChangePassword] = useState(false);

    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleToggleVisibility = (stateSetter) => {
        stateSetter((prevState) => !prevState);
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const museumResponse = await fetch('/api/museumRoute');
            const activityResponse = await fetch('/api/ActivityRoute');
            
            if (museumResponse.ok) {
              const museumsData = await museumResponse.json();
              setMuseums(museumsData);
            }
    
            if (activityResponse.ok) {
              const activitiesData = await activityResponse.json();
              setActivities(activitiesData);
            }
          } catch (err) {
            console.error('Error fetching data:', err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/uploadDocument", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("File uploaded successfully");
                setSelectedFile(null);
            } else {
                alert("Failed to upload file");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        }
    };

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
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-6 h-full">
                <h3 className="text-xl font-bold mb-4">Guest Dashboard</h3>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setIsVisibleActivities(!isVisibleActivities)}
                            className="text-lg text-blue-400 hover:text-white"
                        >
                            Show Activities
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsVisibleMuseums(!isVisibleMuseums)}
                            className="text-lg text-blue-400 hover:text-white"
                        >
                            Show Museums
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsVisibleItineraries(!isVisibleItineraries)}
                            className="text-lg text-blue-400 hover:text-white"
                        >
                            Show Itineraries
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsVisibleTagSearch(!isVisibleTagSearch)}
                            className="text-lg text-blue-400 hover:text-white"
                        >
                            Search by Tag
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsVisibleCategorySearch(!isVisibleCategorySearch)}
                            className="text-lg text-blue-400 hover:text-white"
                        >
                            Search by Category
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsVisibleBudgetFilter(!isVisibleBudgetFilter)}
                            className="text-lg text-blue-400 hover:text-white"
                        >
                            Filter by Budget
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsVisibleDateFilter(!isVisibleDateFilter)}
                            className="text-lg text-blue-400 hover:text-white"
                        >
                            Filter by Date
                        </button>
                    </li>
                </ul>
            </div>

           {/* Main Content */}
<div className="w-3/4 p-6">
    {/* Activities Section */}
    {isVisibleActivities && (
        <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">Activities</h3>
            <button
                onClick={() => handleToggleVisibility(setIsVisibleActivities)}
                className="text-blue-600 font-semibold"
            >
                {isVisibleActivities ? 'Hide' : 'Show'} Activities
            </button>
            {isVisibleActivities && (
                <div className="activity-list mt-4">
                    {loading ? (
                        <p className="text-gray-500">Loading activities...</p>
                    ) : activities.length > 0 ? (
                        activities.map((activity) => (
                            <ActivityDetails activity={activity} key={activity._id} />
                        ))
                    ) : (
                        <p className="text-gray-500">No activities found.</p>
                    )}
                </div>
            )}
        </div>
    )}

    {/* Museums Section */}
    {isVisibleMuseums && (
        <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">Museums</h3>
            <button
                onClick={() => handleToggleVisibility(setIsVisibleMuseums)}
                className="text-blue-600 font-semibold"
            >
                {isVisibleMuseums ? 'Hide' : 'Show'} Museums
            </button>
            {isVisibleMuseums && (
                <div className="museum-list mt-4">
                    {loading ? (
                        <p className="text-gray-500">Loading museums...</p>
                    ) : museums.length > 0 ? (
                        museums.map((museum) => (
                            <MuseumDetails museum={museum} key={museum._id} />
                        ))
                    ) : (
                        <p className="text-gray-500">No museums found.</p>
                    )}
                </div>
            )}
        </div>
    )}

    {/* Create Tag Section */}
    {isVisibleCreateTag && (
        <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Create New Tag</h3>
            <TagForm />
        </div>
    )}

    {/* Add Museum Form Section */}
    {isVisibleAddMuseum && (
        <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Museum</h3>
            <MuseumForm />
        </div>
    )}

    {/* Change Password Section */}
    {isVisibleChangePassword && (
        <div className="section-card p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h3>
            <ChangePasswordForm />
        </div>
    )}

    {/* File Upload Section */}
    <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
        <h3 className="text-2xl font-semibold text-gray-800">Upload a File</h3>
        <input
            type="file"
            onChange={handleFileChange}
            className="mt-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
            onClick={handleFileUpload}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
            Upload File
        </button>
    </div>
</div>
    {/* Tag Search Section */}
    {isVisibleTagSearch && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Search Activities by Tag</h3>
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                        placeholder="Enter Tag"
                    />
                    <button
                        onClick={handleTagSearch}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            )}

            {/* Category Search Section */}
            {isVisibleCategorySearch && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Search Activities by Category</h3>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                        placeholder="Enter Category"
                    />
                    <button
                        onClick={handleCategorySearch}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            )}

            {/* Budget Filter Section */}
            {isVisibleBudgetFilter && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Filter Activities by Budget</h3>
                    <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                    >
                        <option value="">Select Budget</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button
                        onClick={handleBudgetFilter}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Apply Filter
                    </button>
                </div>
            )}

            {/* Date Filter Section */}
            {isVisibleDateFilter && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Filter Activities by Date</h3>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                    />
                    <button
                        onClick={handleDateFilter}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Apply Filter
                    </button>
                </div>
            )}

            {/* Sort by Price Section */}
            {isVisiblePriceSort && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Sort Activities by Price</h3>
                    <button
                        onClick={handleSortByPrice}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Sort by Price
                    </button>
                </div>
            )}

            {/* Museums Filter by Name Section */}
            {isVisibleSearchMuseums && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Search Museums by Name</h3>
                    <input
                        type="text"
                        value={nameMuseum}
                        onChange={(e) => setNameMuseum(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                        placeholder="Enter Museum Name"
                    />
                    <button
                        onClick={museumNameSearch}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            )}

            {/* Itinerary Budget Filter Section */}
            {isVisibleBudgetFilterItinerary && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Filter Itineraries by Budget</h3>
                    <select
                        value={budgetItinerary}
                        onChange={(e) => setBudgetItinerary(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                    >
                        <option value="">Select Budget</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button
                        onClick={itineraryBudgetFilter}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Apply Filter
                    </button>
                </div>
            )}

            {/* Itinerary Language Filter Section */}
            {isVisibleLanguageFilter && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Filter Itineraries by Language</h3>
                    <select
                        value={languageItinerary}
                        onChange={(e) => setLanguageItinerary(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                    >
                        <option value="">Select Language</option>
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                    </select>
                    <button
                        onClick={itineraryLanguageFilter}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Apply Filter
                    </button>
                </div>
            )}

            {/* Itinerary Date Filter Section */}
            {isVisibleDateFilterItinerary && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Filter Itineraries by Date</h3>
                    <input
                        type="date"
                        value={dateItinerary}
                        onChange={(e) => setDateItinerary(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                    />
                    <button
                        onClick={itineraryDateFilter}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Apply Filter
                    </button>
                </div>
            )}

            {/* Itinerary Sort by Price Section */}
            {isVisiblePriceSortItinerary && (
                <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">Sort Itineraries by Price</h3>
                    <button
                        onClick={ItinerarySortByPrice}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Sort by Price
                    </button>
                </div>
            )}
        </div>
    );
};

export default GuestDashboard;
