import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TouristHomePage from './pages/TouristHomePage';
import GuideHomePage from './pages/GuideHomePage';
import AdvHomePage from './pages/AdvHomePage'
import GuideSignup from './pages/GuideSignup'
import Home from './pages/Home'
import TouristSignup from './pages/TouristSignup'
import AdvActivityform from './pages/AdvActivityform'
import AdvActivityform from './pages/TourismManagerMuseum'
import TourismManagerMuseum from './pages/TourismManagerMuseum';




const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tourist-signup" element={<TouristSignup />} />
                <Route path="/guide-signup" element={<GuideSignup />} />
                <Route path="/tourist-homepage" element={<TouristHomePage />} />
                <Route path="/guide-homepage" element={<GuideHomePage />} />
                <Route path="/adv-homepage" element={<AdvHomePage />} />
                <Route path="/adv-activityform" element={<AdvActivityform />} />
                <Route path="/adv-tourismManagerMuseum" element={<TourismManagerMuseum />} />

            </Routes>
        </Router>
    );
};

export default App;
