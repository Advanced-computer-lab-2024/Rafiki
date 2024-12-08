import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

const UpcomingItineraries = ({ touristId }) => {
  const [UpcomingItineraries, setUpcomingItineraries] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(false); // State to toggle visibility
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the upcoming paid itineraries for the tourist when the component is mounted
  useEffect(() => {
    const fetchUpcomingItineraries = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/upcoming-paid-Itineraries`);
        if (response.ok) {
          const data = await response.json();
          setUpcomingItineraries(data); // Set the fetched upcoming itineraries
        } else {
          setUpcomingItineraries([]);
          console.log("No upcoming itineraries found.");
        }
      } catch (error) {
        console.error("Error fetching upcoming itineraries:", error);
        setError("Failed to fetch upcoming itineraries.");
      } finally {
        setLoading(false);
      }
    };

    if (touristId) {
      fetchUpcomingItineraries();
    }
  }, [touristId]);

  // Toggle visibility of upcoming itineraries
  const toggleUpcomingItineraries = () => {
    setShowUpcoming(prev => !prev);
  };

  return (
    <div className="upcoming-itineraries p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <button 
        onClick={toggleUpcomingItineraries} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
        {showUpcoming ? 'Hide Upcoming Itineraries' : 'Show Upcoming Itineraries'}
      </button>

      {/* Loading State */}
      {loading && <div className="text-center mt-4 text-gray-500">Loading...</div>}

      {/* Render upcoming itineraries when the button is clicked */}
      {showUpcoming && !loading && (
        <div className="mt-4">
          {UpcomingItineraries.length > 0 ? (
            <ul className="space-y-6">
              {UpcomingItineraries.map((upcomingItinerary) => (
                <li key={upcomingItinerary._id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaCalendarAlt className="text-gray-600" />
                    <p><strong>Activities:</strong> {upcomingItinerary.activities.join(', ')}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p><strong>Locations:</strong> {upcomingItinerary.locations.join(', ')}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-gray-600" />
                    <p><strong>Timeline:</strong> {upcomingItinerary.timeline}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-gray-600" />
                    <p><strong>Duration:</strong> {upcomingItinerary.duration} hours</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p><strong>Language:</strong> {upcomingItinerary.language}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaDollarSign className="text-gray-600" />
                    <p><strong>Price:</strong> ${upcomingItinerary.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <p><strong>Available Dates:</strong> 
                      {upcomingItinerary.availableDates.map(date => (
                        <span key={date}>{new Date(date).toLocaleDateString()}, </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <p><strong>Accessibility:</strong> {upcomingItinerary.accessibility}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <p><strong>Pickup Location:</strong> {upcomingItinerary.pickupLocation}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <p><strong>Drop-off Location:</strong> {upcomingItinerary.dropOffLocation}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming itineraries found.</p>
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

export default UpcomingItineraries;
