import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">Rafiki</a>
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
