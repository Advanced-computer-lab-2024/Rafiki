import { useState, useEffect } from "react";

const ActivityForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); 
  const [tag, setTag] = useState("");
  const [specialDiscounts, setSpecialDiscounts] = useState("");
  const [location, setLocation] = useState("");
  const [tourGuideUsername, setTourGuideUsername] = useState(""); // New state for tourGuideUsername
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categoryRoutes");
      const data = await response.json();
      if (response.ok) setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch tags from the backend
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/tagRoute");
      const data = await response.json();
      if (response.ok) setTags(data);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  // Fetch categories and tags when the form is first rendered
  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the activity object
    const activity = {
      date,
      time,
      price,
      location,
      category,
      tag,
      specialDiscounts,
      tourGuideUsername, // Include tourGuideUsername in the activity data
    };

    try {
      const response = await fetch("/api/ActivityRoute", {
        method: "POST",
        body: JSON.stringify(activity),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setSuccessMessage("");
      } else {
        setError(null);
        setSuccessMessage("Activity created successfully!");
        setDate("");
        setTime("");
        setPrice("");
        setSpecialDiscounts("");
        setTag("");
        setCategory("");
        setLocation("");
        setTourGuideUsername(""); // Reset the tourGuideUsername after successful submission
      }
    } catch (err) {
      console.error("Error creating activity:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <button
        onClick={handleClick}
        className={`w-full px-6 py-3 text-white font-semibold rounded-md shadow-md transition-all ${
          isVisible ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isVisible ? "Close Form" : "Create Activity"}
      </button>

      {isVisible && (
        <form
          className="mt-6 bg-white rounded-lg shadow-md p-6 space-y-4 border-t-4 border-blue-500"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Activity</h3>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Time:</label>
            <input
              type="time"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Category (changed to a text input) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Type the category"
              required
            />
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tag:</label>
            <select
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            >
              <option value="">Select Tag</option>
              {tags.map((t) => (
                <option key={t._id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Special Discounts */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Special Discounts:</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={specialDiscounts}
              onChange={(e) => setSpecialDiscounts(e.target.value)}
              placeholder="E.g., 10% off for groups"
            />
          </div>

          {/* Tour Guide Username (input field for the username of the tour guide) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tour Guide Username:</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={tourGuideUsername}
              onChange={(e) => setTourGuideUsername(e.target.value)}
              placeholder="Enter the tour guide's username"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Submit Activity
          </button>

          {/* Success or Error Messages */}
          {successMessage && (
            <div className="mt-4 p-3 text-green-700 bg-green-100 rounded-md shadow-sm">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 text-red-700 bg-red-100 rounded-md shadow-sm">{error}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default ActivityForm;
