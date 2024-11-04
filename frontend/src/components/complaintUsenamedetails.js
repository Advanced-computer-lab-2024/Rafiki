const ComplaintUsernameDetails = ({ complaint }) => {

    return (
      <div className="workout-details">
        <h4>{complaint.title}</h4>
        <p><strong>Date: </strong>{complaint.date}</p>
        <p><strong>Description: </strong>{complaint.body}</p>
        <p><strong>Status: </strong>{complaint.status}</p>
        <p><strong>Reply: </strong>{complaint.reply}</p>
      </div>
    )
  }
  
  export default ComplaintUsernameDetails;