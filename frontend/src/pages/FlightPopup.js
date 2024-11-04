import React, { useState } from 'react';
import './../index.css';

const FlightPopup = ({ flights, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booked, setBooked] = useState(false); // State to manage the booking status

  // Destructure the current flight data
  const { id, itineraries, price, numberOfBookableSeats, validatingAirlineCodes } = flights[currentIndex];

  // Handlers for Previous and Next buttons
  const handlePrevious = () => {
    setBooked(false); // Reset the booked message on navigation
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flights.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setBooked(false); // Reset the booked message on navigation
    setCurrentIndex((prevIndex) => (prevIndex === flights.length - 1 ? 0 : prevIndex + 1));
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
        <h2>Flight ID: {id}</h2>
        <h3>Duration: {itineraries[0].duration}</h3>
        <p>Airline: {validatingAirlineCodes[0]}</p>
        <p>Bookable Seats: {numberOfBookableSeats}</p>
        
        <div className="itinerary-details">
          <h3>Itinerary:</h3>
          <ul>
            {itineraries[0].segments.map((segment, index) => (
              <li key={index}>
                <strong>From:</strong> {segment.departure.iataCode} (Terminal {segment.departure.terminal}) at {segment.departure.at}
                <br />
                <strong>To:</strong> {segment.arrival.iataCode} (Terminal {segment.arrival.terminal}) at {segment.arrival.at}
                <br />
                <strong>Flight Duration:</strong> {segment.duration}, Stops: {segment.numberOfStops}
              </li>
            ))}
          </ul>
        </div>

        <div className="price-details">
          <h3>Price: €{price.total}</h3>
        </div>

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

        {booked && <p className="success-message">Flight booked successfully!</p>}
      </div>
    </div>
  );
};

export default FlightPopup;
