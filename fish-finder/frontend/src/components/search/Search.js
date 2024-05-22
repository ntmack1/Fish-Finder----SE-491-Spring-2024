import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Search.css';

function Search() {
    const { name } = useParams();
    const [fish, setFish] = useState(null);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(name || ''); // Add a state for the search input

    useEffect(() => {
        const fetchFish = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/fish/${name}`);
                if (response.data) {
                    setFish(response.data);
                    setError(null);
                } else {
                    setFish(null);
                    setError('No fish found');
                }
            } catch (error) {
                console.error('Failed to fetch fish:', error);
                setFish(null);
                setError('Failed to fetch fish');
            }
        };

        fetchFish();
    }, [name]);

    return (
        <div className={`Search ${fish ? 'fish-found' : ''}`}>
            <h1 className="title">Fish Finder</h1>
            <Link to="/register" className="register-button">Register</Link>
            <form action={`/search/${search}`}> {/* Modify this line */}
                <input
                    type="text"
                    value={search} // Modify this line
                    onChange={e => setSearch(e.target.value)} // Add this line
                    placeholder="Search"
                />
            </form>
            {error && <p className="error">{error}</p>}
            {fish && (
                <div className="fish-info">
                    <h2>{fish.name}</h2>
                    {fish.img_src_set && Object.keys(fish.img_src_set).length > 0 &&
                        <img src={Object.values(fish.img_src_set)[0]} alt={fish.name} />}
                    {fish.meta && fish.meta.scientific_classification && (
                        <div>
                            {fish.meta.scientific_classification.domain && <p><strong>Domain:</strong> {fish.meta.scientific_classification.domain}</p>}
                            {fish.meta.scientific_classification.kingdom && <p><strong>Kingdom:</strong> {fish.meta.scientific_classification.kingdom}</p>}
                            {fish.meta.scientific_classification.phylum && <p><strong>Phylum:</strong> {fish.meta.scientific_classification.phylum}</p>}
                            {fish.meta.scientific_classification.classs && <p><strong>Class:</strong> {fish.meta.scientific_classification.classs}</p>}
                            {fish.meta.scientific_classification.order && <p><strong>Order:</strong> {fish.meta.scientific_classification.order}</p>}
                            {fish.meta.scientific_classification.family && <p><strong>Family:</strong> {fish.meta.scientific_classification.family}</p>}
                            {fish.meta.scientific_classification.genus && <p><strong>Genus:</strong> {fish.meta.scientific_classification.genus}</p>}
                            {fish.meta.scientific_classification.species && <p><strong>Species:</strong> {fish.meta.scientific_classification.species}</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
