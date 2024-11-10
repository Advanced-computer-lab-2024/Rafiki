import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the ID from the URL
import ItineraryDetails from "../components/itineraryDetails";

const ItineraryDetailsPage = () => {
  const { itineraryId } = useParams(); // Extracts the ID from the URL
  const [itinerary, setItineraries] = useState(null);

  useEffect(() => {
    if (itineraryId) {
      // Update the fetch URL to match your route structure
      fetch(`http://localhost:3000/api/itineraryRoute/itinerary/${itineraryId}`) // Replace with your server's port
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => setItineraries(data))
        .catch((error) => console.error("Failed to fetch data:", error));
    }
  }, [itineraryId]);

  return (
    <div>
      {itinerary ? (
        <ItineraryDetails itinerary={itinerary} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItineraryDetailsPage;
