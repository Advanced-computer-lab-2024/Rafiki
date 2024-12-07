import React from "react";
import { useNavigate } from "react-router-dom";
import travelImage from "../pics/pic1.jpg";
import managementImage from "../pics/pic2.jpg";
import gov from '../pics/pic3.jpg'

function LoginPaths() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === "tourist") {
      navigate("/login/tourist");
    } else if (role === "admin") {
      navigate("/login/unified");
    } else if (role === "seller") {
      navigate("/login/unified");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 text-gray-900 py-12">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-center mb-8 text-blue-600">
          Welcome Back
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700">
          Choose your role to log in and access your dashboard.
        </p>

        {/* Cards Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-10">
          {/* Tourist Login */}
          <div
            className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 w-full sm:w-1/2 h-80 cursor-pointer"
            onClick={() => handleRoleSelection("tourist")}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${travelImage})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="relative z-10 p-8 flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold text-white">Login as Tourist</h3>
              <p className="text-base mt-4 text-gray-300">
                Discover activities, book tours, and explore destinations.
              </p>
              <button
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold self-start shadow-md hover:bg-blue-700 transition"
              >
                Login →
              </button>
            </div>
          </div>

          {/* Seller/Advertiser/Tour Guide Login */}
          <div
            className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 w-full sm:w-1/2 h-80 cursor-pointer"
            onClick={() => handleRoleSelection("seller")}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${managementImage})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="relative z-10 p-8 flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold text-white">
                Login as Seller, Advertiser, or Tour Guide
              </h3>
              <p className="text-base mt-4 text-gray-300">
                Manage your services, connect with customers, and grow your business.
              </p>
              <button
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold self-start shadow-md hover:bg-blue-700 transition"
              >
                Login →
              </button>
            </div>
          </div>

          {/* Admin/Tourism Governor Login */}
          <div
            className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 w-full sm:w-1/2 h-80 cursor-pointer"
            onClick={() => handleRoleSelection("admin")}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${gov})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="relative z-10 p-8 flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold text-white">Login as Admin/Governor</h3>
              <p className="text-base mt-4 text-gray-300">
                Oversee platform operations or monitor tourism in your region.
              </p>
              <button
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold self-start shadow-md hover:bg-blue-700 transition"
              >
                Login →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPaths;
