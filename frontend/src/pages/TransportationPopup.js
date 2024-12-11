import React, { useState } from 'react';
import '../TransportationPopup.css'
const TransportationPopup = ({ transportation, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booked, setBooked] = useState(false); // State to manage the booking status

  // Destructure the current transportation data
  const {
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    departureLocation,
    arrivalLocation,
    price,
    vehicleType,
    seatsAvailable
  } = transportation[currentIndex];

  // Handlers for Previous and Next buttons
  const handlePrevious = () => {
    setBooked(false); // Reset the booked message on navigation
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? transportation.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setBooked(false); // Reset the booked message on navigation
    setCurrentIndex((prevIndex) => (prevIndex === transportation.length - 1 ? 0 : prevIndex + 1));
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
        <h2>Departure Date: {departureDate}</h2>
        <h2 className="title">Transportation Details</h2>
        <p className="location">From: {departureLocation}</p>
        <p className="location">To: {arrivalLocation}</p>
        <p className="details">Departure Time: {departureTime}</p>
        <p className="details">Arrival Time: {arrivalTime}</p>
        <p className="details">Duration: {(new Date(arrivalDate) - new Date(departureDate)) / (1000 * 60 * 60)} hours</p>
        <p className="details">Price: ${price.toFixed(2)}</p>
        <p className="details">Vehicle Type: {vehicleType}</p>
        <p className="details">Seats Available: {seatsAvailable}</p>
        
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

        {booked && <p className="success-message">Transportation booked successfully!</p>}
      </div>
    </div>
  );
};

export default TransportationPopup;
