import { useState } from 'react';

const TouristForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [Nationalty, setNationalty] = useState('');
  const [DOB, setDOB] = useState('');
  const [Job, setJob] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tourist = { Username, Email, Password, MobileNumber, Nationalty, DOB, Job };

    const response = await fetch('/api/TouristRoute', {
      method: 'POST',
      body: JSON.stringify(tourist),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccessMessage(null);
    } else {
      setError(null);
      setSuccessMessage('Signup successful!');
      setUsername('');
      setEmail('');
      setPassword('');
      setJob('');
      setDOB('');
      setNationalty('');
      setMobileNumber('');
      console.log('New tourist added:', json);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        {isVisible ? 'Hide Signup Form' : 'Sign up as Tourist'}
      </button>

      {isVisible && (
        <form
          className="bg-white rounded-lg shadow-lg p-8 mt-6 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tourist Signup</h3>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={Username}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Mobile Number</label>
              <input
                type="text"
                onChange={(e) => setMobileNumber(e.target.value)}
                value={MobileNumber}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Job</label>
              <input
                type="text"
                onChange={(e) => setJob(e.target.value)}
                value={Job}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Nationality</label>
              <input
                type="text"
                onChange={(e) => setNationalty(e.target.value)}
                value={Nationalty}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Date of Birth</label>
              <input
                type="date"
                onChange={(e) => setDOB(e.target.value)}
                value={DOB}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>

          {/* Feedback Messages */}
          {error && (
            <div className="text-red-500 mt-4 text-center">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 mt-4 text-center">
              {successMessage}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default TouristForm;
