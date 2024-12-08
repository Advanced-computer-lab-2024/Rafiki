import { useState, useEffect } from "react";
import axios from "axios";

const TourguideDetails = () => {
  const [tourguide, setTourguide] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("loggedinUsername"); // Retrieve the logged-in username

  useEffect(() => {
    const fetchTourguideDetails = async () => {
      try {
        const response = await axios.get(`/api/tourguideRoute?username=${username}`);
        if (response.status === 200) {
          setTourguide(response.data); // Set tour guide data
          setRatings(response.data.ratings || []); // Set ratings (if available)
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load tour guide details.");
      }
    };

    fetchTourguideDetails();
  }, [username]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded">
        {error}
      </div>
    );
  }

  if (!tourguide) {
    return <div className="text-center text-gray-500">Loading tour guide details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Guide Details</h2>
      <div className="flex items-center space-x-4 mb-6">
        {tourguide.Picture ? (
          <img
            src={`/uploads/tourGuidePictures/${tourguide.Picture}`}
            alt={`${tourguide.Username}'s profile`}
            className="w-24 h-24 rounded-full shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-700">{tourguide.Username}</h3>
          <p className="text-gray-600">{tourguide.Email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="font-semibold text-gray-800">Mobile Number:</p>
          <p className="text-gray-600">{tourguide.MobileNumber || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Nationality:</p>
          <p className="text-gray-600">{tourguide.Nationality || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Years of Experience:</p>
          <p className="text-gray-600">{tourguide.Yearsofexperience || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Previous Work:</p>
          <p className="text-gray-600">{tourguide.Previouswork || "N/A"}</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold text-gray-800">Account Created At:</p>
          <p className="text-gray-600">{new Date(tourguide.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ratings:</h3>
        {ratings.length > 0 ? (
          <div className="space-y-4">
            {ratings.map((rating, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="font-semibold text-gray-700">{rating.name}</p>
                <p className="text-gray-600">Rating: {rating.rating}/5</p>
                <p className="text-gray-500 text-sm">{rating.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No ratings available.</p>
        )}
      </div>
    </div>
  );
};

export default TourguideDetails;
