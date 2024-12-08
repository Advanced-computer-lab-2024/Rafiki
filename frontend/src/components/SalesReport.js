import React, { useState } from "react";

const SalesReport = () => {
  // Dummy sales data
  const salesData = [
    { id: 1, type: "Activity", name: "Safari Adventure", date: "2024-12-01", amount: 100 },
    { id: 2, type: "Itinerary", name: "City Tour", date: "2024-11-15", amount: 200 },
    { id: 3, type: "Activity", name: "Mountain Hike", date: "2024-12-02", amount: 150 },
    { id: 4, type: "Itinerary", name: "Beach Getaway", date: "2024-10-30", amount: 300 },
    { id: 5, type: "Activity", name: "River Rafting", date: "2024-12-03", amount: 120 },
  ];

  // State for filters
  const [filterType, setFilterType] = useState(""); // Activity or Itinerary
  const [filterDate, setFilterDate] = useState(""); // Specific date
  const [filterMonth, setFilterMonth] = useState(""); // Specific month
  const [filteredData, setFilteredData] = useState(salesData);

  // Handle filtering logic
  const handleFilter = () => {
    let filtered = salesData;

    // Filter by type
    if (filterType) {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    // Filter by date
    if (filterDate) {
      filtered = filtered.filter((item) => item.date === filterDate);
    }

    // Filter by month
    if (filterMonth) {
      const month = new Date(filterMonth).getMonth() + 1; // JS months are 0-indexed
      filtered = filtered.filter((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return itemMonth === month;
      });
    }

    setFilteredData(filtered);
  };

  return (
    <div className="sales-report bg-gradient-to-br from-gray-100 to-gray-50 p-8 rounded-xl shadow-xl max-w-5xl mx-auto mt-10">
      {/* Title */}
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sales Report</h2>
      <p className="text-lg text-gray-600 text-center mb-10">Overview of sales and revenue performance</p>

      {/* Filters Section */}
      <div className="filters bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="type" className="text-gray-700 font-semibold">Type</label>
            <select
              id="type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">All</option>
              <option value="Activity">Activity</option>
              <option value="Itinerary">Itinerary</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-gray-700 font-semibold">Date</label>
            <input
              type="date"
              id="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="month" className="text-gray-700 font-semibold">Month</label>
            <input
              type="month"
              id="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleFilter}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Apply Filters
        </button>
      </div>

      {/* Results Section */}
      <div className="results">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Filtered Results</h3>
        {filteredData.length > 0 ? (
          <table className="min-w-full table-auto border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="text-left text-lg font-semibold text-gray-700">Type</th>
                <th className="text-left text-lg font-semibold text-gray-700">Name</th>
                <th className="text-left text-lg font-semibold text-gray-700">Date</th>
                <th className="text-left text-lg font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="bg-white hover:bg-gray-50 transition duration-300">
                  <td className="py-2 px-4 text-gray-700">{item.type}</td>
                  <td className="py-2 px-4 text-gray-700">{item.name}</td>
                  <td className="py-2 px-4 text-gray-700">{item.date}</td>
                  <td className="py-2 px-4 text-gray-700">${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
