// src/components/home_page/HomePage.js
import React from 'react';
import Header from '../header/Header';
import SearchBar from '../search_bar/SearchBar'; // Import the SearchBar component
import './HomePage.css';

function HomePage() {
    return (
        <div className="HomePage">
            <Header />
            <SearchBar /> {/* Use the SearchBar component */}
        </div>
    );
}

export default HomePage;

