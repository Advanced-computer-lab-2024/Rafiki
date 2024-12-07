import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../pics/rafiki.PNG";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Display the logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Rafiki Logo" className="h-16 mr-2" /> {/* Increased size */}
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:underline">Log Out</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:underline">About Us</Link>
          </li>
          <li>
            <Link to="/signup-paths" className="text-white hover:underline">Signup</Link> {/* New link */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
