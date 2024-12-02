import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TourguideDetails from "../components/tourguideDetails";
import ItineraryDetails from "../components/itineraryDetails";
import ItineraryForm from "../components/itineraryForm";
import ActivityDetails from "../components/ActivityDetails";
import ChangePasswordForm from "../components/ChangePasswordForm";
import TermsPopup from "../components/TermsPopup";

const TourguideSignup = () => {
  const [tourguide, setTourguide] = useState(null); // Store a single tour guide
  const [itineraries, setItineraries] = useState(null);
  const [activities, setActivities] = useState(null);
  const [activeContent, setActiveContent] = useState("description"); // Default to description
  const [showPopup, setShowPopup] = useState(true); // Show terms popup initially
  const navigate = useNavigate();

  const username = localStorage.getItem("username"); // Get the logged-in username

  useEffect(() => {
    const fetchTourguide = async () => {
      try {
        const response = await axios.get(`/api/tourguideRoute?username=${username}`);
        if (response.status === 200) setTourguide(response.data);
      } catch (err) {
        console.error("Error fetching tour guide details:", err);
      }
    };

    const fetchItineraries = async () => {
      const response = await fetch("/api/itineraryRoute");
      const json = await response.json();
      if (response.ok) setItineraries(json);
    };

    const fetchActivities = async () => {
      const response = await fetch("/api/ActivityRoute");
      const json = await response.json();
      if (response.ok) setActivities(json);
    };

    fetchTourguide();
    fetchItineraries();
    fetchActivities();
  }, [username]);

  const handleAccept = async () => {
    try {
      await axios.post("/api/tourguideRoute/accept-terms", { username });
      setShowPopup(false); // Hide popup
    } catch (error) {
      console.error("Error accepting terms:", error);
      alert("Failed to accept terms. Please try again.");
    }
  };

  const AdminChangePassword = () => (
    <ChangePasswordForm apiEndpoint="/api/tourguideRoute/changePassword" />
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <div className="w-1/4 bg-gray-800 text-white p-6 h-full">
        <h3 className="text-xl font-bold mb-4">Tour Guide Dashboard</h3>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveContent("tourguides")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Tourguide Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("itineraries")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Itineraries
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("activities")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Activities
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("addItinerary")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Add New Itinerary
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("changePassword")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Change Password
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Default Description */}
        {activeContent === "description" && (
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Welcome to the Tour Guide Dashboard
            </h3>
            <p className="text-lg text-gray-600">
              Manage your details, itineraries, activities, and account settings.
              Choose an option from the menu to get started.
            </p>
          </div>
        )}

        {/* Tourguide Section */}
        {activeContent === "tourguides" && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Tourguide Details
            </h3>
            {tourguide ? (
              <TourguideDetails tourguide={tourguide} />
            ) : (
              <p className="text-gray-500">No tour guide details available.</p>
            )}
          </div>
        )}

        {/* Itineraries Section */}
        {activeContent === "itineraries" && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Itinerary Details
            </h3>
            {itineraries ? (
              itineraries.map((itinerary) => (
                <ItineraryDetails key={itinerary._id} itinerary={itinerary} />
              ))
            ) : (
              <p className="text-gray-500">No itineraries available.</p>
            )}
          </div>
        )}

        {/* Activities Section */}
        {activeContent === "activities" && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Activities</h3>
            {activities ? (
              activities.map((activity) => (
                <ActivityDetails key={activity._id} activity={activity} />
              ))
            ) : (
              <p className="text-gray-500">No activities available.</p>
            )}
          </div>
        )}

        {/* Add Itinerary Section */}
        {activeContent === "addItinerary" && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Add New Itinerary
            </h3>
            <ItineraryForm />
          </div>
        )}

        {/* Change Password Section */}
        {activeContent === "changePassword" && (
          <div className="section-card p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Change Password
            </h3>
            <AdminChangePassword />
          </div>
        )}
      </div>

      {/* Terms Popup */}
      {showPopup && <TermsPopup onAccept={handleAccept} />}
    </div>
  );
};

export default TourguideSignup;
