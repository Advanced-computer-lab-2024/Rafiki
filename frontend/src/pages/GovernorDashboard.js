//gevernordashboard 
import { useEffect, useState } from "react";
import MuseumForm from '../components/museumForm';
import MuseumDetails from '../components/museumDetails';
import TagForm from '../components/TagForm';
import ActivityDetails from "../components/ActivityDetails"; 
import ChangePasswordForm from '../components/ChangePasswordForm';
import backgroundImage from '../pics/pic9.jpeg';

const TourismGovernorDashboard = () => {
  const [museums, setMuseums] = useState('');
  const [activity, setActivity] = useState(null);
  const [isSellerVisible, setIsSellerVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeContent, setActiveContent] = useState('description');
  const [sellerUsername, setSellerUsername] = useState('');

  const fetchMuseumData = async () => {
    try {
      const response = await fetch('/api/museumRoute');
      const json = await response.json();

      
      if (response.ok) {
        setMuseums(json);
      } else {
        console.error('Error fetching museum:', json);
      }
    } catch (err) {
      console.error('Error fetching museum data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("govUsername");
    if (username) {
      setSellerUsername(username);
    } else {
      console.error("Governor username not found.");
    }
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/ActivityRoute');
      const json = await response.json();
      if (response.ok) {
        setActivity(json);
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
    }
  };

  useEffect(() => {
    fetchMuseumData();
    fetchActivities();
  }, []);

  const handleToggleVisibility = (stateSetter) => {
    stateSetter(prevState => !prevState);
  };

  const AdminChangePassword = () => (
    <ChangePasswordForm apiEndpoint="/api/adminRoute/changeGovernorPassword" />
  );





  
  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900/70 text-white p-6">
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
            {sellerUsername.charAt(0).toUpperCase()}
          </div>
          <span className="ml-4 text-lg font-semibold">Hi, {sellerUsername}</span>
        </div>
        {/* Sidebar Menu */}
        <ul className="space-y-6">
          <li>
            <button
              onClick={() => setActiveContent("museums")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "museums"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m2 0a2 2 0 10-4 0 2 2 0 014 0zM4 6h16M4 18h16"
                />
              </svg>
              Show Museums
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("activities")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "activities"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16l3 3 3-3m6-6l3-3 3 3m-9-6v18"
                />
              </svg>
              Show Activities
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("createTag")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "createTag"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Tag
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("addMuseum")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "addMuseum"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Museum
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("changePassword")}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeContent === "changePassword"
                  ? "bg-blue-700 text-white"
                  : "text-blue-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12h3m-9 0h3m4-4h1M5 16h1"
                />
              </svg>
              Change Password
            </button>
          </li>
        </ul>
      </div>

     {/* Main Content */}
<div className="flex-grow">
  {/* Description Section */}
  {activeContent === "description" && (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg bg-white/30 backdrop-blur-md w-[90%] max-w-2xl">
        <h3 className="text-5xl font-extrabold text-black mb-8 text-center">
          Welcome to the Governor Dashboard
        </h3>
        <p className="text-xl text-gray-700 text-center">
          This is the central hub where you can manage museums, activities,
          create tags, and update your account information. Choose an option
          from the left menu to get started.
        </p>
      </div>
    </div>
  )}

      {/* Museums Section */}
{activeContent === "museums" && (
  <div className="flex items-center justify-center min-h-screen">
    <div className="section-card p-6 rounded-lg shadow-lg bg-white/30 backdrop-blur-md w-80">
      <h3 className="text-xl font-semibold text-black mb-4 text-center">
        Museums
      </h3>
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-black rounded-full animate-spin"></div>
          <span className="text-gray-700">Loading museums...</span>
        </div>
      ) : museums.length > 0 ? (
        <div className="space-y-4 mt-4">
          {museums.map((museum) => (
            <MuseumDetails museum={museum} key={museum._id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-4 text-center">No museums found.</p>
      )}
    </div>
  </div>
)}


        
       {/* Activities Section */}
{activeContent === "activities" && (
  <div className="flex items-center justify-center min-h-screen">
    <div className="section-card p-6 rounded-lg shadow-lg bg-white/30 backdrop-blur-md w-96">
      <h3 className="text-xl font-semibold text-black mb-4 text-center">
        Activities
      </h3>
      {activity.length > 0 ? (
        <div className="space-y-4 mt-4">
          {activity.map((act) => (
            <ActivityDetails activity={act} key={act._id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-4 text-center">No activities available.</p>
      )}
    </div>
  </div>
)}


        
      {/* Create Tag Section */}
{activeContent === "createTag" && (
  <div className="flex items-center justify-center min-h-screen">
    <div className="section-card p-6 rounded-lg shadow-lg bg-white/30 backdrop-blur-md w-96">
      <h3 className="text-xl font-semibold text-black mb-4 text-center">
        Create New Tag
      </h3>
      <TagForm />
    </div>
  </div>
)}


        
      {/* Add Museum Section */}
{activeContent === "addMuseum" && (
  <div className="flex items-center justify-center min-h-screen">
    <div className="section-card p-6 rounded-lg shadow-lg bg-white/30 backdrop-blur-md w-96">
      <h3 className="text-xl font-semibold text-black mb-4 text-center">
        Add New Museum
      </h3>
      <MuseumForm />
    </div>
  </div>
)}



        {/* Change Password Section */}
{activeContent === "changePassword" && (
  <div className="flex items-center justify-center min-h-screen">
    <div className="section-card p-6 rounded-lg shadow-lg bg-white/30 backdrop-blur-md w-96">
      <h3 className="text-xl font-semibold text-black mb-4 text-center">
        Change Password
      </h3>
      <AdminChangePassword />
    </div>
  </div>
)}

      </div>

</div>
  );
};

export default TourismGovernorDashboard;
