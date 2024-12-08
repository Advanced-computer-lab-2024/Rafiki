import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityDetails from "../components/ActivityDetails";

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
  const [activity, setActivity] = useState([]); // Initialized as an empty array

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/ActivityRoute");
        if (response.status === 200 && Array.isArray(response.data)) {
          setActivity(response.data);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  // Filtering logic
  useEffect(() => {
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
      const selectedMonth = new Date(filterMonth).getMonth() + 1; // JS months are 0-indexed
      filtered = filtered.filter((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return itemMonth === selectedMonth;
      });
    }

    setFilteredData(filtered);
  }, [filterType, filterDate, filterMonth]); // Runs whenever filters are updated

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sales Report</h2>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Filter by Type */}
        <div className="bg-white shadow hover:shadow-lg p-6 rounded-lg transition">
          <label className="block text-sm font-semibold text-gray-700">Filter by Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="Activity">Activity</option>
            <option value="Itinerary">Itinerary</option>
          </select>
        </div>

        {/* Filter by Date */}
        <div className="bg-white shadow hover:shadow-lg p-6 rounded-lg transition">
          <label className="block text-sm font-semibold text-gray-700">Filter by Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter by Month */}
        <div className="bg-white shadow hover:shadow-lg p-6 rounded-lg transition">
          <label className="block text-sm font-semibold text-gray-700">Filter by Month</label>
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>


      {/* Results Section */}
      <div className="results">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Filtered Results</h3>
        {filteredData.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    ${item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SalesReport;