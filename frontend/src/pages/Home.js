// import { useEffect, useState } from "react"

// components

import { Link } from 'react-router-dom';
const Home = () => {
  // const [workouts, setWorkouts] = useState(null)

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     const response = await fetch('/api/workouts')
  //     const json = await response.json()

  //     if (response.ok) {
  //       setWorkouts(json)
  //     }
  //   }

  //   fetchWorkouts()
  // }, [])

  return (
    <div>
      <header>
    {/* <h1>Rafiki</h1> */}
   </header>
 
        <h2>Choose your path:</h2>
        <div>
          <Link to="/tourist-signup">
                    Register as a Tourist<span className="arrow">→</span>
                </Link></div>
          <div>
                <Link to="/advertiser-signup">
                    Register as an Advertiser<span className="arrow">→</span>
                </Link></div>

                <div>
                <Link to="/tourguide-signup">
                    Register as a TourGuide<span className="arrow">→</span>
                </Link></div>

                <div>
                <Link to="/adminDashboard">
                    AdminDashboard<span className="arrow">→</span>
                </Link></div>
                <Link to="/seller-signup">
          Register as a Seller<span className="arrow">→</span>
        </Link>
    </div>
    
    // <div className="home">
    //   <div className="workouts">
    //     {workouts && workouts.map(workout => (
    //       <WorkoutDetails workout={workout} key={workout._id} />
    //     ))}
    //   </div>
    //   <WorkoutForm />
    // </div>

  )
}

export default Home