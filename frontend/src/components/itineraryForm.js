import { useState } from 'react';

const ItineraryForm = ({ onCreated }) => {
  const [tourGuideUsername, setTourGuideUsername] = useState('');
  const [activities, setActivities] = useState('');
  const [locations, setLocations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState('');
  const [availableDates, setAvailableDates] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated values to arrays
    const itinerary = {
      tourGuideUsername,
      activities: activities.split(',').map(activity => activity.trim()), // Split and trim to create an array
      locations: locations.split(',').map(location => location.trim()), // Split and trim to create an array
      timeline,
      duration,
      language,
      price,
      availableDates: availableDates.split(',').map(date => date.trim()), // Split and trim to create an array
      accessibility,
      pickupLocation,
      dropOffLocation,
    };

    try {
      const response = await fetch('/api/itineraryRoute/creatingitinerary', {
        method: 'POST',
        body: JSON.stringify(itinerary),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      console.log("Response JSON:", json); // For debugging response

      if (!response.ok) {
        setError(json.error || 'An error occurred');
      } else {
        setError(null);
        if (onCreated) onCreated(); // Refresh itinerary list if callback is provided
        // Reset form fields
        setTourGuideUsername('');
        setActivities('');
        setLocations('');
        setTimeline('');
        setDuration('');
        setLanguage('');
        setPrice('');
        setAvailableDates('');
        setAccessibility('');
        setPickupLocation('');
        setDropOffLocation('');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while submitting the form.");
    }
  };
  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
    <button onClick={handleClick}>
      {isVisible ? 'Hide' : 'Show'} Create Itinerary
    </button>
    {isVisible && (
    <form onSubmit={handleSubmit}>
      <h3>Create Itinerary</h3>
      {error && <div className="error">{error}</div>}
      <label>Tour Guide Username:</label>
      <input 
        type="text" 
        value={tourGuideUsername} 
        onChange={(e) => setTourGuideUsername(e.target.value)} 
        required 
      />

      <label>Activities (comma-separated):</label>
      <textarea 
        value={activities} 
        onChange={(e) => setActivities(e.target.value)} 
        required 
      />

      <label>Locations (comma-separated):</label>
      <textarea 
        value={locations} 
        onChange={(e) => setLocations(e.target.value)} 
        required 
      />

      <label>Timeline:</label>
      <input 
        type="text" 
        value={timeline} 
        onChange={(e) => setTimeline(e.target.value)} 
        required 
      />

      <label>Duration (in hours):</label>
      <input 
        type="number" 
        value={duration} 
        onChange={(e) => setDuration(e.target.value)} 
        required 
      />

      <label>Language:</label>
      <input 
        type="text" 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)} 
        required 
      />

      <label>Price:</label>
      <input 
        type="number" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        required 
      />

      <label>Available Dates (comma-separated):</label>
      <textarea 
        value={availableDates} 
        onChange={(e) => setAvailableDates(e.target.value)} 
        required 
      />

      <label>Accessibility:</label>
      <input 
        type="text" 
        value={accessibility} 
        onChange={(e) => setAccessibility(e.target.value)} 
        required 
      />

      <label>Pickup Location:</label>
      <input 
        type="text" 
        value={pickupLocation} 
        onChange={(e) => setPickupLocation(e.target.value)} 
        required 
      />

      <label>Drop-Off Location:</label>
      <input 
        type="text" 
        value={dropOffLocation} 
        onChange={(e) => setDropOffLocation(e.target.value)} 
        required 
      />

      <button type="submit">Create Itinerary</button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>

  );
};


export default ItineraryForm;