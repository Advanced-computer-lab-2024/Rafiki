// src/components/UpcomingActivities.js
import React, { useState, useEffect } from 'react';

const PastActivities = ({ touristId }) => {
  const [pastActivities, setPastActivities] = useState([]);
  const [showPast, setShowPast] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);

  // Fetch the past paid activities for the tourist when the component is mounted
  useEffect(() => {
    const fetchPastActivities = async () => {
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/past-paid-activities`);
        if (response.ok) {
          const data = await response.json();
          setPastActivities(data); // Set the fetched upcoming activities
        } else {
          setPastActivities([]);
          console.log("No Past activities found.");
        }
      } catch (error) {
        console.error("Error fetching past activities:", error);
        setError("Failed to fetch past activities.");
      }
    };

    if (touristId) {
      fetchPastActivities();
    }
  }, [touristId]);

  // Toggle visibility of upcoming activities
  const togglePastActivities = () => {
    setShowPast(prev => !prev);
  };

  return (
    <div className="past-activities">
      <button onClick={togglePastActivities}>
        {showPast ? 'Hide Past Activities' : 'Show Past Activities'}
      </button>

      {/* Render past activities when the button is clicked */}
      {showPast && (
        <div>
         
          {pastActivities.length > 0 ? (
            <ul>
              {pastActivities.map((pastActivity) => (
                <li key={pastActivity._id}>


                <p><strong>Date:</strong> {new Date(pastActivity.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {pastActivity.time}</p>
                <p><strong>Location:</strong>{pastActivity.location}</p>
                <p><strong>Price:</strong> ${pastActivity.price.toFixed(2)}</p>


                </li>
              ))}
            </ul>
          ) : (
            <p>No past activities found.</p>
          )}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PastActivities;
