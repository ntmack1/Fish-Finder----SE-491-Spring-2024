import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Search.css';

function Search() {
    const { name } = useParams();
    const [fish, setFish] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(name || '');

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

        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/recipes/${name}`);
                console.log('Recipes:', response.data); // Add this line
                if (response.data) {
                    setRecipes(response.data);
                } else {
                    setRecipes([]);
                }
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
                setRecipes([]);
            }
        };

        fetchFish();
        fetchRecipes();
    }, [name]);

    return (
        <div className={`Search ${fish ? 'fish-found' : ''}`}>
            <h1 className="title">Fish Finder</h1>
            <Link to="/register" className="register-button">Register</Link>
            <form action={`/search/${search}`}>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search"
                />
            </form>
            {error && <p className="error">{error}</p>}
            {fish && (
                <div className="fish-info">
                    <h2>{fish.name} {fish.meta && fish.meta.binomial_name && <i>({fish.meta.binomial_name.split(/(?=[A-Z][^A-Z])/g).join(" ")})</i>}</h2>
                    {fish.img_src_set && Object.keys(fish.img_src_set).length > 0 &&
                        <img src={Object.values(fish.img_src_set)[0]} alt={fish.name} />}
                    {fish.meta && (
                        <div>
                            {fish.meta.genera && <p><strong>Genera:</strong> {fish.meta.genera}</p>}
                            {fish.meta.synonyms && <p><strong>Synonyms:</strong> {fish.meta.synonyms}</p>}
                            {fish.meta.conservation_status && <p><strong>Conservation Status:</strong> {fish.meta.conservation_status}</p>}
                        </div>
                    )}
                    {fish.meta && fish.meta.scientific_classification && (
                        <div>
                            {['domain', 'kingdom', 'subkingdom', 'phylum', 'subphylum', 'class', 'subclass', 'infraclass', 'superorder', 'order', 'suborder', 'infraorder', 'parvorder', 'superfamily', 'family', 'subfamily', 'tribe', 'subtribe', 'genus', 'subgenus', 'species', 'subspecies'].map(key => (
                                fish.meta.scientific_classification[key] && <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {fish.meta.scientific_classification[key]}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {recipes.length > 0 ? (
                <div className="recipe-list">
                    <h2>Recipes</h2>
                    <ul>
                        {recipes.map((recipe, index) => (
                            <li key={index}>
                                <Link to={`/recipe/${recipe}`}>{recipe}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No recipes available for this fish.</p>
            )}
        </div>
    );
}

export default Search;
