import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TouristForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDOB] = useState('');
  const [job, setJob] = useState('');
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!username || !email || !password || !mobileNumber || !nationality || !dob || !job) {
      setError('All fields are required!');
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
      const response = await fetch('/api/TouristRoute', {
        method: 'POST',
        body: JSON.stringify(tourist),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'An error occurred. Please try again.');
      } else {
        setError(null);
        setShowPopup(true);

        // Clear the form
        setUsername('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
        setNationality('');
        setDOB('');
        setJob('');

        // Delay navigation to the homepage by 3 seconds
        setTimeout(() => {
          setShowPopup(false);
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 relative">
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
          className="bg-white rounded-lg shadow-lg p-10 w-full max-w-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Tourist Signup</h2>

          <div className="grid grid-cols-1 gap-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-700 font-medium">Mobile Number</label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            {/* Job */}
            <div>
              <label className="block text-gray-700 font-medium">Job</label>
              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your job"
                required
              />
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-gray-700 font-medium">Nationality</label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your nationality"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 font-medium">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <div className="text-red-500 mt-4 text-center">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default TouristForm;
