import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'tourismGovernor') {
      navigate('/login/tourism-governor');
    } else if (role === 'tourGuide') {
      navigate('/login/tourguide');
    } else if (role === 'tourist') {
      navigate('/login/tourist');
    } else if (role === 'advertiser') {
      navigate('/login/advertiser');
    } else if (role === 'seller') {
      navigate('/login/seller');
    } else if (role === 'admin') {
      navigate('/login/admin');
    } else if (role === 'guest') {
      navigate('/guestDashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Select Your Login Role
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Choose the role you want to log in as and access your personalized dashboard.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Login as Tourist */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleRoleSelection('tourist')}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tourist Login</h3>
            <p className="text-gray-600 mb-6">
              Log in to discover activities, book tours, and explore destinations.
            </p>
          </div>

          {/* Login as Advertiser */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleRoleSelection('advertiser')}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Advertiser Login</h3>
            <p className="text-gray-600 mb-6">
              Log in to promote your services and connect with a global audience.
            </p>
          </div>

          {/* Login as Tour Guide */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleRoleSelection('tourGuide')}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tour Guide Login</h3>
            <p className="text-gray-600 mb-6">
              Log in to manage your bookings, connect with travelers, and more.
            </p>
          </div>

          {/* Login as Seller */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleRoleSelection('seller')}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Seller Login</h3>
            <p className="text-gray-600 mb-6">
              Log in to manage your products and reach a wider audience.
            </p>
          </div>

          {/* Login as Governor */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleRoleSelection('tourismGovernor')}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Governor Login</h3>
            <p className="text-gray-600 mb-6">
              Log in to monitor and manage tourism in your region.
            </p>
          </div>

          {/* Login as Admin */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleRoleSelection('admin')}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Login</h3>
            <p className="text-gray-600 mb-6">
              Log in to manage platform activities and oversee user interactions.
            </p>
          </div>

          {/* Login as Guest */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleRoleSelection('guest')}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Guest Access</h3>
            <p className="text-gray-600 mb-6">
              Browse activities and explore the platform without registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
