import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

const PastItineraries = ({ touristId }) => {
  const [pastItineraries, setPastItineraries] = useState([]);
  const [showPast, setShowPast] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the past paid itineraries for the tourist when the component is mounted
  useEffect(() => {
    const fetchPastItineraries = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/past-paid-Itineraries`);
        if (response.ok) {
          const data = await response.json();
          setPastItineraries(data); // Set the fetched past itineraries
        } else {
          setPastItineraries([]);
          console.log("No past itineraries found.");
        }
      } catch (error) {
        console.error("Error fetching past itineraries:", error);
        setError("Failed to fetch past itineraries.");
      } finally {
        setLoading(false);
      }
    };

    if (touristId) {
      fetchPastItineraries();
    }
  }, [touristId]);

  // Toggle visibility of past itineraries
  const togglePastItineraries = () => {
    setShowPast(prev => !prev);
  };

  return (
    <div className="past-itineraries p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <button 
        onClick={togglePastItineraries} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
        {showPast ? 'Hide Past Itineraries' : 'Show Past Itineraries'}
      </button>

      {/* Loading State */}
      {loading && <div className="text-center mt-4 text-gray-500">Loading...</div>}

      {/* Render past itineraries when the button is clicked */}
      {showPast && !loading && (
        <div className="mt-4">
          {pastItineraries.length > 0 ? (
            <ul className="space-y-6">
              {pastItineraries.map((pastItinerary) => (
                <li key={pastItinerary._id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaCalendarAlt className="text-gray-600" />
                    <p><strong>Activities:</strong> {pastItinerary.activities.join(', ')}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p><strong>Locations:</strong> {pastItinerary.locations.join(', ')}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-gray-600" />
                    <p><strong>Timeline:</strong> {pastItinerary.timeline}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaDollarSign className="text-gray-600" />
                    <p><strong>Price:</strong> ${pastItinerary.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaCalendarAlt className="text-gray-600" />
                    <p><strong>Available Dates:</strong> 
                      {pastItinerary.availableDates.map(date => (
                        <span key={date}>{new Date(date).toLocaleDateString()}, </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p><strong>Pickup Location:</strong> {pastItinerary.pickupLocation}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p><strong>Drop-off Location:</strong> {pastItinerary.dropOffLocation}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No past itineraries found.</p>
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

export default PastItineraries;
