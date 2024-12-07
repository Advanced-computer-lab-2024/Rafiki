import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';

import { Elements } from '@stripe/react-stripe-js'; // Import Elements provider
import { loadStripe } from '@stripe/stripe-js'; // Load Stripe public key
import UnifiedLogin from './pages/UnifiedLogin'
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
import AdvertiserSignup from './pages/advertiserSignup';
import CheckoutPage from './pages/CheckoutPage';
import ProductCheckout from './pages/ProductCheckout';
import OrdersPage from './pages/OrdersPage';
import UnifiedForm from './components/UnifiedForm';
const stripePromise = loadStripe('pk_test_51QRh7PGXzdUVHQQyCc38J2ratksFl7JpemgvdwUsHiLvByX2SND0SJCAIVsz1vMa339b0H5UVaOeISZt01lI7mjl00H8NkPXgw');


function App() {
  const [loggedInAdvertiser, setLoggedInAdvertiser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <FlaggedActivitiesProvider>
          {/* Wrap provider around routes */}
          <div className="pages">
            <Routes>
              
            <Route path="/signup/seller" element={<SellerForm />} />
            <Route path="/signup/unified" element={<UnifiedForm />} />
            <Route path="/login/unified" element={<UnifiedLogin />} />
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
              <Route
  path="/advertiser-signup"
  element={<AdvertiserSignup loggedInAdvertiser={loggedInAdvertiser} />}
/>
<Route
  path="/login/advertiser"
  element={<AdvertiserLogin setLoggedInAdvertiser={setLoggedInAdvertiser} />}
/>
              <Route path="/tourguide-signup" element={<TourguideSignup />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/seller-signup" element={<SellerSignup />} />
              <Route path="/GovernorDashboard" element={<GovernorDashboard />} />
              <Route path="/guestDashboard" element={<GuestDashboard />} />
              <Route path="/activities/:activityId" element={<ActivityDetailsPage />} />
              <Route path="/museums/:museumId" element={<MuseumDetailsPage />} />
              <Route path="/itinerary/:itineraryId" element={<ItineraryDetailsPage />} />
              <Route path="/login/tourist" element={<TouristLogin />} />
            
              <Route path="/login/seller" element={<SellerLogin />} />
              <Route path="/login/admin" element={<AdminLogin />} />
              <Route path="/signup/governor" element={<GovernerForm />} />
              <Route path="/signup/admin" element={<AdminForm />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            }
          />  
          <Route
            path="/ProductCheckout"
            element={
              <Elements stripe={stripePromise}>
                <ProductCheckout />
              </Elements>
            }
          />  
            </Routes>
          </div>
        </FlaggedActivitiesProvider>
        <Footer /> {/* Footer appears on all pages */}
      </BrowserRouter>
    </div>
  );
}

export default App;
