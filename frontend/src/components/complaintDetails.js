const complaintDetails = ({ complaint }) => {

    return (
      <div className="workout-details">
            <h4>Complaint Details</h4>
      <p><strong>Title: </strong>{complaint.title}</p>
      <p><strong>Date: </strong>{complaint.date}</p>
      <p><strong>Status: </strong> {complaint.status}</p>
      </div>
    )
  }
  
  export default complaintDetails