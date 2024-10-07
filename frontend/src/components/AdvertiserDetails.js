const AdvertiserDetails = ({ advertiser }) => {

    return (
      <div className="workout-details">
        <h4>{advertiser.Username}</h4>
        <p><strong>Email: </strong>{advertiser.Email}</p>
        <p><strong>Nationalty: </strong>{advertiser.Nationalty}</p>
        <p>{advertiser.createdAt}</p>
      </div>
    )
  }
  
  export default AdvertiserDetails