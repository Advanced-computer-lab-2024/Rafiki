const TouristDetails = ({ tourist }) => {

    return (
      <div className="workout-details">
        <h4>{tourist.Username}</h4>
        <p><strong>Email: </strong>{tourist.Email}</p>
        <p><strong>Nationalty: </strong>{tourist.Nationalty}</p>
        <p><strong>Wallet: </strong>{tourist.Wallet}</p>
        <p><strong>Job: </strong>{tourist.Job}</p>
        <p>{tourist.createdAt}</p>
      </div>
    )
  }
  
  export default TouristDetails