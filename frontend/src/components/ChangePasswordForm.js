import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner for loading state

const ChangePasswordForm = ({ apiEndpoint }) => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !oldPassword || !newPassword) {
      setMessage('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const json = await response.json();

      if (response.ok) {
        setMessage('Password changed successfully');
        setUsername('');
        setOldPassword('');
        setNewPassword('');
      } else {
        setMessage(json.message || 'Error changing password');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
    setMessage(''); // Clear message when opening the form
  };

  return (
    <div className="relative">
      {/* Button to open form */}
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Change my password
      </button>

      {/* Modal for Changing Password */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 sm:w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Old Password:
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter old password"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new password"
                  required
                />
              </div>

              {/* Error and Success Messages */}
              {message && (
                <div
                  className={`text-sm mb-2 ${
                    message.includes('Error') ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  <p>{message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full p-2 bg-blue-500 text-white rounded-lg ${
                  loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
                } transition duration-300`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <FaSpinner className="animate-spin" />
                  </div>
                ) : (
                  'Change Password'
                )}
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={handleClick}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordForm;
