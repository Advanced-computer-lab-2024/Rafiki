import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

const TourguideForm = ({ existingTourguide, onUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [Username, setUsername] = useState(existingTourguide ? existingTourguide.Username : '');
  const [Email, setEmail] = useState(existingTourguide ? existingTourguide.Email : '');
  const [Password, setPassword] = useState('');
  const [MobileNumber, setMobileNumber] = useState(existingTourguide ? existingTourguide.MobileNumber : '');
  const [Nationality, setNationality] = useState(existingTourguide ? existingTourguide.Nationalty : '');
  const [DOB, setDOB] = useState(existingTourguide ? existingTourguide.DOB : '');
  const [Job, setJob] = useState(existingTourguide ? existingTourguide.Job : '');
  const [Picture, setPicture] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (existingTourguide) {
      setUsername(existingTourguide.Username);
      setEmail(existingTourguide.Email);
      setMobileNumber(existingTourguide.MobileNumber);
      setNationality(existingTourguide.Nationalty);
      setDOB(existingTourguide.DOB);
      setJob(existingTourguide.Job);
      setPicture(null);
    } else {
      setUsername('');
      setEmail('');
      setMobileNumber('');
      setNationality('');
      setDOB('');
      setJob('');
      setPicture(null);
    }
  }, [existingTourguide]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Username', Username);
    formData.append('Email', Email);
    formData.append('Password', Password);
    formData.append('MobileNumber', MobileNumber);
    formData.append('Nationality', Nationality);
    formData.append('DOB', DOB);
    formData.append('Job', Job);
    if (Picture) {
      formData.append('picture', Picture);
    }

    const method = existingTourguide ? 'PUT' : 'POST';
    const url = existingTourguide
      ? `/api/tourguideRoute/${existingTourguide._id}`
      : '/api/tourguideRoute';

    const response = await fetch(url, {
      method,
      body: formData,
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);

      if (!existingTourguide) {
        setUsername('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
        setNationality('');
        setDOB('');
        setJob('');
        setPicture(null);
      }

      console.log(existingTourguide ? 'Tourguide updated:' : 'New tourguide added:', json);
      if (onUpdate) onUpdate();

      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect to home page after success
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-200 p-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
      >
        {isVisible ? 'Hide Form' : existingTourguide ? 'Update Tour Guide' : 'Sign up as Tour Guide'}
      </motion.button>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {existingTourguide ? 'Update Tour Guide' : 'Tour Guide Registration'}
          </h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={Username}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
              <input
                type="text"
                onChange={(e) => setMobileNumber(e.target.value)}
                value={MobileNumber}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nationality</label>
              <input
                type="text"
                onChange={(e) => setNationality(e.target.value)}
                value={Nationality}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">DOB</label>
              <input
                type="date"
                onChange={(e) => setDOB(e.target.value)}
                value={DOB}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Job</label>
              <input
                type="text"
                onChange={(e) => setJob(e.target.value)}
                value={Job}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
              <input
                type="file"
                onChange={(e) => setPicture(e.target.files[0])}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              {existingTourguide ? 'Update' : 'Signup'}
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-2 text-center"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-sm mt-2 text-center"
              >
                {existingTourguide
                  ? 'Update successful!'
                  : 'Signup successful! Redirecting to home page...'}
              </motion.div>
            )}
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default TourguideForm;
