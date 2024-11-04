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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransportation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!transportation.departureDate) {
      newErrors.departureDate = "Please enter departure date";
    }
    if (!transportation.departureTime) {
      newErrors.departureTime = "Please enter departure time";
    }
    if (!transportation.arrivalDate) {
      newErrors.arrivalDate = "Please enter arrival date";
    }
    if (!transportation.arrivalTime) {
      newErrors.arrivalTime = "Please enter arrival time";
    }
    if (!transportation.departureLocation) {
      newErrors.departureLocation = "Please enter departure location";
    }
    if (!transportation.arrivalLocation) {
      newErrors.arrivalLocation = "Please enter arrival location";
    }
    if (!transportation.price || isNaN(parseFloat(transportation.price))) {
      newErrors.price = "Please enter valid price";
    }
    if (!transportation.vehicleType) {
      newErrors.vehicleType = "Please select vehicle type";
    }
    if (!transportation.seatsAvailable || isNaN(parseInt(transportation.seatsAvailable))) {
      newErrors.seatsAvailable = "Please enter valid number of seats available";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/createTransportation', transportation);
        console.log('Transportation advertisement created:', response.data);
        // Reset form and clear errors
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
        onClose(); // Close the form after successful submission
      } catch (error) {
        console.error('Error creating transportation advertisement:', error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  return isVisible ? (
    <div>
      <h2>Create Transportation Advertisement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={transportation.departureDate}
            onChange={handleChange}
          />
          {errors.departureDate && <span>{errors.departureDate}</span>}
        </div>
        <div>
          <label htmlFor="departureTime">Departure Time:</label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={transportation.departureTime}
            onChange={handleChange}
          />
          {errors.departureTime && <span>{errors.departureTime}</span>}
        </div>
        <div>
          <label htmlFor="arrivalDate">Arrival Date:</label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={transportation.arrivalDate}
            onChange={handleChange}
          />
          {errors.arrivalDate && <span>{errors.arrivalDate}</span>}
        </div>
        <div>
          <label htmlFor="arrivalTime">Arrival Time:</label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            value={transportation.arrivalTime}
            onChange={handleChange}
          />
          {errors.arrivalTime && <span>{errors.arrivalTime}</span>}
        </div>
        <div>
          <label htmlFor="departureLocation">Departure Location:</label>
          <input
            type="text"
            id="departureLocation"
            name="departureLocation"
            value={transportation.departureLocation}
            onChange={handleChange}
          />
          {errors.departureLocation && <span>{errors.departureLocation}</span>}
        </div>
        <div>
          <label htmlFor="arrivalLocation">Arrival Location:</label>
          <input
            type="text"
            id="arrivalLocation"
            name="arrivalLocation"
            value={transportation.arrivalLocation}
            onChange={handleChange}
          />
          {errors.arrivalLocation && <span>{errors.arrivalLocation}</span>}
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={transportation.price}
            onChange={handleChange}
          />
          {errors.price && <span>{errors.price}</span>}
        </div>
        <div>
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={transportation.vehicleType}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Taxi">Taxi</option>
            <option value="Flight">Flight</option>
          </select>
          {errors.vehicleType && <span>{errors.vehicleType}</span>}
        </div>
        <div>
          <label htmlFor="seatsAvailable">Seats Available:</label>
          <input
            type="number"
            id="seatsAvailable"
            name="seatsAvailable"
            value={transportation.seatsAvailable}
            onChange={handleChange}
          />
          {errors.seatsAvailable && <span>{errors.seatsAvailable}</span>}
        </div>
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

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/AdvertiserRoute');
      const json = await response.json();

      if (response.ok) {
        setAdvertiser(json);
      }
    };

    fetchWorkouts();
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

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleClick2 = () => {
    setIsVisible2(!isVisible2);
  };

  const handleUpdate = (tourguide) => {
    setSelectedTourguide(tourguide);
  };

  const handleUpdate2 = (tourguide) => {
    setSelectedActivity(tourguide);
  };

  const handleTransportButtonClick = () => {
    setIsTransportFormVisible(!isTransportFormVisible);
  };

  return (
    <div className="container">
      <h2>Advertiser Dashboard</h2>
      <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'} Advertiser Details
      </button>
      {isVisible && (
        <div className="workouts">
          {advertiser && advertiser.map((advertiser) => (
            <div key={advertiser._id}>
              <AdvertiserDetails advertiser={advertiser} />
              <button onClick={() => handleUpdate(advertiser)}>Update</button>
            </div>
          ))}
        </div>
      )}
      <UpdateAdvertiser existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
      <AdvertiserForm />
      <button onClick={handleClick2}>
        {isVisible2 ? 'Hide' : 'Show'} Activities
      </button>
      {isVisible2 && (
        <div className="workouts">
          {activity && activity.map((activity) => (
            <div key={activity._id}>
              <ActivityDetails activity={activity} />
              <button onClick={() => handleUpdate2(activity)}>Update</button>
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
