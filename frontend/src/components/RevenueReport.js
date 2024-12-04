import React from "react";

const RevenueReport = ({ seller }) => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-12 max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        {/* Seller Profile Image can go here, if needed */}
        <div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Sales & Revenue</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <span className="text-lg text-gray-600">Total Sales</span>
            <span className="text-4xl font-bold text-green-700">{seller.Sales}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-gray-600">Total Revenue</span>
            <span className="text-4xl font-bold text-blue-700">${seller.Revenue}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8">
      
      </div>
    </div>
  );
};

export default RevenueReport;
