import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Paths } from './components/Paths';
import HomePage from './components/home_page/HomePage';
import MapPage from './components/map_page/MapPage';
import ReactGA from 'react-ga';

// Initialize Google Analytics
const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
if (trackingId) {
    ReactGA.initialize(trackingId);
    console.log('GA Initialized with Tracking ID:', trackingId);
} else {
    console.error('Google Analytics tracking ID is not defined.');
}

function App() {
    return (
        <Router>
            <GAListener>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/map" element={<MapPage />} />
                        <Route path="/*" element={<Paths />} />
                    </Routes>
                </div>
            </GAListener>
        </Router>
    );
}

function GAListener({ children }) {
    const location = useLocation();

    useEffect(() => {
        console.log('Page view:', location.pathname + location.search);
        ReactGA.pageview(location.pathname + location.search);
    }, [location]);

    return children;
}

export default App;
