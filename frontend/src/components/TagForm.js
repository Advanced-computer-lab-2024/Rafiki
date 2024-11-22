import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon for loading

const TagForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Tag name cannot be empty');
      return;
    }

    setLoading(true);
    const advertiser = { name };
    const response = await fetch('/api/TagRoute', {
      method: 'POST',
      body: JSON.stringify(advertiser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setLoading(false);
    }

    if (response.ok) {
      setError(null);
      setSuccessMessage('Tag created successfully!');
      setName('');
      setLoading(false);
      setTimeout(() => {
        setIsVisible(false);
        setSuccessMessage('');
      }, 2000);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
    setError(null); // Clear error when opening form
    setSuccessMessage(''); // Clear success message when reopening form
  };

  return (
    <div className="relative">
      {/* Create Tag Button */}
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Create Tag
      </button>

      {/* Modal for Creating Tag */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 sm:w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create a New Tag</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="tagName"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Tag Name:
                </label>
                <input
                  type="text"
                  id="tagName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter tag name"
                />
              </div>

              {/* Error or Success Message */}
              {error && (
                <div className="text-sm text-red-500 mb-2">
                  <p>{error}</p>
                </div>
              )}

              {successMessage && (
                <div className="text-sm text-green-500 mb-2">
                  <p>{successMessage}</p>
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
                  'Create Tag'
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

export default TagForm;
