  import { useState, useEffect } from "react";

const UpdateSeller = ({ existingTourguide, onUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(existingTourguide ? existingTourguide.Date : "");
  const [location, setLocation] = useState(existingTourguide ? existingTourguide.Location : "");
  const [specialDiscount, setSpecialDiscount] = useState(existingTourguide ? existingTourguide.SpecialDiscount : "");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (existingTourguide) {
      setDate(existingTourguide.Date || "");
      setLocation(existingTourguide.Location || "");
      setSpecialDiscount(existingTourguide.SpecialDiscount || "");
    } else {
      // Reset fields if no existing tour guide is selected
      setDate("");
      setLocation("");
      setSpecialDiscount("");
    }
  }, [existingTourguide]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tourguide = { Date: date, Location: location, SpecialDiscount: specialDiscount };

    const method = existingTourguide ? "PUT" : "POST";
    const url = existingTourguide
      ? `/api/ActivityRoute/${existingTourguide._id}`
      : "/api/ActivityRoute";

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(tourguide),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setSuccessMessage("");
      } else {
        setError(null);
        setSuccessMessage(existingTourguide ? "Activity successfully!" : "Nee Activity added successfully!");
        if (!existingTourguide) {
          setDate("");
          setLocation("");
          setSpecialDiscount("");
        }
        if (onUpdate) onUpdate(); // Notify parent component if needed
      }
    } catch (err) {
      console.error("Error submitting form:", err);
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
        {isVisible ? "Close Form" : "Update Activities"}
      </button>

      {isVisible && (
        <form
          className="mt-6 bg-white rounded-lg shadow-md p-6 space-y-4 border-t-4 border-blue-500"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {existingTourguide ? "Update Tour Guide" : "Add New Tour Guide"}
          </h3>

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

          {/* Special Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Special Discount:</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={specialDiscount}
              onChange={(e) => setSpecialDiscount(e.target.value)}
              placeholder="E.g., 10% off for groups"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            {existingTourguide ? "Update Tour Guide" : "Add Tour Guide"}
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

export default UpdateSeller;
