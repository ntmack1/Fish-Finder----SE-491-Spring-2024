// src/components/header/Header.js
import React from 'react';
import './Header.css';
import logo from '../../media/logo.png'

function Header() {
    return (
        <div className="Header">
            <nav>
            <a href='/'><img src={logo} className = "logo" alt='The Logo'/></a>
                <ul>
                    <li><a href='/register'>Register</a></li>
                    <li><a href='login'>Sign In</a></li>
                    <li><a href='/map'>Map</a></li>
                    <li><a href='/profile'>Profile</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;

