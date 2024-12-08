import { useState, useEffect } from "react";

const UpdateSeller = ({ existingTourguide, onUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [Username, setUsername] = useState(existingTourguide ? existingTourguide.Username : "");
  const [Email, setEmail] = useState(existingTourguide ? existingTourguide.Email : "");
  const [Name, setName] = useState(existingTourguide ? existingTourguide.Name : "");
  const [Description, setDescription] = useState(existingTourguide ? existingTourguide.Description : "");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (existingTourguide) {
      setUsername(existingTourguide.Username);
      setEmail(existingTourguide.Email);
      setName(existingTourguide.Name);
      setDescription(existingTourguide.Description);
    } else {
      setUsername("");
      setEmail("");
      setName("");
      setDescription("");
    }
  }, [existingTourguide]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tourguide = { Username, Email, Name, Description };

    const method = existingTourguide ? "PUT" : "POST";
    const url = existingTourguide ? `/api/sellerRoute/${existingTourguide._id}` : "/api/sellerRoute";

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
      setSuccessMessage(null);
    } else {
      setError(null);
      setSuccessMessage(existingTourguide ? "Seller updated successfully!" : "Seller added successfully!");
      if (!existingTourguide) {
        setUsername("");
        setEmail("");
        setName("");
        setDescription("");
      }
      if (onUpdate) onUpdate();
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="p-4">
      <form
        className="bg-white p-6 mt-4 rounded-lg shadow-md space-y-6 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Form Header */}
        <h3 className="text-2xl font-semibold text-gray-700 text-center">
          {existingTourguide ? "Update Seller" : "Add New Seller"}
        </h3>
  
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Username:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={Username}
              className={`border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-400 ${
                Username ? "border-blue-500" : "border-gray-300"
              }`}
              placeholder="Enter username"
            />
          </div>
  
          {/* Email */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className={`border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-400 ${
                Email ? "border-blue-500" : "border-gray-300"
              }`}
              placeholder="Enter email"
            />
          </div>
  
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className={`border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-400 ${
                Name ? "border-blue-500" : "border-gray-300"
              }`}
              placeholder="Enter name"
            />
          </div>
  
          {/* Description */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
              className={`border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-400 ${
                Description ? "border-blue-500" : "border-gray-300"
              }`}
              placeholder="Enter description"
              rows="3"
            />
          </div>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {existingTourguide ? "Update Seller" : "Add Seller"}
        </button>
  
        {/* Messages */}
        {error && (
          <p className="text-red-500 mt-2 text-center font-medium">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-500 mt-2 text-center font-medium">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
  
  
};

export default UpdateSeller;
