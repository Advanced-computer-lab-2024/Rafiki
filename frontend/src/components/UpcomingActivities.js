// src/components/UpcomingActivities.js
import React, { useState, useEffect } from 'react';

const UpcomingActivities = ({ touristId }) => {
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);

  // Fetch the upcoming paid activities for the tourist when the component is mounted
  useEffect(() => {
    const fetchUpcomingActivities = async () => {
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/upcoming-paid-activities`);
        if (response.ok) {
          const data = await response.json();
          setUpcomingActivities(data); // Set the fetched upcoming activities
        } else {
          setUpcomingActivities([]);
          console.log("No upcoming activities found.");
        }
      } catch (error) {
        console.error("Error fetching upcoming activities:", error);
        setError("Failed to fetch upcoming activities.");
      }
    };

    if (touristId) {
      fetchUpcomingActivities();
    }
  }, [touristId]);

  // Toggle visibility of upcoming activities
  const toggleUpcomingActivities = () => {
    setShowUpcoming(prev => !prev);
  };

  return (
    <div className="upcoming-activities">
      <button onClick={toggleUpcomingActivities}>
        {showUpcoming ? 'Hide Upcoming Activities' : 'Show Upcoming Activities'}
      </button>

      {/* Render upcoming activities when the button is clicked */}
      {showUpcoming && (
        <div>
          {upcomingActivities.length > 0 ? (
            <ul>
              {upcomingActivities.map((upcomingActivity) => (
                <li key={upcomingActivity._id}>

                <p><strong>Date:</strong> {new Date(upcomingActivity.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {upcomingActivity.time}</p>
                <p><strong>Location:</strong> {upcomingActivity.location}</p>
                <p><strong>Price:</strong> ${upcomingActivity.price.toFixed(2)}</p>
          
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming activities found.</p>
          )}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpcomingActivities;
