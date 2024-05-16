import React, { useState } from 'react';

function FishSearch() {
    const [fishName, setFishName] = useState('');
    const [fishDetails, setFishDetails] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFishName(e.target.value);
    };

    const fetchFishDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/fish/${fishName}`);
            if (!response.ok) {
                throw new Error('Fish not found');
            }
            const data = await response.json();
            setFishDetails(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setFishDetails(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchFishDetails();
    };

    const renderMetadata = (metadata) => {
        if (!metadata || !metadata.scientific_classification) {
            return <p>No detailed classification available.</p>;
        }

        const { scientific_classification } = metadata;
        return (
            <div>
                {scientific_classification.domain && <p><strong>Domain:</strong> {scientific_classification.domain}</p>}
                {scientific_classification.kingdom && <p><strong>Kingdom:</strong> {scientific_classification.kingdom}</p>}
                {scientific_classification.phylum && <p><strong>Phylum:</strong> {scientific_classification.phylum}</p>}
                {scientific_classification.class && <p><strong>Class:</strong> {scientific_classification.class}</p>}
                {scientific_classification.order && <p><strong>Order:</strong> {scientific_classification.order}</p>}
                {scientific_classification.family && <p><strong>Family:</strong> {scientific_classification.family}</p>}
                {scientific_classification.genus && <p><strong>Genus:</strong> {scientific_classification.genus}</p>}
                {scientific_classification.species && <p><strong>Species:</strong> {scientific_classification.species}</p>}
                {scientific_classification.subfamily && <p><strong>Subfamily:</strong> {scientific_classification.subfamily}</p>}
                {scientific_classification.superfamily && <p><strong>Superfamily:</strong> {scientific_classification.superfamily}</p>}
                {scientific_classification.subgenus && <p><strong>Subgenus:</strong> {scientific_classification.subgenus}</p>}
                {scientific_classification.clade && <p><strong>Clade:</strong> {scientific_classification.clade}</p>}
            </div>
        );
    };

    return (
        <div className="fish-finder">
            <form onSubmit={handleSubmit} className="mb-3">
                <label>
                    Fish Name:
                    <input type="text" value={fishName} onChange={handleInputChange} className="form-control" />
                </label>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            {error && <p>{error}</p>}
            {fishDetails && (
                <div className="details-container d-flex justify-content-between">
                    <div className="text-details">
                        <h2>Details:</h2>
                        <p><strong>Name:</strong> {fishDetails.name}</p>
                        <h3>Metadata:</h3>
                        {renderMetadata(fishDetails.meta)}
                    </div>
                    <div className="image-container">
                        {fishDetails.img_src_set && Object.keys(fishDetails.img_src_set).length > 0 && (
                            <img src={fishDetails.img_src_set['2x'] || fishDetails.img_src_set['1.5x']} alt={fishDetails.name} className="img-fluid" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FishSearch;
