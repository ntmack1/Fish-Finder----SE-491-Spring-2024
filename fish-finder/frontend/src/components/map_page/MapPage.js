// src/components/map_page/MapPage.js
import React from 'react';
import InteractiveMap from './InteractiveMap';
import Header from "../header/Header";
import '../home_page/HomePage.css'
import ReactGA from 'react-ga4';

const MapPage = () => {
    const handleSave = (lat, lng) => {
        console.log('Saved location:', lat, lng);
        // Send coordinates to Google Analytics as an event
        try {
            ReactGA.event({
                category: 'Map',
                action: 'Saved Location',
                label: `Coordinates: (${lat}, ${lng})`,
                value: 1, // Example value, can be omitted or set as needed
                nonInteraction: false, // Set to true if the event shouldn't affect bounce rate

                // GA4 specific parameters
                name: 'saved_location', // GA4 event name
                params: {
                    latitude: lat,
                    longitude: lng,
                    coordinates: `(${lat}, ${lng})`
                }
            });
            console.log('GA event sent: ', { category: 'Map', action: 'Saved Location', label: `Coordinates: (${lat}, ${lng})`, params: { latitude: lat, longitude: lng, coordinates: `(${lat}, ${lng})` } });
        } catch (error) {
            console.error('Error sending GA event: ', error);
        }
    };

    return (
        <div className='hero'>
            <div>
                <Header />
                <h1>Map Page</h1>
                <InteractiveMap onSave={handleSave} />
            </div>
        </div>
    );
};

export default MapPage;
