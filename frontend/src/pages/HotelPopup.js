import React, { useState } from 'react';
import './../index.css';

const HotelPopup = ({ hotels, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booked, setBooked] = useState(false); // State to manage the booking status

  // Destructure the current hotel data
  const { iataCode, name, city } = hotels[currentIndex];

  // Handlers for Previous and Next buttons
  const handlePrevious = () => {
    setBooked(false); // Reset the booked message on navigation
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? hotels.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setBooked(false); // Reset the booked message on navigation
    setCurrentIndex((prevIndex) => (prevIndex === hotels.length - 1 ? 0 : prevIndex + 1));
  };

  const handleBook = () => {
    setBooked(true); // Show the booking success message
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>City: {iataCode}</h2>
        <h2 className="title">{name}</h2>
        <p className="city">{city}</p>
        <p className="rating">Rating: 4</p>
        
        <div className="button-container">
          <button className="previous-button" onClick={handlePrevious}>
            Previous
          </button>
          <button className="book-button" onClick={handleBook}>
            Book
          </button>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>

        {booked && <p className="success-message">Hotel booked successfully!</p>}
      </div>
    </div>
  );
};

export default HotelPopup;
