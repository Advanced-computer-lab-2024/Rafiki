import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
import ActivityDetailsPage from './pages/ActivityDetailsPage'
import MuseumDetailsPage from './pages/MusuemDetailsPage';
import ItineraryDetailsPage from './pages/itineraryDetailsPage';
import { FlaggedActivitiesProvider } from './FlaggedActivitiesContext' // Import the provider
import Hero from './components/Hero'; // Import Hero
import Footer from './components/Footer'; // Import Footer
import AboutUs from './pages/AboutUs'
import SignupPaths from './pages/SignupPaths';
// function App() {

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <FlaggedActivitiesProvider> {/* Wrap provider around routes */}
//           <div className="pages">
//             <Routes>
//               <Route 
//                 path="/" 
//                 element={<Home />} 
//               />
//               <Route path="/tourist-signup" element={<TouristSignup />} />
//               <Route path="/advertiser-signup" element={<AdvertiserSignUp />} />
//               <Route path="/tourguide-signup" element={<TourguideSignup />} />
//               <Route path="/adminDashboard" element={<AdminDashboard />} />
//               <Route path="/seller-signup" element={<SellerSignup />} />
//               <Route path="/GovernorDashboard" element={<GovernorDashboard />} />
//               <Route path="/guestDashboard" element={<GuestDashboard />} />
//               <Route path="/activities/:activityId" element={<ActivityDetailsPage />} />
//               <Route path="/museums/:museumId" element={<MuseumDetailsPage />} />
//               <Route path="/itinerary/:itineraryId" element={<ItineraryDetailsPage />} />
//             </Routes>
//           </div>
//         </FlaggedActivitiesProvider>
//       </BrowserRouter>
//     </div>
//   );
// }
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <FlaggedActivitiesProvider>
          {/* Wrap provider around routes */}
          <div className="pages">
            <Routes>
              <Route path="/" element={<><Hero /></>} /> 
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
              
            </Routes>
          </div>
        </FlaggedActivitiesProvider>
        <Footer /> {/* Footer appears on all pages */}
      </BrowserRouter>
    </div>
  );
}

export default App;
