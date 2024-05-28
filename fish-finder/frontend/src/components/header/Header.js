// src/components/header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="Header">
            <Link to="/" className="title">Fish Finder</Link>
            <div className="buttons">
                <Link to="/register" className="register-button">Register</Link>
                <Link to="/map" className="map-button">Map</Link>
                <Link to="/profile" className="profile-button">Profile</Link>
            </div>
        </div>
    );
}

export default Header;

