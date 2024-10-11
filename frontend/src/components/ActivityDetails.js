const ActivityDetails = ({ activity }) => {

    return (
      <div className="workout-details">
            <h4>Activity Details</h4>
      <p><strong>Date: </strong>{activity.date}</p>
      <p><strong>Time: </strong>{activity.time}</p>
      <p><strong>Location: </strong> {activity.location}</p>
      <p><strong>Price: </strong>${activity.price}</p>
      <p><strong>Category: </strong>{activity.category}</p>
      <p><strong>Tags: </strong>{activity.tags}</p>
      <p><strong>Special Discounts: </strong>{activity.specialDiscounts}</p>
      <p><strong>Id: </strong>{activity.id}</p>
      <p><strong>Booking Open: </strong>{activity.isBookingOpen ? 'Yes' : 'No'}</p>
    
    
      </div>
    )
  }
  
  export default ActivityDetails