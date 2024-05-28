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
                if (response.data) {
                    setRecipe(response.data);
                }
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
                <p><strong>Preparation Time:</strong> {recipe.readyInMinutes} minutes</p>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.extendedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                    ))}
                </ul>
                <h2>Instructions</h2>
                <p>{recipe.instructions}</p>
                <h2>Nutrition</h2>
                <ul>
                    {recipe.nutrition.nutrients.map((nutrient, index) => (
                        <li key={index}>{nutrient.amount} {nutrient.unit} {nutrient.title}</li>
                    ))}
                </ul>
            </div>
        ) : (
            <p>Loading...</p>
        )
    );
}

export default Recipe;
