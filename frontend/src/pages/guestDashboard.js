import { useEffect, useState } from "react";
import axios from "axios"; // Axios for making API requests

const GuestDashboard = () => {
  // State to store activities and filter/sort options
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({
    budget: "",
    date: "",
    category: "",
    tags: "",
  });
  const [sortOption, setSortOption] = useState("price"); // default sort by price
  const [loading, setLoading] = useState(true); // Loading state for async data

  // Fetch activities from backend API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // API request to fetch activities with filters and sorting applied
        const response = await axios.get("/api/activityRoute", {
          params: {
            budget: filters.budget,
            date: filters.date,
            category: filters.category,
            tags: filters.tags,
            sort: sortOption,
          },
        });
        setActivities(response.data); // Set fetched activities to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [filters, sortOption]); // Refetch when filters or sort option changes

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <h2>Upcoming Activities</h2>

      {/* Filters Section */}
      <div>
        <h3>Filters</h3>
        <label>
          Budget:
          <input
            type="number"
            name="budget"
            value={filters.budget}
            onChange={handleFilterChange}
            placeholder="Max budget"
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="e.g. Sports, Music"
          />
        </label>
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            value={filters.tags}
            onChange={handleFilterChange}
            placeholder="e.g. Family, Outdoor"
          />
        </label>
      </div>

      {/* Sorting Section */}
      <div>
        <h3>Sort By:</h3>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="price">Price (Low to High)</option>
          <option value="date">Date (Soonest First)</option>
        </select>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <div>
          {/* Activities list */}
          {activities.length === 0 ? (
            <p>No activities found for the selected filters.</p>
          ) : (
            <ul>
              {activities.map((activity) => (
                <li key={activity._id}>
                  <h4>{activity.title}</h4>
                  <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                  <p>Location: {activity.location}</p>
                  <p>Price: ${activity.price}</p>
                  <p>Category: {activity.category}</p>
                  <p>Tags: {activity.tags}</p>
                  <p>Special Discounts: {activity.specialDiscounts}</p>
                  <p>Booking Open: {activity.isBookingOpen ? "Yes" : "No"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GuestDashboard;
