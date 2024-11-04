import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActivityDetailsWrapper from './components/ActivityDetailsWrapper';

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import TouristSignup from './pages/touristSignup'
import AdvertiserSignUp from './pages/advertiserSignup'
import TourguideSignup from './pages/tourguideSignup'
import AdminDashboard from './pages/adminDashboard'
import SellerSignup from './pages/sellerSignup'
import GovernorDashboard from './pages/GovernorDashboard'
import GuestDashboard from './pages/guestDashboard'
import { FlaggedActivitiesProvider } from './FlaggedActivitiesContext' // Import the provider

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <FlaggedActivitiesProvider> {/* Wrap provider around routes */}
          <div className="pages">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route path="/tourist-signup" element={<TouristSignup />} />
              <Route path="/advertiser-signup" element={<AdvertiserSignUp />} />
              <Route path="/tourguide-signup" element={<TourguideSignup />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/seller-signup" element={<SellerSignup />} />
              <Route path="/GovernorDashboard" element={<GovernorDashboard />} />
              <Route path="/guestDashboard" element={<GuestDashboard />} />
            </Routes>
          </div>
        </FlaggedActivitiesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
