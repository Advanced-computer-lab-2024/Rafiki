import React, { useState } from 'react';

const ComplaintDetails = ({ complaint }) => {
  const [showDetails, setShowDetails] = useState(false); // State to toggle full details
  const [isEditingReply, setIsEditingReply] = useState(false); // Toggle for reply edit mode
  const [isEditingStatus, setIsEditingStatus] = useState(false); // Toggle for status edit mode
  const [newReply, setNewReply] = useState( ''); // State for new reply
  const [newStatus, setNewStatus] = useState( ''); // State for new status

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleReplySubmit = async () => {
    try {
      const response = await fetch(`/api/complaintRoute/${complaint._id}/reply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reply: newReply }),
      });
      const updatedComplaint = await response.json();
      if (response.ok) {
        setIsEditingReply(false); // Close the reply edit mode
        // Optionally, you can update the complaints state in the parent component if needed
      } else {
        console.error(updatedComplaint.error); // Handle error
      }
    } catch (error) {
      console.error('Failed to update reply:', error);
    }
  };

  // Handle status update
  const handleStatusSubmit = async () => {
    try {
      const response = await fetch(`/api/complaintRoute/${complaint._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedComplaint = await response.json();
      if (response.ok) {
        setIsEditingStatus(false); // Close the status edit mode
        // Optionally, update the parent component's complaints state
      } else {
        console.error(updatedComplaint.error); // Handle error
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };


  return (
    <div className="workout-details">
      <h4>{complaint.title}</h4>
      <p><strong>Date: </strong>{complaint.date}</p>
      <p><strong>Status: </strong>{complaint.status}</p>

      {/* Button to show more details */}
      

      {/* Conditionally render more details */}
      {showDetails && (
        <div className="additional-details">
          <p><strong>Description: </strong>{complaint.body}</p>
          <p><strong>Reply: </strong>{complaint.reply}</p>

          {/* Edit Reply Section */}
          {isEditingReply ? (
            <div>
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows="4"
                placeholder="Enter your reply"
              />
              <div>
              </div>
              <button onClick={handleReplySubmit}>Update Reply</button>
              <button onClick={() => setIsEditingReply(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setIsEditingReply(true)}>Edit Reply</button>
          )}

          {/* Edit Status Section */}
          {isEditingStatus ? (
            <div>
              <select value={newStatus}
               onChange={(e) => setNewStatus(e.target.value)}
               >
                <option value="">Select Status</option> {/* Disabled placeholder */}
                <option value="resolved">Resolved</option>
                <option value="pending">Pending</option>
              </select>
              <div>
              </div>  
              <button onClick={handleStatusSubmit}>Update Status</button>
              <button onClick={() => setIsEditingStatus(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setIsEditingStatus(true)}>Edit Status</button>
          )}
        </div>
      )}
       <button onClick={toggleDetails}>
        {showDetails ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default ComplaintDetails;
