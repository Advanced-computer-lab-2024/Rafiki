import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../pics/rafiki.PNG";

function Navbar() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white text-blue-600 rounded-full p-2 hover:bg-gray-200 shadow-md flex items-center"
          aria-label="Go Back"
        >
          {/* SVG Arrow Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo remains centered */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <img src={logo} alt="Rafiki Logo" className="h-16 mr-2" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:underline">Log Out</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:underline">About Us</Link>
          </li>
          <li>
            <Link to="/signup-paths" className="text-white hover:underline">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
