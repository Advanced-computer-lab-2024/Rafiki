import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TermsPopup = ({ onAccept }) => {
  const navigate = useNavigate();

  const handleDecline = () => {
    navigate('/'); // Redirect to the home page if the user declines
  };

  useEffect(() => {
    // Disable scrolling while the popup is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when the component unmounts
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Terms and Conditions
        </h2>
        <p className="text-gray-600 text-justify mb-4">
          Welcome to our website. By accessing or using our platform, you agree
          to the following terms and conditions:
        </p>
        <ul className="list-disc list-inside text-left text-gray-600 space-y-2 mb-4">
          <li>You must be at least 18 years old to register and use our services.</li>
          <li>Your use of the platform must comply with all applicable laws and regulations.</li>
          <li>You are responsible for maintaining the confidentiality of your account information.</li>
          <li>We reserve the right to modify or discontinue our services at any time.</li>
          <li>Your data may be used in accordance with our privacy policy.</li>
        </ul>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onAccept}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;
