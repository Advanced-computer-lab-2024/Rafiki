import React from "react";

const SellerDetails = ({ seller }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        {seller.Picture && (
          <img
            src={`/uploads/sellerPictures/${seller.Picture}`}
            alt={`${seller.Username}'s profile`}
            className="w-16 h-16 rounded-full mr-4"
          />
        )}
        <h4 className="text-2xl font-semibold text-gray-800">{seller.Name || seller.Username}</h4>
      </div>
      <p className="text-gray-600"><strong>Username:</strong> {seller.Username}</p>
      <p className="text-gray-600"><strong>Email:</strong> {seller.Email}</p>
      <p className="text-gray-600"><strong>Description:</strong> {seller.Description || "No description provided."}</p>
      <p className="text-gray-600"><strong>Revenue:</strong> {seller.Revenue}</p>
      <p className="text-gray-600"><strong>Sales:</strong> {seller.Sales}</p>


    </div>
  );
};

export default SellerDetails;
