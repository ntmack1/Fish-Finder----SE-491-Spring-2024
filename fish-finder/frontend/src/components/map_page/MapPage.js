// src/components/map_page/MapPage.js
import React from 'react';
import InteractiveMap from './InteractiveMap';
import Header from "../header/Header";

const MapPage = () => {
    const handleSave = (lat, lng) => {
        console.log('Saved location:', lat, lng);
        // Handle the saved coordinates, e.g., save them to a database or state.
    };

    return (
        <div>
            <Header/>
            <h1>Map Page</h1>
            <InteractiveMap onSave={handleSave} />
        </div>
    );
};

export default MapPage;
