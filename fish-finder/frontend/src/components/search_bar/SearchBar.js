// src/components/search_bar/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
    const [search, setSearch] = useState('');

    return (
        <form action={`/search/${search}`} className="search-bar">
            <label for="search-input">
                <input
                    id="search-input"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search"
                />
            </label>
        </form>
    );
}

export default SearchBar;
