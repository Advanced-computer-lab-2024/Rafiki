import { useState, useEffect } from "react";
import TourguideForm from "../components/tourguideForm";
import TourguideDetails from "../components/tourguideDetails";
import ItineraryDetails from "../components/itineraryDetails";
import  ItineraryForm from "../components/itineraryForm";



const TourguideSignup = () => {
  const [tourguide, setTourguide] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [isVisible2, setIsVisible2] = useState(false);
  useEffect(() => {
    const fetchTourguides = async () => {
      const response = await fetch('/api/tourguideRoute');
      const json = await response.json();
      
      console.log(json); // Check the fetched data

      if (response.ok) {
        setTourguide(json); // Corrected from setAdvertiser to setTourguide
      }
    };

    fetchTourguides();
  }, []);
  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch('/api/itineraryRoute');
      const json = await response.json();
      
      console.log(json); // Check the fetched data

      if (response.ok) {
        setItinerary(json); // Corrected from setAdvertiser to setTourguide
      }
    };

    fetchItineraries();
  }, []);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const handleClick2 = () => {
    setIsVisible2(!isVisible2);
  };
  return (
    <div>
      <h2>Tourguide Dashboard</h2>
      <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'} Tourguide Details
      </button>
     
      <button onClick={handleClick2}>
        {isVisible2? 'Hide' : 'Show'} Itinerary Details
      </button>

      {isVisible && (
        <div className="workouts">
          {tourguide && tourguide.map(tourguide => (
            <TourguideDetails tourguide={tourguide} key={tourguide._id} />
          ))}
        </div>
      )}

{isVisible2 && (
      <div className="workouts">
          {itinerary && itinerary.map(itinerary => (
            <ItineraryDetails itinerary={itinerary} key={itinerary._id} />
          ))}
        </div>
)}
      
      <TourguideForm />
      <ItineraryForm/>
    </div>
  );
}

export default TourguideSignup;