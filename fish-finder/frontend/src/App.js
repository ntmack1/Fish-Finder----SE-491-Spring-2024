import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Paths } from './components/Paths';
import HomePage from './components/home_page/HomePage'; // Import the HomePage component
import MapPage from './components/map_page/MapPage'; // Import the MapPage component

function UsePageViews() {
    let location = useLocation();
    useEffect(() => {
        ReactGA.send('page_view', {
            page_path: location.pathname,
            page_location: window.location.href
        });

        ReactGA.event({
            category: 'Page View',
            action: `${location.pathname} Page Visited`,
            label: `${location.pathname} Page`
        });
    }, [location]);
    return null;
}

function App() {
    // Initialize react-ga4 with your Google Analytics Measurement ID
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID); // create a .env file in the root directory and add REACT_APP_GOOGLE_ANALYTICS_ID=YOUR_MEASUREMENT_ID

    return (
        <Router>
            <UsePageViews />
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/*" element={<Paths />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
