import { useEffect, useState } from "react";
import MuseumForm from '../components/museumForm';
import MuseumDetails from '../components/museumDetails';
import TagForm from '../components/TagForm';
import ActivityDetails from "../components/ActivityDetails"; 
import ChangePasswordForm from '../components/ChangePasswordForm';

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
    <div className="flex h-screen bg-gray-50">
      {/* Side Menu */}
      <div className="w-1/4 bg-blue-800 text-white p-6 h-full sticky top-0 flex flex-col shadow-lg">
        <span className="text-xl font-semibold mb-6">Hello Mr Governor!</span>
        <ul className="space-y-4 flex-grow">
          <li>
            <button
              onClick={() => setActiveContent('museums')}
              className={`text-lg w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ${activeContent === 'museums' ? 'bg-blue-700' : 'text-blue-200'}`}
            >
              Show Museums
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('activities')}
              className={`text-lg w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ${activeContent === 'activities' ? 'bg-blue-700' : 'text-blue-200'}`}
            >
              Show Activities
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('createTag')}
              className={`text-lg w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ${activeContent === 'createTag' ? 'bg-blue-700' : 'text-blue-200'}`}
            >
              Create Tag
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('addMuseum')}
              className={`text-lg w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ${activeContent === 'addMuseum' ? 'bg-blue-700' : 'text-blue-200'}`}
            >
              Add New Museum
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('changePassword')}
              className={`text-lg w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ${activeContent === 'changePassword' ? 'bg-blue-700' : 'text-blue-200'}`}
            >
              Change Password
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto bg-white shadow-2xl rounded-l-3xl">
        {/* Default Description */}
        {activeContent === 'description' && (
          <div className="text-center mb-12">
            <h3 className="text-4xl font-semibold text-gray-800 mb-6">Welcome to the Governor Dashboard</h3>
            <p className="text-lg text-gray-600">
              This is the central hub where you can manage museums, activities, create tags, and update your account information.
              Choose an option from the left menu to get started.
            </p>
          </div>
        )}

        {/* Museums Section */}
        {activeContent === 'museums' && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">Museums</h3>
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <span className="text-gray-500">Loading museums...</span>
              </div>
            ) : museums.length > 0 ? (
              museums.map(museum => (
                <MuseumDetails museum={museum} key={museum._id} />
              ))
            ) : (
              <p className="text-gray-500">No museums found.</p>
            )}
          </div>
        )}

        {/* Activities Section */}
        {activeContent === 'activities' && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">Activities</h3>
            {activity.length > 0 ? (
              activity.map(act => (
                <ActivityDetails activity={act} key={act._id} />
              ))
            ) : (
              <p className="text-gray-500">No activities available.</p>
            )}
          </div>
        )}

        {/* Create Tag Section */}
        {activeContent === 'createTag' && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Create New Tag</h3>
            <TagForm />
          </div>
        )}

        {/* Add Museum Form Section */}
        {activeContent === 'addMuseum' && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Museum</h3>
            <MuseumForm />
          </div>
        )}

        {/* Change Password Section */}
        {activeContent === 'changePassword' && (
          <div className="section-card p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h3>
            <AdminChangePassword />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourismGovernorDashboard;
