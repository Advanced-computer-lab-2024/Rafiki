import { useState, useEffect } from 'react';

const ItineraryForm = ({ existingItinerary, onCreated, onDeleted }) => {
  const [tourGuideUsername, setTourGuideUsername] = useState(existingItinerary ? existingItinerary.tourGuideUsername : '');
  const [activities, setActivities] = useState(existingItinerary ? existingItinerary.activities.join(', ') : '');
  const [locations, setLocations] = useState(existingItinerary ? existingItinerary.locations.join(', ') : '');
  const [timeline, setTimeline] = useState(existingItinerary ? existingItinerary.timeline : '');
  const [duration, setDuration] = useState(existingItinerary ? existingItinerary.duration : '');
  const [language, setLanguage] = useState(existingItinerary ? existingItinerary.language : '');
  const [price, setPrice] = useState(existingItinerary ? existingItinerary.price : '');
  const [availableDates, setAvailableDates] = useState(existingItinerary ? existingItinerary.availableDates.join(', ') : '');
  const [accessibility, setAccessibility] = useState(existingItinerary ? existingItinerary.accessibility : '');
  const [pickupLocation, setPickupLocation] = useState(existingItinerary ? existingItinerary.pickupLocation : '');
  const [dropOffLocation, setDropOffLocation] = useState(existingItinerary ? existingItinerary.dropOffLocation : '');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingItinerary) {
      setTourGuideUsername(existingItinerary.tourGuideUsername);
      setActivities(existingItinerary.activities.join(', '));
      setLocations(existingItinerary.locations.join(', '));
      setTimeline(existingItinerary.timeline);
      setDuration(existingItinerary.duration);
      setLanguage(existingItinerary.language);
      setPrice(existingItinerary.price);
      setAvailableDates(existingItinerary.availableDates.join(', '));
      setAccessibility(existingItinerary.accessibility);
      setPickupLocation(existingItinerary.pickupLocation);
      setDropOffLocation(existingItinerary.dropOffLocation);
    }
  }, [existingItinerary]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itinerary = {
      tourGuideUsername,
      activities: activities.split(',').map(activity => activity.trim()),
      locations: locations.split(',').map(location => location.trim()),
      timeline,
      duration: Number(duration),  // Ensure duration is a number
      language,
      price: Number(price),        // Ensure price is a number
      availableDates: availableDates.split(',').map(date => date.trim()),
      accessibility,
      pickupLocation,
      dropOffLocation,
    };

    const method = existingItinerary ? 'PUT' : 'POST';
    const url = existingItinerary ? `/api/itineraryRoute/itinerary/${existingItinerary._id}` : '/api/itineraryRoute/creatingitinerary';

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(itinerary),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'An error occurred while submitting the form.');
      } else {
        setError(null);
        if (onCreated) onCreated(); // Refresh itinerary list if callback is provided
        if (!existingItinerary) {
          // Reset form fields if creating a new itinerary
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
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while submitting the form.");
    }
  };

  const handleDelete = async () => {
    if (!existingItinerary) {
        console.warn("No itinerary selected for deletion.");
        return; 
    }

    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;

    const itineraryId = existingItinerary._id; 
    const url = ` /api/itineraryRoute/itinerary/${itineraryId}` ; 

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(`Sending DELETE request to: ${url}`);
        console.log(`Response Status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json(); // Parse error response
            console.error("Delete error details:", errorData); // Log error details
            setError(errorData.error || 'Failed to delete the itinerary. Please try again.');
            return; // Exit if the response indicates an error
        }

        setError(null);
        if (onDeleted) onDeleted(); // Call the onDeleted prop to refresh the itinerary list
        console.log(`Itinerary with ID ${itineraryId} has been deleted successfully.`);
    } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while deleting the itinerary. Please check your network connection.");
    }
};


  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'} {existingItinerary ? 'Update Itinerary' : 'Create Itinerary'}
      </button>
      {isVisible && (
        <form onSubmit={handleSubmit}>
          <h3>{existingItinerary ? 'Update Itinerary' : 'Create Itinerary'}</h3>
          {error && <div className="error">{error}</div>}

          <label>Tour Guide Username:</label>
          <input type="text" value={tourGuideUsername} onChange={(e) => setTourGuideUsername(e.target.value)} required />

          <label>Activities (comma-separated):</label>
          <textarea value={activities} onChange={(e) => setActivities(e.target.value)} required />

          <label>Locations (comma-separated):</label>
          <textarea value={locations} onChange={(e) => setLocations(e.target.value)} required />

          <label>Timeline:</label>
          <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} required />

          <label>Duration (in hours):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />

          <label>Language:</label>
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />

          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Available Dates (comma-separated):</label>
          <textarea value={availableDates} onChange={(e) => setAvailableDates(e.target.value)} required />

          <label>Accessibility:</label>
          <input type="text" value={accessibility} onChange={(e) => setAccessibility(e.target.value)} required />

          <label>Pickup Location:</label>
          <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required />

          <label>Drop-Off Location:</label>
          <input type="text" value={dropOffLocation} onChange={(e) => setDropOffLocation(e.target.value)} required />

          <button type="submit">{existingItinerary ? 'Update' : 'Create'} Itinerary</button>
          {existingItinerary && (
            <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
              Delete Itinerary
            </button>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default ItineraryForm;
