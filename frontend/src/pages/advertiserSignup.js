import { useEffect, useState } from "react"

// components
import AdvertiserForm from "../components/advertiserForm"
import AdvertiserDetails from "../components/AdvertiserDetails"
import ActivityDetails from "../components/ActivityDetails"
import ActivityForm from "../components/activityForm"
const AdvertiserSignup= () => {
    const [advertisers, setAdvertiser] = useState(null)
    const [isVisible, setIsVisible] = useState(false);
    const [activity, setActivity] = useState(null)
    const [isVisible2, setIsVisible2] = useState(false);

 

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/AdvertiserRoute')
      const json = await response.json()

      if (response.ok) {
        setAdvertiser(json)
      }
    }

    fetchWorkouts()
  }, [])

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

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleClick2 = () => {
    setIsVisible2(!isVisible2);
  };

  return (
   
    
    <div className>
        <h2>Advertiser Dashboard</h2>
        <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'}  Advertiser Details
      </button>

      {isVisible && (
        <div className="workouts">
        {advertisers && advertisers.map(advertiser => (
          <AdvertiserDetails advertiser={advertiser} key={advertiser._id} />
        ))}
      </div>
      )}
      
    <AdvertiserForm />
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
<ActivityForm/>
    
    </div>

  )
}

export default AdvertiserSignup