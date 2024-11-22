import { useEffect, useState } from "react";
import MuseumForm from '../components/museumForm';
import MuseumDetails from '../components/museumDetails';
import TagForm from '../components/TagForm';
import ActivityDetails from "../components/ActivityDetails"; 
import ChangePasswordForm from '../components/ChangePasswordForm';

const TourismGovernorDashboard = () => {
  const [museums, setMuseums] = useState('');
  const [activity, setActivity] = useState(null);
  const [isSellerVisible, setIsSellerVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeContent, setActiveContent] = useState('description'); // Default to description when no content is selected

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
    
    <div className="flex h-screen">
      {/* Side Menu */}
      <div className="w-1/4 bg-gray-800 text-white p-6 h-full">
        <h3 className="text-xl font-bold mb-4">Governor Dashboard</h3>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveContent('museums')}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Museums
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('activities')}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Activities
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('createTag')}
              className="text-lg text-blue-400 hover:text-white"
            >
              Create Tag
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('addMuseum')}
              className="text-lg text-blue-400 hover:text-white"
            >
              Add New Museum
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent('changePassword')}
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
        {activeContent === 'description' && (
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the Governor Dashboard</h3>
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
            <button
              onClick={() => handleToggleVisibility(setIsSellerVisible)}
              className="text-blue-600 font-semibold"
            >
              {isSellerVisible ? 'Hide' : 'Show'} Museum Details
            </button>
            {isSellerVisible && (
              <div className="museum-list mt-4">
                {loading ? (
                  <p className="text-gray-500">Loading museums...</p>
                ) : museums.length > 0 ? (
                  museums.map(museum => (
                    <MuseumDetails museum={museum} key={museum._id} />
                  ))
                ) : (
                  <p className="text-gray-500">No museums found.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Activities Section */}
        {activeContent === 'activities' && (
          <div className="section-card mb-8 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">Activities</h3>
            <button
              onClick={() => handleToggleVisibility(setIsVisible2)}
              className="text-blue-600 font-semibold"
            >
              {isVisible2 ? 'Hide' : 'Show'} Activities
            </button>
            {isVisible2 && (
              <div className="activity-list mt-4">
                {activity ? (
                  activity.map(activity => (
                    <ActivityDetails activity={activity} key={activity._id} />
                  ))
                ) : (
                  <p className="text-gray-500">No activities available.</p>
                )}
              </div>
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
