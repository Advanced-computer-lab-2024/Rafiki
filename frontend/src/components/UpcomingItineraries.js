// src/components/UpcomingItineraries.js
import React, { useState, useEffect } from 'react';

const UpcomingItineraries = ({ touristId }) => {
  const [UpcomingItineraries, setUpcomingItineraries] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);

  // Fetch the upcoming paid activities for the tourist when the component is mounted
  useEffect(() => {
    const fetchUpcomingItineraries = async () => {
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/upcoming-paid-Itineraries`);
        if (response.ok) {
          const data = await response.json();
          setUpcomingItineraries(data); // Set the fetched upcoming activities
        } else {
          setUpcomingItineraries([]);
          console.log("No upcoming itineraries found.");
        }
      } catch (error) {
        console.error("Error fetching upcoming itineraries:", error);
        setError("Failed to fetch upcoming itineraries.");
      }
    };

    if (touristId) {
      fetchUpcomingItineraries();
    }
  }, [touristId]);

  // Toggle visibility of upcoming activities
  const toggleUpcomingItineraries = () => {
    setShowUpcoming(prev => !prev);
  };

  return (
    <div className="upcoming-itineraries">
      <button onClick={toggleUpcomingItineraries}>
        {showUpcoming ? 'Hide Upcoming Itineraries' : 'Show Upcoming Itineraries'}
      </button>

      {/* Render upcoming activities when the button is clicked */}
      {showUpcoming && (
        <div>
         
          {UpcomingItineraries.length > 0 ? (
            <ul>
              {UpcomingItineraries.map((upcomingItinerary) => (
                <li key={upcomingItinerary._id}>
                  <p><strong>Activities:</strong> {upcomingItinerary.activities.join(', ')}</p>
          <p><strong>Locations:</strong> {upcomingItinerary.locations.join(', ')}</p>
          <p><strong>Timeline:</strong> {upcomingItinerary.timeline}</p>
          <p><strong>Duration:</strong> {upcomingItinerary.duration} hours</p>
          <p><strong>Language:</strong> {upcomingItinerary.language}</p>
          <p><strong>Price:</strong> ${upcomingItinerary.price.toFixed(2)}</p>
          <p><strong>Available Dates:</strong> 
            {upcomingItinerary.availableDates.map(date => (
              <span key={date}>{new Date(date).toLocaleDateString()}, </span>
            ))}
          </p>
          <p><strong>Accessibility:</strong> {upcomingItinerary.accessibility}</p>
          <p><strong>Pickup Location:</strong> {upcomingItinerary.pickupLocation}</p>
          <p><strong>Drop-off Location:</strong> {upcomingItinerary.dropOffLocation}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming itinerary found.</p>
          )}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpcomingItineraries;
