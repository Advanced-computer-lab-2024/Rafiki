import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import SellerForm from './components/sellerForm';
import GovernerForm from './components/governerForm';
import TouristLogin from './pages/TouristLogin';
import AdminLogin from './pages/AdminLogin';
import SellerLogin from './pages/SellerLogin';
import AdvertiserLogin from './pages/AdvertiserLogin';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import TouristSignup from './pages/touristSignup'
import AdvertiserSignUp from './pages/advertiserSignup'
import TourguideSignup from './pages/tourguideSignup'
import AdminDashboard from './pages/adminDashboard'
import SellerSignup from './pages/sellerSignup'
import GovernorDashboard from './pages/GovernorDashboard'
import GuestDashboard from './pages/guestDashboard'
import ActivityDetailsPage from './pages/ActivityDetailsPage'
import MuseumDetailsPage from './pages/MusuemDetailsPage';
import ItineraryDetailsPage from './pages/itineraryDetailsPage';
import { FlaggedActivitiesProvider } from './FlaggedActivitiesContext' // Import the provider
import Hero from './components/Hero'; // Import Hero
import Footer from './components/Footer'; // Import Footer
import AboutUs from './pages/AboutUs'
import SignupPaths from './pages/SignupPaths';
import LoginPage from './pages/LoginPage';
import TourismGovernorLogin from './pages/TourismGovernorLogin';
import TourGuideLogin from './components/TourGuideLogin';
import AdminForm from './components/adminForm';
import TourguideForm from './components/tourguideForm';
import AdvertiserForm from './components/advertiserForm';
import TouristForm from './components/touristForm';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <FlaggedActivitiesProvider>
          {/* Wrap provider around routes */}
          <div className="pages">
            <Routes>
              
            <Route path="/signup/seller" element={<SellerForm />} />
              <Route path="/" element={<><Hero /></>} /> 
              <Route path="/login" element={<LoginPage />} />
              <Route path="/touristForm" element={<TouristForm />} />
              <Route path="/advertiserForm" element={<AdvertiserForm />} />
              <Route path="/tourguideForm" element={<TourguideForm />} />
              <Route path="/login/tourguide"element={<TourGuideLogin />}/>
              <Route path="/login/tourism-governor" element={<TourismGovernorLogin />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/signup-paths" element={<SignupPaths />} />
              <Route path="/tourist-signup" element={<TouristSignup />} />
              <Route path="/advertiser-signup" element={<AdvertiserSignUp />} />
              <Route path="/tourguide-signup" element={<TourguideSignup />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/seller-signup" element={<SellerSignup />} />
              <Route path="/GovernorDashboard" element={<GovernorDashboard />} />
              <Route path="/guestDashboard" element={<GuestDashboard />} />
              <Route path="/activities/:activityId" element={<ActivityDetailsPage />} />
              <Route path="/museums/:museumId" element={<MuseumDetailsPage />} />
              <Route path="/itinerary/:itineraryId" element={<ItineraryDetailsPage />} />
              <Route path="/login/tourist" element={<TouristLogin />} />
              <Route path="/login/advertiser" element={<AdvertiserLogin />} />
              <Route path="/login/seller" element={<SellerLogin />} />
              <Route path="/login/admin" element={<AdminLogin />} />
              <Route path="/signup/governor" element={<GovernerForm />} />
              <Route path="/signup/admin" element={<AdminForm />} />
            </Routes>
          </div>
        </FlaggedActivitiesProvider>
        <Footer /> {/* Footer appears on all pages */}
      </BrowserRouter>
    </div>
  );
}

export default App;
