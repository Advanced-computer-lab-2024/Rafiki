import { useEffect, useState } from "react"

// components
import AdvertiserForm from "../components/advertiserForm"
import AdvertiserDetails from "../components/AdvertiserDetails"
import ActivityDetails from "../components/ActivityDetails"
import ActivityForm from "../components/activityForm"
import UpdateAdvertiser from "../components/updateAdvertiser"
const AdvertiserSignup= () => {
    const [advertiser, setAdvertiser] = useState(null)
    const [isVisible, setIsVisible] = useState(false);
    const [activity, setActivity] = useState(null)
    const [isVisible2, setIsVisible2] = useState(false);
    const [selectedTourguide, setSelectedTourguide] = useState(null);
 

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
  const handleUpdate = (tourguide) => {
    setSelectedTourguide(tourguide);
};

  return (
   
    
    <div className>
        <h2>Advertiser Dashboard</h2>
        <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'}  Advertiser Details
      </button>
      {isVisible && (
                <div className="workouts">
                    {advertiser && advertiser.map(advertiser => (
                        <div key={advertiser._id}>
                            <AdvertiserDetails advertiser={advertiser} />
                            <button onClick={() => handleUpdate(advertiser)}>Update</button>
                        </div>
                    ))}
                </div>
            )}

      {/* {isVisible && (
        <div className="workouts">
        {advertiser && advertiser.map(advertiser => (
          <div key={advertiser._id}>
          <AdvertiserDetails advertiser={advertiser}  />
          <button onClick={() => handleUpdate(advertiser)}>Update</button>
          <div/>
        ))}
      </div>
      )} */}
      {/* <TourguideForm existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} /> */}
      <UpdateAdvertiser existingTourguide={selectedTourguide} onUpdate={() => setSelectedTourguide(null)} />
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