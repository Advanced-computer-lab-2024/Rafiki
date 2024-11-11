import { useState, useEffect } from "react";
import TourguideForm from "../components/tourguideForm";
import TourguideDetails from "../components/tourguideDetails";
import ItineraryDetails from "../components/itineraryDetails";
import ItineraryForm from "../components/itineraryForm";
import ActivityDetails from "../components/ActivityDetails";
import CreateTourguide from "../components/createTourguide";
import ChangePasswordForm from '../components/ChangePasswordForm';
import { useNavigate } from 'react-router-dom';
import TermsPopup from '../components/TermsPopup'
const TourguideSignup = () => {
  const [tourguides, setTourguides] = useState(null);
  const [selectedTourguide, setSelectedTourguide] = useState(null);
  const [itineraries, setItineraries] = useState(null);
  const [activities, setActivities] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    tourguides: false,
    itineraries: false,
    activities: false
  });
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const AdminChangePassword = () => (
    <ChangePasswordForm apiEndpoint="/api/tourguideRoute/changePassword" />
);

const [showPopup, setShowPopup] = useState(true); // Show the popup initially
const navigate = useNavigate();

const handleAccept = () => {
  setShowPopup(false); // Hide the popup when terms are accepted
};
  useEffect(() => {
    const fetchTourguides = async () => {
      const response = await fetch('/api/tourguideRoute');
      const json = await response.json();
      if (response.ok) setTourguides(json);
    };
    fetchTourguides();
  }, []);

  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch('/api/itineraryRoute');
      const json = await response.json();
      if (response.ok) setItineraries(json);
    };
    fetchItineraries();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/ActivityRoute');
      const json = await response.json();
      if (response.ok) setActivities(json);
    };
    fetchActivities();
  }, []);

  const toggleVisibility = (section) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTourguideUpdate = (tourguide) => {
    setSelectedTourguide(tourguide);
  };

  const handleItineraryUpdate = (itinerary) => {
    setSelectedItinerary(itinerary);
  };

  const handleItineraryDelete = (deletedItinerary) => {
    if (itineraries) {
      setItineraries(prev => prev.filter(itinerary => itinerary._id !== deletedItinerary._id));
    }
  };

  
  const handleItineraryCreated = () => {
    setSelectedItinerary(null);
  };

  return (
    <div>

      <h2>Tourguide Dashboard</h2>

      {showPopup ? (
        <TermsPopup onAccept={handleAccept} />
      ) : (
        <div>
          
          <p>You have accepted the terms and conditions.</p>
        </div>
      )}

      {/* Toggle Buttons */}
      <button onClick={() => toggleVisibility('tourguides')}>
        {visibleSections.tourguides ? 'Hide' : 'Show'} Tourguide Details
      </button>
      <button onClick={() => toggleVisibility('itineraries')}>
        {visibleSections.itineraries ? 'Hide' : 'Show'} Itinerary Details
      </button>
      <button onClick={() => toggleVisibility('activities')}>
        {visibleSections.activities ? 'Hide' : 'Show'} Activities
      </button>

      {/* Tourguides Section */}
      {visibleSections.tourguides && (
        <div className="tourguides">
          {tourguides && tourguides.map(tourguide => (
            <div key={tourguide._id}>
              <TourguideDetails tourguide={tourguide} />
              <button onClick={() => handleTourguideUpdate(tourguide)}>Update</button>
            </div>
          ))}
        </div>
      )}

      {/* Itineraries Section */}
      {visibleSections.itineraries && (
        <div className="itineraries">
          {itineraries && itineraries.map(itinerary => (
            <div key={itinerary._id}>
              <ItineraryDetails itinerary={itinerary} />
              <button onClick={() => handleItineraryUpdate(itinerary)}>Update</button>
            </div>
          ))}
        </div>
      )}

      {/* Activities Section */}
      {visibleSections.activities && (
        <div className="activities">
          {activities && activities.map(activity => (
            <ActivityDetails activity={activity} key={activity._id} />
          ))}
        </div>
      )}

      {/* Forms */}
      
      
      <ItineraryForm 
        existingItinerary={selectedItinerary} 
        onCreated={handleItineraryCreated} 
        onDeleted={handleItineraryDelete} 
      />
      
      <CreateTourguide />
<br></br>
      <AdminChangePassword/>
    </div>
  );
};

export default TourguideSignup;
