// src/components/PastItineraries.js
import React, { useState, useEffect } from 'react';

const PastItineraries = ({ touristId }) => {
  const [pastItineraries, setpastItineraries] = useState([]);
  const [showPast, setShowPast] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);

  // Fetch the past paid activities for the tourist when the component is mounted
  useEffect(() => {
    const fetchpastItineraries = async () => {
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/past-paid-Itineraries`);
        if (response.ok) {
          const data = await response.json();
          setpastItineraries(data); // Set the fetched past activities
        } else {
          setpastItineraries([]);
          console.log("No past itineraries found.");
        }
      } catch (error) {
        console.error("Error fetching past itineraries:", error);
        setError("Failed to fetch past itineraries.");
      }
    };

    if (touristId) {
      fetchpastItineraries();
    }
  }, [touristId]);

  // Toggle visibility of upcoming activities
  const togglepastItineraries = () => {
    setShowPast(prev => !prev);
  };

  return (
    <div className="past-itineraries">
      <button onClick={togglepastItineraries}>
        {showPast ? 'Hide Past Itineraries' : 'Show Past Itineraries'}
      </button>

      {/* Render past activities when the button is clicked */}
      {showPast && (
        <div>
         
          {pastItineraries.length > 0 ? (
            <ul>
              {pastItineraries.map((pastItinerary) => (
                <li key={pastItinerary._id}>
                  <p><strong>Activities:</strong> {pastItinerary.activities.join(', ')}</p>
          <p><strong>Locations:</strong> {pastItinerary.locations.join(', ')}</p>
          <p><strong>Timeline:</strong> {pastItinerary.timeline}</p>
          <p><strong>Duration:</strong> {pastItinerary.duration} hours</p>
          <p><strong>Language:</strong> {pastItinerary.language}</p>
          <p><strong>Price:</strong> ${pastItinerary.price.toFixed(2)}</p>
          <p><strong>Available Dates:</strong> 
            {pastItinerary.availableDates.map(date => (
              <span key={date}>{new Date(date).toLocaleDateString()}, </span>
            ))}
          </p>
          <p><strong>Accessibility:</strong> {pastItinerary.accessibility}</p>
          <p><strong>Pickup Location:</strong> {pastItinerary.pickupLocation}</p>
          <p><strong>Drop-off Location:</strong> {pastItinerary.dropOffLocation}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No past itinerary found.</p>
          )}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PastItineraries;
