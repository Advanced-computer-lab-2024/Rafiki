import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityDetailsforTouriSignup";
import ItineraryDetails from "../components/itineraryDetailsforTouristSignup";
import MuseumDetails from "../components/museumDetailsforTouristSignup";
import { fetchItineraries, fetchItineraryRatings, submitItineraryRating } from '../components/itineraryService';
import { fetchActivities, fetchRatings, submitRating } from '../components/activityService';
import Rating from '../components/Rating';



const BookmarkDetails = () => {
    const [bookmark, setBookmark] = useState(null); // State to store the bookmark
    const [username, setUsername] = useState(""); // State to store the entered username
    const [isFieldVisible, setIsFieldVisible] = useState(false);
    const [tourists, setTourists] = useState(null);
    const [nameBeforeRating, setNameBeforeRating] = useState(''); // New state for the entered name
    const [visibleRating, setVisibleRating] = useState({});
    const [ratings, setRatings] = useState({}); // To hold ratings for each activity







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


    // Fetch the bookmark data for the entered username
    const fetchBookmark = async () => {
        if (username) {
            const response = await fetch(`/api/bookmarkRoute/${username}`); // Ensure this is the correct API endpoint for fetching bookmarks
            const data = await response.json();
            if (data && data.bookmark) {
                setBookmark(data.bookmark); // Store the bookmark data
            } else {
                setBookmark(null); // In case there is no bookmark data
            }
        }
    };

    // Remove an item from the bookmark
    const removeItemFromBookmark = async (username, itemId, type) => {
        const response = await fetch('/api/bookmarkRoute/remove', { // Ensure this is the correct API endpoint for removal
            method: 'DELETE', // Use DELETE for removal
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, itemId, type }), // Send username and itemId in the request body
        });
        const data = await response.json();
        if (data.success) {
            // If the item was successfully removed, fetch updated bookmark
            fetchBookmark();
        }
    };

    return (
        <div>
            {/* Button to toggle username input visibility */}
            <button onClick={() => setIsFieldVisible(!isFieldVisible)}>
                {isFieldVisible ? "Hide" : "Enter Username to View Bookmark"}
            </button>

            {/* Username input and Show Bookmark button */}
            {isFieldVisible && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={fetchBookmark}>Show Bookmark</button>
                </div>
            )}

            {/* Render the bookmark content */}
            {isFieldVisible && (
                <div className="activities">
                    {bookmark && bookmark.Activities && bookmark.Activities.length > 0 ? (
                        bookmark.Activities.map((activity) => (
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
                                {/* Optionally, you can add a button to remove the activity */}
                                <button onClick={() => removeItemFromBookmark(username, activity._id, 'Activities')}>
                                    Remove from Bookmark
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No activities bookmarked.</p>
                    )}
                </div>
            )}

            {isFieldVisible && (
                <div className="Itineraries">
                    {bookmark && bookmark.Itineraries && bookmark.Itineraries.length > 0 ? (
                        bookmark.Itineraries.map((itinerary) => (
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
  </div>
) : null}

    </div>

                                {/* Optionally, you can add a button to remove the activity */}
                                <button onClick={() => removeItemFromBookmark(username, itinerary._id, 'Itineraries')}>
                                    Remove from Bookmark
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No itineraries bookmarked.</p>
                    )}
                </div>
            )}

            {isFieldVisible && (
                <div className="museums">
                    {bookmark && bookmark.Museums && bookmark.Museums.length > 0 ? (
                        bookmark.Museums.map((museum) => (
                            <div key={museum._id}>
                                 <MuseumDetails museum={museum} />


                                {/* Optionally, you can add a button to remove the activity */}
                                <button onClick={() => removeItemFromBookmark(username, museum._id, 'Museums')}>
                                    Remove from Bookmark
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No museums bookmarked.</p>
                    )}
                </div>
            )}


        </div>
    );
};

export default BookmarkDetails;
