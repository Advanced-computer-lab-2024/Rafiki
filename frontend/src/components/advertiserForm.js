import { useState } from 'react';

const AdvertiserForm = () => {
  // Form visibility
  const [isVisible, setIsVisible] = useState(false);

  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDOB] = useState('');
  const [job, setJob] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Feedback messages
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Toggle form visibility
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTermsAccepted) {
      setError('You must accept the terms and conditions.');
      return;
    }

    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('MobileNumber', mobileNumber);
    formData.append('Nationalty', nationality);
    formData.append('DOB', dob);
    formData.append('Job', job);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch('/api/AdvertiserRoute', {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setSuccessMessage(null);
      } else {
        setError(null);
        setSuccessMessage('Account created successfully!');
        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
        setNationality('');
        setDOB('');
        setJob('');
        setProfilePicture(null);
        setIsTermsAccepted(false);
        console.log('New advertiser added:', json);
      }
    } catch (err) {
      setError('An error occurred during account creation. Please try again.');
      setSuccessMessage(null);
      console.error('Error during signup:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        {isVisible ? 'Hide Signup Form' : 'Sign up as Advertiser'}
      </button>

      {isVisible && (
        <form
          className="bg-white rounded-lg shadow-lg p-8 mt-6 w-full max-w-md"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Advertiser Signup</h3>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Mobile Number</label>
              <input
                type="text"
                onChange={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Job</label>
              <input
                type="text"
                onChange={(e) => setJob(e.target.value)}
                value={job}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Nationality</label>
              <input
                type="text"
                onChange={(e) => setNationality(e.target.value)}
                value={nationality}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Date of Birth</label>
              <input
                type="date"
                onChange={(e) => setDOB(e.target.value)}
                value={dob}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Profile Picture</label>
              <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Accept terms and conditions</span>
              </label>
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

export default AdvertiserForm;
