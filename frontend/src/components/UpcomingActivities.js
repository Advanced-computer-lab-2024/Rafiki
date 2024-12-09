import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';

const UpcomingActivities = ({ touristId }) => {
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the upcoming paid activities for the tourist when the component is mounted
  useEffect(() => {
    const fetchUpcomingActivities = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
    <div className="upcoming-activities p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <button 
        onClick={toggleUpcomingActivities} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
        {showUpcoming ? 'Hide Upcoming Activities' : 'Show Upcoming Activities'}
      </button>

      {/* Loading State */}
      {loading && <div className="text-center mt-4 text-gray-500">Loading...</div>}

      {/* Render upcoming activities when the button is clicked */}
      {showUpcoming && !loading && (
        <div className="mt-4">
          {upcomingActivities.length > 0 ? (
            <ul className="space-y-4">
              {upcomingActivities.map((activity) => (
                <li key={activity._id} className="border p-4 rounded-md shadow-sm hover:shadow-lg transition duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaCalendarAlt className="text-gray-600" />
                    <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-gray-600" />
                    <p><strong>Time:</strong> {activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p><strong>Location:</strong> {activity.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p><strong>Price:</strong> ${activity.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No upcoming activities found.</div>
          )}
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded flex items-center space-x-2">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default UpcomingActivities;
