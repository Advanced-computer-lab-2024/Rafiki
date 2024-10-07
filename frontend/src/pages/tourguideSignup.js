import { useState, useEffect } from "react";
import TourguideForm from "../components/tourguideForm";
import TourguideDetails from "../components/tourguideDetails";
import ItineraryDetails from "../components/itineraryDetails";
import ItineraryForm from "../components/itineraryForm";
import ActivityDetails from "../components/ActivityDetails"; 

const TourguideSignup = () => {
    const [tourguide, setTourguide] = useState(null);
    const [selectedTourguide, setSelectedTourguide] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [itinerary, setItinerary] = useState(null);
    const [isVisible2, setIsVisible2] = useState(false);
    const [activity, setActivity] = useState(null)
    const [isVisible3, setIsVisible3] = useState(false)
    useEffect(() => {
        const fetchTourguides = async () => {
            const response = await fetch('/api/tourguideRoute');
            const json = await response.json();

            if (response.ok) {
                setTourguide(json);
            }
        };

        fetchTourguides();
    }, []);

    useEffect(() => {
        const fetchItineraries = async () => {
            const response = await fetch('/api/itineraryRoute');
            const json = await response.json();

            if (response.ok) {
                setItinerary(json);
            }
        };

        fetchItineraries();
    }, []);
    useEffect(() => {
        const fetchActivities = async () => {
          const response = await fetch('/api/ActivityRoute')
          const json = await response.json()
    
          if (response.ok) {
            setActivity(json)
          }
        }
    
        fetchActivities()
      }, [])
    
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClick2 = () => {
        setIsVisible2(!isVisible2);
    };

    const handleClick3 = () => {
        setIsVisible3(!isVisible3);
      };

    const handleUpdate = (tourguide) => {
        setSelectedTourguide(tourguide);
    };

    return (
        <div>
            <h2>Tourguide Dashboard</h2>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} Tourguide Details
            </button>

            <button onClick={handleClick2}>
                {isVisible2 ? 'Hide' : 'Show'} Itinerary Details
            </button>

            {isVisible && (
                <div className="workouts">
                    {tourguide && tourguide.map(tourguide => (
                        <div key={tourguide._id}>
                            <TourguideDetails tourguide={tourguide} />
                            <button onClick={() => handleUpdate(tourguide)}>Update</button>
                        </div>
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

            {/* Show the form with pre-filled data for updating or empty for creating a new tour guide */}
            <TourguideForm existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
            <button onClick={handleClick3}>
        {isVisible3 ? 'Hide' : 'Show'}  Activities
      </button>

      {isVisible3 && (
    <div className="workouts">
        {activity && activity.map(activity => (
          <ActivityDetails activity={activity} key={activity._id} />
        ))}
      </div>
      )}
            <ItineraryForm />
        </div>
    );
}

export default TourguideSignup;
