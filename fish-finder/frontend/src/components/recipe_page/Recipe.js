import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/recipe/${id}`);
                console.log(response.data); // Log the response data
                setRecipe(response.data);
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    return (
        recipe ? (
            <div className="Recipe">
                <h1>{recipe.title}</h1>
                <img src={recipe.image} alt={recipe.title} />
                <p>Ready in {recipe.readyInMinutes} minutes</p>
                {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
                    <div>
                        <h2>Ingredients</h2>
                        <ul>
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.original}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps && (
                    <div>
                        <h2>Instructions</h2>
                        <ol>
                            {recipe.analyzedInstructions[0].steps.map((step, index) => (
                                <li key={index}>{step.step}</li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        ) : (
            <p>Loading recipe...</p>
        )
    );
}

export default Recipe;

