import { useEffect, useState } from "react";
import axios from "axios";

// components
import AdvertiserForm from "../components/advertiserForm";
import AdvertiserDetails from "../components/AdvertiserDetails";
import ActivityDetails from "../components/ActivityDetails";
import ActivityForm from "../components/activityForm";
import UpdateAdvertiser from "../components/updateAdvertiser";
import DeleteActivity from "../components/DeleteActivity";
import UpdateActivity from "../components/UpdateActivity";
import ChangePasswordForm from '../components/ChangePasswordForm';

const AdvChangePassword = () => (
  <ChangePasswordForm apiEndpoint="/api/AdvertiserRoute/changePassword" />
);

const CreateTransportationAd = ({ isVisible, onClose }) => {
  const [transportation, setTransportation] = useState({
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    departureLocation: "",
    arrivalLocation: "",
    price: "",
    vehicleType: "",
    seatsAvailable: ""
  });

  const [errors, setErrors] = useState({}); // Only use if needed

  const handleChange = (e) => { // Only use if needed
    const { name, value } = e.target;
    setTransportation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!transportation.departureDate) newErrors.departureDate = "Please enter departure date";
    if (!transportation.departureTime) newErrors.departureTime = "Please enter departure time";
    if (!transportation.arrivalDate) newErrors.arrivalDate = "Please enter arrival date";
    if (!transportation.arrivalTime) newErrors.arrivalTime = "Please enter arrival time";
    if (!transportation.departureLocation) newErrors.departureLocation = "Please enter departure location";
    if (!transportation.arrivalLocation) newErrors.arrivalLocation = "Please enter arrival location";
    if (!transportation.price || isNaN(parseFloat(transportation.price))) newErrors.price = "Please enter valid price";
    if (!transportation.vehicleType) newErrors.vehicleType = "Please select vehicle type";
    if (!transportation.seatsAvailable || isNaN(parseInt(transportation.seatsAvailable))) newErrors.seatsAvailable = "Please enter valid number of seats available";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/createTransportation', transportation);
        console.log('Transportation advertisement created:', response.data);
        setTransportation({
          departureDate: "",
          departureTime: "",
          arrivalDate: "",
          arrivalTime: "",
          departureLocation: "",
          arrivalLocation: "",
          price: "",
          vehicleType: "",
          seatsAvailable: ""
        });
        setErrors({});
        onClose();
      } catch (error) {
        console.error('Error creating transportation advertisement:', error);
      }
    }
  };

  return isVisible ? (
    <div>
      <h2>Create Transportation Advertisement</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for transportation details */}
        <button type="submit">Create Transportation Advertisement</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  ) : null;
};

const AdvertiserSignup = () => {
  const [advertiser, setAdvertiser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activity, setActivity] = useState(null);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isTransportFormVisible, setIsTransportFormVisible] = useState(false);
  const [selectedTourguide, setSelectedTourguide] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchAdvertisers = async () => {
      const response = await fetch('/api/AdvertiserRoute');
      const json = await response.json();

      if (response.ok) {
        setAdvertiser(json);
      }
    };

    fetchAdvertisers();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/ActivityRoute');
      const json = await response.json();

      if (response.ok) {
        setActivity(json);
      }
    };

    fetchActivities();
  }, []);

  const handleTermsChange = (e) => {
    setIsTermsAccepted(e.target.checked);
  };

  const handleDeleteAccount = async () => {
    if (!isTermsAccepted) {
      setError("You must accept the terms and conditions to delete your account.");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (!confirmation) return;

    try {
      const response = await axios.delete(`/api/AdvertiserRoute/deleteAccount/${advertiser._id}`);
      if (response.status === 200) {
        setSuccessMessage("Account deleted successfully.");
        setAdvertiser(null); // Clear advertiser data after deletion
      } else {
        setError("Account cannot be deleted due to upcoming paid bookings.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("An error occurred while deleting the account.");
    }
  };

  // Define the missing function `handleTransportButtonClick`
  const handleTransportButtonClick = () => {
    setIsTransportFormVisible(!isTransportFormVisible);
  };

  return (
    <div className="container">
      <h2>Advertiser Dashboard</h2>

      

      {/* Delete Account Button */}
      <button
        onClick={handleDeleteAccount}
        style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
      >
        Delete Account
      </button>

      {/* Display error or success messages */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Advertiser Details
      </button>
      {isVisible && (
        <div className="workouts">
          {advertiser && advertiser.map((advertiser) => (
            <div key={advertiser._id}>
              <AdvertiserDetails advertiser={advertiser} />
              <button onClick={() => setSelectedTourguide(advertiser)}>Update</button>
            </div>
          ))}
        </div>
      )}

      {/* Other components and form toggles */}
      <UpdateAdvertiser existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
      <AdvertiserForm />
      <button onClick={() => setIsVisible2(!isVisible2)}>
        {isVisible2 ? 'Hide' : 'Show'} Activities
      </button>
      {isVisible2 && (
        <div className="workouts">
          {activity && activity.map((activity) => (
            <div key={activity._id}>
              <ActivityDetails activity={activity} />
              <button onClick={() => setSelectedActivity(activity)}>Update</button>
            </div>
          ))}
        </div>
      )}
      <UpdateActivity existingTourguide={selectedActivity} onUpdate={() => setSelectedActivity(null)} />
      <ActivityForm />
      <DeleteActivity />
      <button onClick={handleTransportButtonClick}>
        {isTransportFormVisible ? 'Hide' : 'Show'} Create Transportation Advertisement
      </button>
      <CreateTransportationAd isVisible={isTransportFormVisible} onClose={() => setIsTransportFormVisible(false)} />
      <AdvChangePassword />
    </div>
  );
};

export default AdvertiserSignup;
