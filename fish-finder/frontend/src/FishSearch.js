import React, { useState } from 'react';
import axios from 'axios';
import './FishSearch.css'; // Import the CSS file

function FishSearch() {
    const [name, setName] = useState('');
    const [fish, setFish] = useState(null);
    const [error, setError] = useState(null);

    const search = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
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

    return (
        <div className={`FishSearch ${fish ? 'fish-found' : ''}`}>
            <h1 className="title">Fish Finder</h1>
            <form onSubmit={search}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

export default FishSearch;
