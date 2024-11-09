import { useState } from 'react';

const TouristDetails = ({ tourist }) => {
 

  return (
    <div className="tourist-details">
      <h4>{tourist.Username}</h4>
      <p><strong>BookedActivities: </strong>{tourist.BookedActivity}</p>
      <p><strong>Email: </strong>{tourist.Email}</p>
      <p><strong>Nationality: </strong>{tourist.Nationality}</p>
      <p><strong>Wallet: </strong>{tourist.Wallet}</p>
      <p><strong>Job: </strong>{tourist.Job}</p>
      <p>{tourist.createdAt}</p>
     
    </div>
  );
};

export default TouristDetails;
