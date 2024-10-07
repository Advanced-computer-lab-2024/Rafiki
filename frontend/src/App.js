import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import TouristSignup from './pages/touristSignup'
// import TouristHomePage from './pages/tourist-Homepage'
import AdvertiserSignUp from './pages/advertiserSignup'
import TourguideSignup from './pages/tourguideSignup'
import AdminDashboard from './pages/adminDashboard'
import SellerSignup from './pages/sellerSignup'
import GovernorDashboard from './pages/GovernorDashboard'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route path="/tourist-signup" element={<TouristSignup />} />
            {/* <Route path="/tourist-homepage" element={<TouristHomePage/>} /> */}
            <Route path="/advertiser-signup" element={<AdvertiserSignUp/>} />
            <Route path="/tourguide-signup" element={<TourguideSignup/>} />
            <Route path="/adminDashboard" element={<AdminDashboard/>} />
            <Route path="/seller-signup" element={<SellerSignup/>} />
            <Route path="/GovernorDashboard" element={<GovernorDashboard/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

