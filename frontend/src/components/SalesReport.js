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
    <div className="sales-report">
      <h2>Sales Report</h2>
      <div className="filters">
        <label>
          Type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All</option>
            <option value="Activity">Activity</option>
            <option value="Itinerary">Itinerary</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
        <label>
          Month:
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <div className="results">
        <h3>Filtered Results:</h3>
        {filteredData.length > 0 ? (
          <ul>
            {filteredData.map((item) => (
              <li key={item.id}>
                {item.name} - {item.type} - {item.date} - ${item.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
