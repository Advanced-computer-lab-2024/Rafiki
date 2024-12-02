import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import AdvertiserDetails from "../components/AdvertiserDetails";
import ActivityDetails from "../components/ActivityDetails";
import ActivityForm from "../components/activityForm";
import UpdateAdvertiser from "../components/updateAdvertiser";
import DeleteActivity from "../components/DeleteActivity";
import UpdateActivity from "../components/UpdateActivity";
import ChangePasswordForm from "../components/ChangePasswordForm";
import TermsPopup from "../components/TermsPopup";

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
    seatsAvailable: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransportation({ ...transportation, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = [
      "departureDate",
      "departureTime",
      "arrivalDate",
      "arrivalTime",
      "departureLocation",
      "arrivalLocation",
      "price",
      "vehicleType",
      "seatsAvailable",
    ];
    const newErrors = requiredFields.reduce((acc, field) => {
      if (!transportation[field]) acc[field] = "This field is required";
      return acc;
    }, {});
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("/api/transportationRoute/create", transportation);
        if (response.status === 200) {
          setSuccessMessage("Transportation advertisement created successfully!");
          setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
          onClose();
        } else {
          console.error("Error:", response.data);
        }
      } catch (error) {
        console.error("Error creating transportation ad:", error.response?.data || error.message);
      }
    }
  };

  return isVisible ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create Transportation Ad</h2>
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Departure Date", type: "date", name: "departureDate" },
            { label: "Departure Time", type: "time", name: "departureTime" },
            { label: "Arrival Date", type: "date", name: "arrivalDate" },
            { label: "Arrival Time", type: "time", name: "arrivalTime" },
            { label: "Departure Location", type: "text", name: "departureLocation" },
            { label: "Arrival Location", type: "text", name: "arrivalLocation" },
            { label: "Price", type: "number", name: "price" },
            { label: "Vehicle Type", type: "text", name: "vehicleType" },
            { label: "Seats Available", type: "number", name: "seatsAvailable" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={transportation[field.name] || ""}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
            </div>
          ))}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Ad
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

const AdvertiserSignup = ({ loggedInAdvertiser }) => {
  const [advertiser, setAdvertiser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [isVisible2, setIsVisible2] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeContent, setActiveContent] = useState("description"); // Default to welcome message

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvertisers = async () => {
      const response = await fetch("/api/AdvertiserRoute");
      const json = await response.json();
      if (response.ok) setAdvertiser(json);
    };
    fetchAdvertisers();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch("/api/ActivityRoute");
      const json = await response.json();
      if (response.ok) setActivity(json);
    };
    fetchActivities();
  }, []);

  const handleDeleteAccount = async () => {
    const username = prompt("Please enter your username:");
    if (!username) return; // Exit if no username is entered
  
    const password = prompt("Please enter your password:");
    if (!password) return; // Exit if no password is entered
  
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (!confirmation) return; // Exit if user cancels
  
    try {
      const response = await axios.delete(`/api/AdvertiserRoute/deleteAccount/${advertiser._id}`, {
        data: { username, password }, // Send username and password in the request body
      });
  
      if (response.status === 200) {
        alert("Account deleted successfully. You will now be redirected to the homepage.");
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`); // Show specific error from the server
      } else {
        alert("An error occurred while trying to delete the account. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Sidebar Menu */}
      <div className="w-1/4 bg-gray-800 text-white p-6 h-full">
        <h3 className="text-xl font-bold mb-4">Advertiser Dashboard</h3>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveContent("details")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Advertiser Details
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
              onClick={() => setActiveContent("createActivity")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Create Activity
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("updateActivity")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Update Activity
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("createTransportation")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Create Transportation Ad
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
          <li>
            <button
              onClick={handleDeleteAccount}
              className="text-lg text-red-500 hover:text-red-700"
            >
              Delete Account
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {activeContent === "description" && (
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Welcome to the Advertiser Dashboard
            </h3>
            <p className="text-lg text-gray-600">
              Manage your details, activities, advertisements, and account settings. Choose an
              option from the menu to get started.
            </p>
          </div>
        )}

        {activeContent === "details" && (
          <AdvertiserDetails advertiser={loggedInAdvertiser} />
        )}

        {activeContent === "activities" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Activities</h3>
            {activity &&
              activity.map((act) => (
                <ActivityDetails key={act._id} activity={act} />
              ))}
          </div>
        )}

        {activeContent === "createActivity" && <ActivityForm />}
        {activeContent === "updateActivity" && (
          <UpdateActivity
            existingTourguide={selectedActivity}
            onUpdate={() => setSelectedActivity(null)}
          />
        )}

        {activeContent === "createTransportation" && (
          <CreateTransportationAd
            isVisible={true}
            onClose={() => setActiveContent("description")}
          />
        )}

        {activeContent === "changePassword" && <AdvChangePassword />}
      </div>
    </div>
  );
};

export default AdvertiserSignup;
