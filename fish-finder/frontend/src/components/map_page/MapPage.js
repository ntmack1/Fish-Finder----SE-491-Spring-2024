// src/components/map_page/MapPage.js
import React from 'react';
import InteractiveMap from './InteractiveMap';

const MapPage = () => {
    const handleSave = (lat, lng) => {
        console.log('Saved location:', lat, lng);
        // Handle the saved coordinates, e.g., save them to a database or state.
    };

    return (
        <div>
            <h1>Map Page</h1>
            <InteractiveMap onSave={handleSave} />
        </div>
    );
};

export default MapPage;
