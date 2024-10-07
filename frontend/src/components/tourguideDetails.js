const tourguideDetails = ({ tourguide }) => {

    return (
      <div className="workout-details">
        <h4>{tourguide.Username}</h4>
        <p><strong>Email: </strong>{tourguide.Email}</p>
        <p><strong>Nationalty: </strong>{tourguide.Nationalty}</p>
        <p>{tourguide.createdAt}</p>
      </div>
    )
  }
  
  export default tourguideDetails