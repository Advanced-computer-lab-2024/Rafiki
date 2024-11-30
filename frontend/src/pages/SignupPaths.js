import React from 'react';
import { Link } from 'react-router-dom';

function SignupPaths() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Choose Your Path
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Select a role to get started and unlock the features tailored just for you.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tourist Signup */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Register as a Tourist
            </h3>
            <p className="text-gray-600 mb-6">
              Discover exciting activities, plan your itineraries, and explore destinations with ease.
            </p>
            <Link
              to="/touristForm"
              className="text-blue-600 font-semibold hover:underline"
            >
              Get Started →
            </Link>
          </div>

          {/* Advertiser Signup */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Register as an Advertiser
            </h3>
            <p className="text-gray-600 mb-6">
              Promote your services, attract tourists, and grow your brand with our platform.
            </p>
            <Link
              to="/advertiserForm"
              className="text-blue-600 font-semibold hover:underline"
            >
              Join Now →
            </Link>
          </div>

          {/* Tour Guide Signup */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Register as a Tour Guide
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with travelers, share your expertise, and create memorable experiences.
            </p>
            <Link
              to="/tourguideForm"
              className="text-blue-600 font-semibold hover:underline"
            >
              Start Now →
            </Link>
          </div>

          {/* Admin Signup */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Dashboard
            </h3>
            <p className="text-gray-600 mb-6">
              Manage users, oversee platform activities, and ensure a smooth experience for everyone.
            </p>
            <Link
              to="/signup/admin"
              className="text-blue-600 font-semibold hover:underline"
            >
              Admin Registration →
            </Link>
          </div>

          {/* Seller Signup */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Register as a Seller
            </h3>
            <p className="text-gray-600 mb-6">
              Showcase and sell your products to a global audience effortlessly.
            </p>
            <Link
              to="/signup/seller"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register Now →
            </Link>
          </div>

          {/* Governor Dashboard */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Governor Dashboard
            </h3>
            <p className="text-gray-600 mb-6">
              Monitor regional activities, manage tourism growth, and make informed decisions.
            </p>
            <Link
              to="/signup/governor"
              className="text-blue-600 font-semibold hover:underline"
            >
              Join Now →
            </Link>
          </div>

          {/* Guest Dashboard */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Guest Dashboard
            </h3>
            <p className="text-gray-600 mb-6">
              Browse as a guest, explore activities, and experience our platform without registration.
            </p>
            <Link
              to="/guestDashboard"
              className="text-blue-600 font-semibold hover:underline"
            >
              Explore Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPaths;
