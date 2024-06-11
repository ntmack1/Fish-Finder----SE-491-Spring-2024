// src/components/map_page/MapPage.js
import React from 'react';
import InteractiveMap from './InteractiveMap';
import Header from "../header/Header";
import ReactGA from 'react-ga4';

const MapPage = () => {
    const handleSave = (lat, lng) => {
        console.log('Saved location:', lat, lng);
        // Send coordinates to Google Analytics as an event
        try {
            ReactGA.event({
                name: 'saved_location',
                params: {
                    latitude: lat,
                    longitude: lng,
                    coordinates: `(${lat}, ${lng})`
                }
            });
            console.log('GA event sent: ', { name: 'saved_location', params: { latitude: lat, longitude: lng, coordinates: `(${lat}, ${lng})` } });
        } catch (error) {
            console.error('Error sending GA event: ', error);
        }
    };

    return (
        <div>
            <Header />
            <h1>Map Page</h1>
            <InteractiveMap onSave={handleSave} />
        </div>
    );
};

export default MapPage;
