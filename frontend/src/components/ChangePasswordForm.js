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
    
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
        
        
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-5 relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <span className="px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A7.962 7.962 0 0012 20a7.962 7.962 0 006.879-2.196m-1.221-1.756A7.963 7.963 0 0012 16a7.963 7.963 0 00-5.657-2.135m11.313 2.135a8.001 8.001 0 10-11.313 0m0 0a3.005 3.005 0 01-.879-1.808M5.121 17.804a3.005 3.005 0 01-.879-1.808" />
                </svg>
              </span>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="w-full px-4 py-2 border-l focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
  
          {/* Old Password Input */}
          <div className="mb-5 relative">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Old Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <span className="px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 4h.01M12 9a2 2 0 00-2 2v1h4v-1a2 2 0 00-2-2zM5.5 9A3.5 3.5 0 119 5.5 3.5 3.5 0 015.5 9z" />
                </svg>
              </span>
              <input
                type="password"
                id="oldPassword"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                className="w-full px-4 py-2 border-l focus:outline-none"
                placeholder="Enter your old password"
                required
              />
            </div>
          </div>
  
          {/* New Password Input */}
          <div className="mb-5 relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <span className="px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2m8 0a4 4 0 004-4V7a4 4 0 00-4-4m0 18H8a4 4 0 01-4-4V7a4 4 0 014-4m0 18a4 4 0 004-4V7a4 4 0 00-4-4" />
                </svg>
              </span>
              <input
                type="password"
                id="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                className="w-full px-4 py-2 border-l focus:outline-none"
                placeholder="Enter a new password"
                required
              />
            </div>
          </div>
  
          {/* Feedback Messages */}
          {message && (
            <div
              className={`text-sm mb-4 p-2 rounded-lg ${
                message.includes('Error') ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'
              }`}
            >
              {message}
            </div>
          )}
  
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 flex items-center justify-center text-white rounded-lg ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } transition-all`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8z"
                ></path>
              </svg>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Change Password
              </>
            )}
          </button>
        </form>
      </div>
   
  );
  
};

export default ChangePasswordForm;
