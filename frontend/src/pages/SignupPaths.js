import React from 'react';
import { Link } from 'react-router-dom';
import travelImage from '../pics/pic1.jpg';
import advertiserImage from '../pics/pic2.jpg';

function SignupPaths() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 text-gray-900 py-12">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-center mb-8 text-blue-600">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700">
          Choose how you'd like to join and start your journey with us today.
        </p>

        {/* Cards Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-10">
          {/* Tourist Signup */}
          <div
            className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 w-full sm:w-1/2 h-80"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${travelImage})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="relative z-10 p-8 flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold text-white">Register as a Tourist</h3>
              <p className="text-base mt-4 text-gray-300">
                Explore exciting destinations, plan your trips, and make the most of your journey.
              </p>
              <Link
                to="/touristForm"
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold self-start shadow-md hover:bg-blue-700 transition"
              >
                Get Started →
              </Link>
            </div>
          </div>

          {/* Seller/Advertiser/Tour Guide Signup */}
          <div
            className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 w-full sm:w-1/2 h-80"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${advertiserImage})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="relative z-10 p-8 flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold text-white">
                Register as a Seller, Advertiser, or Tour Guide
              </h3>
              <p className="text-base mt-4 text-gray-300">
                Promote your services, connect with customers, and grow your business on our platform.
              </p>
              <Link
                to="/signup/unified"
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold self-start shadow-md hover:bg-blue-700 transition"
              >
                Join Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPaths;
