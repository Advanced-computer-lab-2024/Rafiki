import { useEffect, useState } from "react";
import MuseumForm from '../components/museumForm';
import MuseumDetails from '../components/museumDetails';
//import museum from '../backend/models/museum'

const TourismGovernorDashboard = () => {
    // const [museum, setmuseum] = useState([]); // Initialize museum
    const [museums, setMuseums] = useState(''); // Initialize museums as an array

    const [isSellerVisible, setIsSellerVisible] = useState(false);
   
  
    
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
  
    // Toggle seller details visibility
    const handleSellerClick = () => {
      setIsSellerVisible(!isSellerVisible);
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
        
        
        <MuseumForm/></div>
           
    );
};

export default TourismGovernorDashboard;
