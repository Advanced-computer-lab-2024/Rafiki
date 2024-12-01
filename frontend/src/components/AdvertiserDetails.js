import React from "react";

const AdvertiserDetails = ({ advertiser }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">
          {advertiser.Username}
        </div>
        <p className="text-gray-700 text-base">
          <strong>Email:</strong> {advertiser.Email}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Nationality:</strong> {advertiser.Nationalty}
        </p>
        <p className="text-gray-500 text-sm italic">
          Joined: {new Date(advertiser.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default AdvertiserDetails;
