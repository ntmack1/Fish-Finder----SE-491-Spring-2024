import React, { useState } from 'react';
import axios from 'axios';

function FishSearch() {
    const [name, setName] = useState('');
    const [fish, setFish] = useState(null);

    const search = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/fish/${name}`);
            setFish(response.data);
        } catch (error) {
            console.error('Failed to fetch fish:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter fish name"
            />
            <button onClick={search}>Search</button>

            {fish && (
                <ul>
                    <li><strong>Name:</strong> {fish.name}</li>
                    <li><strong>ID:</strong> {fish.id}</li>
                    {/* Add more fields as needed */}
                </ul>
            )}
        </div>
    );
}

export default FishSearch;