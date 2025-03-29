import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Browse.css"; 

const Browse = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="browse-container">
      <h1 className="browse-title">Browse Recipes</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <h3>{recipe.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Browse;
