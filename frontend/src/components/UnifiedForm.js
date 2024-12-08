import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaGlobe,
  FaBriefcase,
  FaBirthdayCake,
  FaCamera,
  FaFileAlt,
} from "react-icons/fa";
import pic from "../pics/pic2.jpg";
const UnifiedSignupForm = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDOB] = useState('');
  const [job, setJob] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [previousWork, setPreviousWork] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields based on user type
    if (!username || !email || !password) {
        setError('Username, email, and password are required.');
        return;
      }
    
      if (userType === 'Seller' && (!name || !description)) {
        setError('Name and description are required for Seller.');
        return;
      }

    if (userType === 'Advertiser' && (!dob || !job || !mobileNumber || !acceptedTerms)) {
      setError('All fields and accepting terms are required for Advertiser.');
      return;
    }

    if (userType === 'TourGuide' && (!yearsOfExperience || !previousWork || !mobileNumber)) {
      setError('Years of experience, previous work, and mobile number are required for Tour Guide.');
      return;
    }

    // Create FormData object to handle file uploads
    const formData = new FormData();
  formData.append('Username', username);
  formData.append('Email', email);
  formData.append('Password', password);

  if (userType === 'Seller') {
    formData.append('Name', name);
    formData.append('Description', description);
    if (profilePicture) {
      formData.append('picture', profilePicture); // Only append if provided
    }
  }
  
  console.log('FormData being sent:', Object.fromEntries(formData.entries())); // Debug log


    if (userType === 'Advertiser') {
      formData.append('DOB', dob);
      formData.append('Job', job);
      formData.append('MobileNumber', mobileNumber);
      formData.append('isTermsAccepted', acceptedTerms);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }
    }

    if (userType === 'TourGuide') {
      formData.append('YearsOfExperience', yearsOfExperience);
      formData.append('PreviousWork', previousWork);
      formData.append('MobileNumber', mobileNumber);
    }

    // Determine route based on user type
    const route = {
      Seller: '/api/sellerRoute',
      Advertiser: '/api/AdvertiserRoute',
      TourGuide: '/api/tourguideRoute',
    }[userType];

    if (!route) {
      setError('Please select a user type.');
      return;
    }

    try {
      const response = await fetch(route, {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'An error occurred. Please try again.');
      } else {
        setError(null);
        setSuccess(true);

        // Clear the form
        setUsername('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
        setDOB('');
        setJob('');
        setName('');
        setDescription('');
        setYearsOfExperience('');
        setPreviousWork('');
        setProfilePicture(null);
        setAcceptedTerms(false);

        // Redirect to home page after success
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${pic})`,
      }}
    >
      <form
        className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-10 w-full max-w-2xl"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Signup
        </h2>
  
        <div className="grid grid-cols-1 gap-6">
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
  
          {/* User Type */}
          <div className="relative">
            <label className="block font-medium text-gray-700">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select user type</option>
              <option value="Seller">Seller</option>
              <option value="Advertiser">Advertiser</option>
              <option value="TourGuide">Tour Guide</option>
            </select>
          </div>
  
          {/* Conditional Fields */}
          {userType === "Seller" && (
            <>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Name"
                  required
                />
              </div>
  
              <div className="relative">
                <FaFileAlt className="absolute left-3 top-3 text-blue-400" />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Description"
                  required
                />
              </div>
  
              <div className="relative">
                <FaCamera className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </>
          )}
  
          {userType === "Advertiser" && (
            <>
              <div className="relative">
                <FaBirthdayCake className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
  
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Job"
                  required
                />
              </div>
  
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Mobile Number"
                  required
                />
              </div>
  
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    Accept terms and conditions
                  </span>
                </label>
              </div>
            </>
          )}
  
          {userType === "TourGuide" && (
            <>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="text"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Years of Experience"
                  required
                />
              </div>
  
              <div className="relative">
                <FaFileAlt className="absolute left-3 top-3 text-blue-400" />
                <textarea
                  value={previousWork}
                  onChange={(e) => setPreviousWork(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Previous Work"
                  required
                />
              </div>
  
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </>
          )}
        </div>
  
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
  
        {error && (
          <div className="text-red-500 mt-4 text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-500 mt-4 text-center">
            Signup successful! Redirecting...
          </div>
        )}
      </form>
    </div>
  );
  
};

export default UnifiedSignupForm;