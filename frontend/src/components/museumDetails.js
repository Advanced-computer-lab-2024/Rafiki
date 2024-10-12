const MuseumDetails = ({ museum}) => {
    return (
      <div className="workout-details">
        <h4>{museum.name}</h4>
        <p><strong>Description: </strong>{museum.description}</p>
        <p><strong>Location: </strong>{museum.location}</p>
        <p><strong>Opening Hours: </strong>{museum.openingHours}</p>
        <p><strong>Ticket Prices: </strong>${museum.ticketPrices}</p>
        <p><strong>Picture: </strong>{museum.pictures}</p>
        <p><strong>Tag: </strong>{museum.tag }</p>  
        {/* <button onClick={() => onEdit(museum)}>Edit</button>
        <button onClick={() => onDelete(museum._id)}>Delete</button> */}
      </div>
    );
  };
  
  export default MuseumDetails;
  