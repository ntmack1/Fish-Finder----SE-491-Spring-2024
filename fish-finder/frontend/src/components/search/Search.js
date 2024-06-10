import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Search.css';
import Header from "../header/Header";
import SearchBar from "../search_bar/SearchBar";
import AuthContext from '../../context/AuthProvider';

function Search() {
    const { name } = useParams();
    const [fish, setFish] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);

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
                console.log('Recipes:', response.data);
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

    const saveFish = async () => {
        console.log('Auth Object:', auth); // Log the entire auth object
        console.log('User ID:', auth.userId); // Log the specific userId

        try {
            await axios.post(`http://localhost:8080/api/checklist/saveFish`, {
                userUuid: auth.userId,
                fishName: name
            });
            alert('Fish saved successfully!');
        } catch (error) {
            console.error('Failed to save fish:', error);
            alert('Failed to save fish');
        }
    };

    return (
        <div className={`Search ${fish ? 'fish-found' : ''}`}>
            <Header /> {/* Add the Header component */}
            <SearchBar />
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
                    <button onClick={saveFish}>Save Fish</button>
                </div>
            )}
            {Object.keys(recipes).length > 0 ? (
                <div className="recipe-list">
                    <h2>Recipes</h2>
                    <ul>
                        {Object.entries(recipes).map(([recipe, id]) => (
                            <li key={id}>
                                <Link to={`/recipe/${id}`}>{recipe}</Link>
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