import { useEffect, useState } from "react";
import axios from "axios";

const GuestDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
    budget: "",
    date: "",
  });
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/ActivityRoute", {
          params: { ...filters, sort },
        });
        setActivities(response.data);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.response ? err.response.data : 'Error fetching activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [filters, sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      console.log('Updated filters:', { ...prevFilters, [name]: value });
      return { ...prevFilters, [name]: value };
    });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (activities.length === 0) return <div>No activities found.</div>;

  return (
    <div>
      <h1>Upcoming Activities</h1>

      <div className="filters">
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Tag:
          <input
            type="text"
            name="tag"
            value={filters.tag}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Budget:
          <input
            type="number"
            name="budget"
            value={filters.budget}
            onChange={handleFilterChange}
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
          Sort by Price:
          <select onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="price">Ascending</option>
            <option value="-price">Descending</option>
          </select>
        </label>
      </div>

      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <h2>{activity.location}</h2>
            <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
            <p>Time: {activity.time}</p>
            <p>Price: ${activity.price}</p>
            <p>Tags: {activity.tags}</p>
            <p>Special Discounts: {activity.specialDiscounts}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestDashboard;
