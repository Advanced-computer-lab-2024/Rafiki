import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa"; // Import icons

// Components
import AdvertiserDetails from "../components/AdvertiserDetails";
import ActivityDetails from "../components/ActivityDetails";
import ActivityForm from "../components/activityForm";
import UpdateActivity from "../components/UpdateActivity";
import ChangePasswordForm from "../components/ChangePasswordForm";
import SalesReport from "../components/SalesReport";

const AdvChangePassword = () => (
  <ChangePasswordForm apiEndpoint="/api/AdvertiserRoute/changePassword" />
);

const AdvertiserSignup = ({ loggedInAdvertiser }) => {
  const [showRevenue, setShowRevenue] = useState(true); // Default to showing revenue
  const [advertiser, setAdvertiser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [subMenu, setSubMenu] = useState(""); // Initialize subMenu state
  const [activeContent, setActiveContent] = useState("revenue"); // Default to revenue report
  const [AdvertiserUsername, setAdvertiserUsername] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Fetch advertiser username from props or localStorage
  useEffect(() => {
    if (loggedInAdvertiser && loggedInAdvertiser.Username) {
      setAdvertiserUsername(loggedInAdvertiser.Username); // Use prop if available
    } else {
      const username = localStorage.getItem("AdvertiserUsername"); // Retrieve from local storage
      if (username) {
        setAdvertiserUsername(username);
      } else {
        console.warn("Advertiser username not found in local storage or props.");
        setAdvertiserUsername("Advertiser"); // Fallback value
      }
    }
  }, [loggedInAdvertiser]);

  // Fetch advertiser data
  useEffect(() => {
    const fetchAdvertiser = async () => {
      try {
        const response = await axios.get("/api/AdvertiserRoute");
        if (response.status === 200) {
          setAdvertiser(response.data);
        }
      } catch (error) {
        console.error("Error fetching advertiser data:", error);
      }
    };
    fetchAdvertiser();
  }, []);

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/ActivityRoute");
        if (response.status === 200) {
          setActivity(response.data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications"); // Adjust the endpoint
      if (response.status === 200) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Toggle notification dropdown
  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown((prev) => !prev);
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    const username = prompt("Please enter your username:");
    if (!username) return; // Exit if no username is entered

    const password = prompt("Please enter your password:");
    if (!password) return; // Exit if no password is entered

    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (!confirmation) return; // Exit if user cancels

    try {
      const response = await axios.delete(`/api/AdvertiserRoute/deleteAccount/${advertiser._id}`, {
        data: { username, password },
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
        <h3 className="text-xl font-bold mb-4">Hi, {AdvertiserUsername}</h3>
        <h3 className="text-xl font-bold mb-4">Advertiser Dashboard</h3>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveContent("details")}
              className="text-lg text-blue-400 hover:text-white"
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveContent("activities");
                setSubMenu("");
              }}
              className="text-lg text-blue-400 hover:text-white"
            >
              My Activities
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
              onClick={() => setShowRevenue(!showRevenue)}
              className="text-lg text-blue-400 hover:text-white"
            >
              {showRevenue ? "Hide Revenue" : "Revenue Report"}
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
      <div className="w-3/4 p-6 relative">
        {/* Icons */}
        <div className="absolute top-4 right-6 flex items-center space-x-4">
          {/* Notification Icon */}
          <button
            onClick={toggleNotificationDropdown}
            className="text-gray-700 hover:text-blue-700"
          >
            <FaBell className="w-6 h-6" />
          </button>
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
              <h4 className="font-bold text-gray-800">Notifications</h4>
              <ul className="mt-2 space-y-2">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} className="text-gray-700">
                      {notification.message}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No notifications</li>
                )}
              </ul>
            </div>
          )}

          {/* Profile Icon */}
          <button
            onClick={() => setActiveContent("details")}
            className="text-gray-700 hover:text-blue-700"
          >
            <FaUserCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Content */}
        {activeContent === "revenue" || showRevenue ? <SalesReport /> : null}
        {activeContent === "details" && (
          <AdvertiserDetails advertiser={loggedInAdvertiser} />
        )}
        {activeContent === "activities" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">My Activities</h3>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSubMenu("show")}
                className={`text-lg px-4 py-2 rounded-md ${
                  subMenu === "show" ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                Show Activities
              </button>
              <button
                onClick={() => setSubMenu("create")}
                className={`text-lg px-4 py-2 rounded-md ${
                  subMenu === "create" ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                Create Activity
              </button>
              <button
                onClick={() => setSubMenu("update")}
                className={`text-lg px-4 py-2 rounded-md ${
                  subMenu === "update" ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                Update Activity
              </button>
            </div>
            {subMenu === "show" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Activities</h3>
                {activity &&
                  activity.map((act) => (
                    <ActivityDetails key={act._id} activity={act} />
                  ))}
              </div>
            )}
            {subMenu === "create" && <ActivityForm />}
            {subMenu === "update" && (
              <UpdateActivity
                existingTourguide={activity}
                onUpdate={() => setSubMenu("show")}
              />
            )}
          </div>
        )}
        {activeContent === "changePassword" && <AdvChangePassword />}
      </div>
    </div>
  );
};

export default AdvertiserSignup;
