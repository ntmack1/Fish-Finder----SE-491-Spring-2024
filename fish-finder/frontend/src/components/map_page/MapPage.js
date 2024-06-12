// src/components/map_page/MapPage.js
import React from 'react';
import InteractiveMap from './InteractiveMap';
import Header from "../header/Header";
import '../home_page/HomePage.css'

const MapPage = () => {
    const handleSave = (lat, lng) => {
        console.log('Saved location:', lat, lng);
        // Handle the saved coordinates, e.g., save them to a database or state.
    };

    return (
        <div className='hero'>
            <div>
                <Header/>
                <h1>Map Page</h1>
                <InteractiveMap onSave={handleSave} />
            </div>
        </div>
    );
};

export default MapPage;
