import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const [name, setName] = useState('');

    return (
        <div className="HomePage">
            <h1 className="title">Fish Finder</h1>
            <Link to="/register" className="register-button">Register</Link>
            <form action={`/search/${name}`}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Search"
                />
            </form>
        </div>
    );
}

export default HomePage;
