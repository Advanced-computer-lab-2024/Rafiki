import { useState, useEffect } from "react";

const ItineraryForm = ({ existingItinerary, onCreated, onDeleted }) => {
  const [tourGuideUsername, setTourGuideUsername] = useState(existingItinerary?.tourGuideUsername || "");
  const [activities, setActivities] = useState(existingItinerary?.activities?.join(", ") || "");
  const [locations, setLocations] = useState(existingItinerary?.locations?.join(", ") || "");
  const [timeline, setTimeline] = useState(existingItinerary?.timeline || "");
  const [duration, setDuration] = useState(existingItinerary?.duration || "");
  const [language, setLanguage] = useState(existingItinerary?.language || "");
  const [price, setPrice] = useState(existingItinerary?.price || "");
  const [availableDates, setAvailableDates] = useState(existingItinerary?.availableDates?.join(", ") || "");
  const [accessibility, setAccessibility] = useState(existingItinerary?.accessibility || "");
  const [pickupLocation, setPickupLocation] = useState(existingItinerary?.pickupLocation || "");
  const [dropOffLocation, setDropOffLocation] = useState(existingItinerary?.dropOffLocation || "");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingItinerary) {
      setTourGuideUsername(existingItinerary.tourGuideUsername);
      setActivities(existingItinerary.activities?.join(", "));
      setLocations(existingItinerary.locations?.join(", "));
      setTimeline(existingItinerary.timeline);
      setDuration(existingItinerary.duration);
      setLanguage(existingItinerary.language);
      setPrice(existingItinerary.price);
      setAvailableDates(existingItinerary.availableDates?.join(", "));
      setAccessibility(existingItinerary.accessibility);
      setPickupLocation(existingItinerary.pickupLocation);
      setDropOffLocation(existingItinerary.dropOffLocation);
    }
  }, [existingItinerary]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itinerary = {
      tourGuideUsername,
      activities: activities.split(",").map((activity) => activity.trim()),
      locations: locations.split(",").map((location) => location.trim()),
      timeline,
      duration: Number(duration),
      language,
      price: Number(price),
      availableDates: availableDates.split(",").map((date) => date.trim()),
      accessibility,
      pickupLocation,
      dropOffLocation,
    };

    const method = existingItinerary ? "PUT" : "POST";
    const url = existingItinerary
      ? `/api/itineraryRoute/itinerary/${existingItinerary._id}`
      : "/api/itineraryRoute/creatingitinerary";

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(itinerary),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "An error occurred while submitting the form.");
      } else {
        setError(null);
        if (onCreated) onCreated();

        if (!existingItinerary) {
          setTourGuideUsername("");
          setActivities("");
          setLocations("");
          setTimeline("");
          setDuration("");
          setLanguage("");
          setPrice("");
          setAvailableDates("");
          setAccessibility("");
          setPickupLocation("");
          setDropOffLocation("");
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while submitting the form.");
    }
  };

  const handleDelete = async () => {
    if (!existingItinerary) return;
    if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

    try {
      const response = await fetch(`/api/itineraryRoute/itinerary/${existingItinerary._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete the itinerary. Please try again.");
        return;
      }

      setError(null);
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while deleting the itinerary.");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <button
        onClick={toggleVisibility}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        {isVisible ? "Hide" : "Show"} {existingItinerary ? "Update Itinerary" : "Create Itinerary"}
      </button>

      {isVisible && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {existingItinerary ? "Update Itinerary" : "Create Itinerary"}
          </h3>
          {error && <div className="bg-red-100 text-red-600 p-2 rounded-md">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tour Guide Username:</label>
              <input
                type="text"
                value={tourGuideUsername}
                onChange={(e) => setTourGuideUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Timeline:</label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (hours):</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Language:</label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Accessibility:</label>
              <input
                type="text"
                value={accessibility}
                onChange={(e) => setAccessibility(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activities (comma-separated):</label>
            <textarea
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Locations (comma-separated):</label>
            <textarea
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Available Dates (comma-separated):</label>
            <textarea
              value={availableDates}
              onChange={(e) => setAvailableDates(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pickup Location:</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Drop-Off Location:</label>
            <input
              type="text"
              value={dropOffLocation}
              onChange={(e) => setDropOffLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
            >
              {existingItinerary ? "Update" : "Create"} Itinerary
            </button>
            {existingItinerary && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
              >
                Delete Itinerary
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ItineraryForm;
