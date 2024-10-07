import { useEffect, useState } from "react";
import ItineraryDetails from "../components/itineraryDetails"; // Ensure the path is correct
import ActivityDetails from "../components/ActivityDetails"; // Ensure the path is correct
import TouristForm from "../components/touristForm";
import TouristDetails from "../components/TouristDetails";

// components

const TouristSignup = () => {
    const [tourists, setTourists] = useState(null);
    const [itineraries, setItineraries] = useState(null); // Renamed for clarity
    const [activities, setActivities] = useState(null); // Renamed for clarity
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);

    // Fetch tourists
    useEffect(() => {
        const fetchTourists = async () => {
            const response = await fetch('/api/TouristRoute');
            const json = await response.json();

            if (response.ok) {
                setTourists(json);
            }
        };

        fetchTourists();
    }, []);

    // Fetch activities
    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('/api/ActivityRoute');
            const json = await response.json();

            if (response.ok) {
                setActivities(json);
            }
        };

        fetchActivities();
    }, []);

    // Fetch itineraries
    useEffect(() => {
        const fetchItineraries = async () => {
            const response = await fetch('/api/itineraryRoute');
            const json = await response.json();

            if (response.ok) {
                setItineraries(json);
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
    
    const handleClick3 = () => {
        setIsVisible3(!isVisible3);
    };

    return (
        <div>
            <h2>Tourist Dashboard</h2>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} Tourist Details
            </button>
            <button onClick={handleClick2}>
                {isVisible2 ? 'Hide' : 'View'} Itineraries
            </button>
            <button onClick={handleClick3}>
                {isVisible3 ? 'Hide' : 'View'} Activities
            </button>

            {/* Tourist Details */}
            {isVisible && (
                <div className="workouts">
                    {tourists && tourists.map(tourist => (
                        <TouristDetails tourist={tourist} key={tourist._id} />
                    ))}
                </div>
            )}

            {/* Itineraries */}
            {isVisible2 && (
                <div className="itineraries">
                    {itineraries && itineraries.map(itinerary => (
                        <ItineraryDetails itinerary={itinerary} key={itinerary._id} />
                    ))}
                </div>
            )}

            {/* Activities */}
            {isVisible3 && (
                <div className="activities">
                    {activities && activities.map(activity => (
                        <ActivityDetails activity={activity} key={activity._id} />
                    ))}
                </div>
            )}

            {/* Tourist Signup Form */}
            <TouristForm />
        </div>
    );
}

export default TouristSignup;
