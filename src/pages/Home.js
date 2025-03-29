import React, { useState } from "react";
import { searchRecipesByIngredients } from "../api/spoonacular";
import RecipeCard from "../components/RecipeCard";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const result = await searchRecipesByIngredients(query);
    setRecipes(result);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Find Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
