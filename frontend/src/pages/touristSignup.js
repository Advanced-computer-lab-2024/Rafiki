import { useEffect, useState } from "react"

// components
import TouristForm from "../components/touristForm"
import TouristDetails from "../components/TouristDetails"
const TouristSignup= () => {
    const [tourists, setTourists] = useState(null)
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/TouristRoute')
      const json = await response.json()

      if (response.ok) {
        setTourists(json)
      }
    }

    fetchWorkouts()
  }, [])

  const handleClick = () => {
    setIsVisible(!isVisible);
  };


  return (
   
    
    <div className>
        <h2>Tourist Dashboard</h2>
        <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'}  Tourist Details
      </button>

      {isVisible && (
        <div className="workouts">
        {tourists && tourists.map(tourist => (
          <TouristDetails tourist={tourist} key={tourist._id} />
        ))}
      </div>
      )}
      
    <TouristForm />
    </div>

  )
}

export default TouristSignup