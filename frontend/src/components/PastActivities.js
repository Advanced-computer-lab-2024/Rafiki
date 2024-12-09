import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

const PastActivities = ({ touristId }) => {
  const [pastActivities, setPastActivities] = useState([]);
  const [showPast, setShowPast] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the past paid activities for the tourist when the component is mounted
  useEffect(() => {
    const fetchPastActivities = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/past-paid-activities`);
        if (response.ok) {
          const data = await response.json();
          setPastActivities(data); // Set the fetched past activities
        } else {
          setPastActivities([]);
          console.log("No past activities found.");
        }
      } catch (error) {
        console.error("Error fetching past activities:", error);
        setError("Failed to fetch past activities.");
      } finally {
        setLoading(false);
      }
    };

    if (touristId) {
      fetchPastActivities();
    }
  }, [touristId]);

  // Toggle visibility of past activities
  const togglePastActivities = () => {
    setShowPast(prev => !prev);
  };

  return (
    <div className="past-activities p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <button 
        onClick={togglePastActivities} 
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
        {showPast ? 'Hide Past Activities' : 'Show Past Activities'}
      </button>

      {/* Loading State */}
      {loading && <div className="text-center mt-4 text-gray-500">Loading...</div>}

      {/* Render past activities when the button is clicked */}
      {showPast && !loading && (
        <div className="mt-4">
          {pastActivities.length > 0 ? (
            <ul className="space-y-6">
              {pastActivities.map((pastActivity) => (
                <li key={pastActivity._id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaCalendarAlt className="text-gray-600" />
                    <p><strong>Date:</strong> {new Date(pastActivity.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-gray-600" />
                    <p><strong>Time:</strong> {pastActivity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p><strong>Location:</strong> {pastActivity.location}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaDollarSign className="text-gray-600" />
                    <p><strong>Price:</strong> ${pastActivity.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No past activities found.</p>
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

export default PastActivities;
