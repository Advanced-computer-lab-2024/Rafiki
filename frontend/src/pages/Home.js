

import { Link } from 'react-router-dom';
const Home = () => {
 

  return (
    <div>
      <header>
    
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
        </Link> <br/>
        <Link to="/GovernorDashboard">
          GovernorDashboard<span className="arrow">→</span>
        </Link><br/>
        <Link to="/guestDashboard">
          GuestDashboard<span className="arrow">→</span>
        </Link>
    </div>
    
    

  )
}

export default Home