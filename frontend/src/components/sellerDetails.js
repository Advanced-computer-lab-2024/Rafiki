import React from "react";
import { FaEnvelope, FaDollarSign, FaChartLine, FaUserAlt } from "react-icons/fa";

const SellerDetails = ({ seller }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-50 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      {/* Profile Section */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-lg"></div>
        <div className="flex items-center relative z-10">
          {seller.Picture ? (
            <img
              src={`/uploads/sellerPictures/${seller.Picture}`}
              alt={`${seller.Username}'s profile`}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-4 -mt-8"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-300 text-gray-600 text-2xl font-bold mr-4 -mt-8">
              {seller.Username.charAt(0).toUpperCase()}
            </div>
          )}
          <h4 className="text-2xl font-semibold text-gray-800">{seller.Name || seller.Username}</h4>
          {seller.Verified && (
            <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Verified Seller
            </span>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-4">
        <div className="flex items-center mb-2">
          <FaUserAlt className="text-blue-500 mr-2" />
          <p className="text-gray-700">
            <strong>Username:</strong> {seller.Username}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <FaEnvelope className="text-blue-500 mr-2" />
          <p className="text-gray-700">
            <strong>Email:</strong> {seller.Email}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <FaChartLine className="text-blue-500 mr-2" />
          <p className="text-gray-700">
            <strong>Description:</strong> {seller.Description || "No description provided."}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <FaDollarSign className="text-blue-500 mr-2" />
          <p className="text-gray-700">
            <strong>Revenue:</strong> ${seller.Revenue.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <FaChartLine className="text-blue-500 mr-2" />
          <p className="text-gray-700">
            <strong>Sales:</strong> {seller.Sales}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
     
    </div>
  );
};

export default SellerDetails;
