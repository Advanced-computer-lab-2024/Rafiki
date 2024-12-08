import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGlobe, FaBriefcase, FaBirthdayCake } from "react-icons/fa";
import pic from "../pics/pic1.jpg"; // Use pic1 as the background

const TouristForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDOB] = useState("");
  const [job, setJob] = useState("");
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !mobileNumber || !nationality || !dob || !job) {
      setError("All fields are required!");
      return;
    }

    const tourist = {
      Username: username,
      Email: email,
      Password: password,
      MobileNumber: mobileNumber,
      Nationality: nationality,
      DOB: dob,
      Job: job,
    };

    try {
      const response = await fetch("/api/TouristRoute", {
        method: "POST",
        body: JSON.stringify(tourist),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "An error occurred. Please try again.");
      } else {
        setError(null);
        setShowPopup(true);

        setUsername("");
        setEmail("");
        setPassword("");
        setMobileNumber("");
        setNationality("");
        setDOB("");
        setJob("");

        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${pic})`,
      }}
    >
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate-fade-in">
            <h2 className="text-2xl font-bold text-green-600 text-center">Signup Successful!</h2>
            <p className="text-center mt-4 text-gray-700">
              Welcome, <strong>{username}</strong>! You are now registered as a tourist.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-12 h-12 border-t-4 border-b-4 border-green-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-center mt-4 text-gray-500">
              Redirecting you to the homepage...
            </p>
          </div>
        </div>
      )}

      {!showPopup && (
        <form
          className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-10 w-full max-w-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Tourist Signup</h2>

          <div className="grid grid-cols-1 gap-6">
            {/* Username */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Username"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-blue-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-blue-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Password"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-blue-400" />
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Mobile Number"
                required
              />
            </div>

            {/* Job */}
            <div className="relative">
              <FaBriefcase className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Job"
                required
              />
            </div>

            {/* Nationality */}
            <div className="relative">
              <FaGlobe className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nationality"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <FaBirthdayCake className="absolute left-3 top-3 text-blue-400" />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          {/* Feedback Messages */}
          {error && (
            <div className="text-red-500 mt-4 text-center">{error}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default TouristForm;
