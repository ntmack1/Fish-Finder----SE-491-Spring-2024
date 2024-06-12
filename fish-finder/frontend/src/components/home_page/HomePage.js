// src/components/home_page/HomePage.js
import React from 'react';
import Header from '../header/Header';
import SearchBar from '../search_bar/SearchBar'; // Import the SearchBar component
import './HomePage.css';
import pic1 from '../../media/ft1.png'

function HomePage() {
    return (
        <div className="HomePage">
            <div className = 'hero'>
                <Header />
                    <div className='content'>
                        <h1 className='anime'>Fish <br/>Finder</h1>
                        <p className='anime'>Find the fish that you are looking for. Learn about them and how to make a tasty dish!</p>
                        <SearchBar className='anime' /> {/* Use the SearchBar component */}
                    </div>
                    <div className='col'>
                        <img src={pic1} className='feature-img anime' alt='Feature Image'/>

                    </div>
            </div>
           
            
        </div>
    );
}

export default HomePage;

