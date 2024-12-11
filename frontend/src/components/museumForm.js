import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon for loading

const MuseumForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState('');
  const [location, setLocation] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [ticketPrices, setTicketPrices] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !description || !location || !ticketPrices || !tag) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    const museum = { name, description, pictures, location, openingHours, ticketPrices, tag };

    try {
      const response = await fetch('/api/museumRoute', {
        method: 'POST',
        body: JSON.stringify(museum),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        setSuccessMessage('Museum created successfully!');
        resetForm();
        setTimeout(() => {
          setIsVisible(false);
          setSuccessMessage('');
        }, 2000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPictures('');
    setLocation('');
    setOpeningHours('');
    setTicketPrices('');
    setTag('');
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
    setError(null); // Clear error when opening form
    setSuccessMessage(''); // Clear success message when reopening form
  };

  useEffect(() => {
    axios
      .get('/api/tagroute')
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch tags');
      });
  }, []);

  return (
    <div className="relative">
      {/* Create Museum Button */}
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Create Museum
      </button>

      {/* Modal for Creating Museum */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 sm:w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create a New Museum</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter museum name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-600 mb-2">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter museum description"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="pictures" className="block text-sm font-semibold text-gray-600 mb-2">
                  Pictures URL:
                </label>
                <input
                  type="text"
                  id="pictures"
                  onChange={(e) => setPictures(e.target.value)}
                  value={pictures}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter picture URL"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-600 mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter location"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="openingHours" className="block text-sm font-semibold text-gray-600 mb-2">
                  Opening Hours:
                </label>
                <input
                  type="text"
                  id="openingHours"
                  onChange={(e) => setOpeningHours(e.target.value)}
                  value={openingHours}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter opening hours"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="ticketPrices" className="block text-sm font-semibold text-gray-600 mb-2">
                  Ticket Prices:
                </label>
                <input
                  type="text"
                  id="ticketPrices"
                  onChange={(e) => setTicketPrices(e.target.value)}
                  value={ticketPrices}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter ticket price"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tag" className="block text-sm font-semibold text-gray-600 mb-2">
                  Tag:
                </label>
                <select
                  id="tag"
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a tag</option>
                  {tags.map((tag) => (
                    <option key={tag._id} value={tag._name}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error and Success Messages */}
              {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
              {successMessage && <div className="text-sm text-green-500 mb-2">{successMessage}</div>}

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
                  'Create Museum'
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

export default MuseumForm;
