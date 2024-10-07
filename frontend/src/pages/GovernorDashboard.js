import { useEffect, useState } from "react";
import MuseumForm from '../components/museumForm';
import MuseumDetails from '../components/museumDetails';
import TagForm from '../components/TagForm'
import ActivityDetails from "../components/ActivityDetails"; 
//import museum from '../backend/models/museum'

const TourismGovernorDashboard = () => {
    // const [museum, setmuseum] = useState([]); // Initialize museum
    const [museums, setMuseums] = useState(''); // Initialize museums as an array

    const [isSellerVisible, setIsSellerVisible] = useState(false);
    const [activity, setActivity] = useState(null)
    const [isVisible2, setIsVisible2] = useState(false);
  
    
    const fetchmuseum = async () => {
      const response = await fetch('/api/museumRoute');
      const json = await response.json();
      if (response.ok) {
        setMuseums(json); // Set the state with the fetched museum
      } else {
        console.error('Error fetching museum:', json); // Log errors
      }
    };
  
    
  
    useEffect(() => {
      fetchmuseum(); // Fetch museum when the component mounts
      
    }, []);
    useEffect(() => {
      const fetchActivities = async () => {
        const response = await fetch('/api/ActivityRoute')
        const json = await response.json()
  
        if (response.ok) {
          setActivity(json)
        }
      }
  
      fetchActivities()
    }, [])
  
    // Toggle seller details visibility
    const handleSellerClick = () => {
      setIsSellerVisible(!isSellerVisible);
    };
    const handleClick2 = () => {
      setIsVisible2(!isVisible2);
    };

    return (

        <div>
        <h2>Governer Dashboard</h2>
        <button onClick={handleSellerClick}>
          {isSellerVisible ? 'Hide' : 'Show'} Musuem Details
        </button>
        {isSellerVisible && (
          <div className="museum">
            {museums.length > 0 ? (
              museums.map(museum => (
                <MuseumDetails museum={museum} key={museum._id} />
              ))
            ) : (
              <p>No museums found.</p>
            )}
          </div>
        )}
        
        <TagForm/>
        <button onClick={handleClick2}>
        {isVisible2 ? 'Hide' : 'Show'}  Activities
      </button>

      {isVisible2 && (
    <div className="workouts">
        {activity && activity.map(activity => (
          <ActivityDetails activity={activity} key={activity._id} />
        ))}
      </div>
      )}
        <MuseumForm/></div>
         
    );
};

export default TourismGovernorDashboard;
