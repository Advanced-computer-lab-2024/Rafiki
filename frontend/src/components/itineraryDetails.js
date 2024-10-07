const ItineraryDetails = ({ itinerary }) => {
    return (
      <div className="workout-details">
        <h4>{itinerary.tourGuideUsername}</h4>
        <p><strong>Activities: </strong>{itinerary.activities}</p>
        <p><strong>Locations: </strong>{itinerary.locations}</p>
        <p><strong>Timeline: </strong>{itinerary.timeline}</p>
        <p><strong>Duration: </strong>{itinerary.duration}</p>
        <p><strong>Language: </strong>{itinerary.language}</p>
        <p><strong>Price: </strong>{itinerary.price}</p>
        <p><strong>Available Dates: </strong>{itinerary.availableDates}</p>
        <p><strong>Accessibility: </strong>{itinerary.accessibility}</p>
        <p><strong>Pickup Location: </strong>{itinerary.pickupLocation}</p>
        <p><strong>Drop Off Location: </strong>{itinerary.dropOffLocation}</p>
        <p>{itinerary.createdAt}</p>
      </div>
    )
  }
  
  export default ItineraryDetails;