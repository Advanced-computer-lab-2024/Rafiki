const TourguideDetails = ({ tourguide }) => {
  return (
      <div className="tourguide-details">
          <h4>{tourguide.Username}</h4>
          <p><strong>Email: </strong>{tourguide.Email}</p>
          <p><strong>Nationality: </strong>{tourguide.Nationalty}</p>
          <p>{tourguide.createdAt}</p>
          {tourguide.Picture && (
              <div>
                  <img 
                      src={`/uploads/tourGuidePictures/${tourguide.Picture}`} 
                      alt={`${tourguide.Username}'s profile`} 
                      style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                  />
              </div>
          )}
      </div>
  );
};

export default TourguideDetails;
