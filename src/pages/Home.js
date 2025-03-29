import React, { useState } from "react";
import { searchRecipesByIngredients } from "../api/spoonacular";
import RecipeCard from "../components/RecipeCard";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    setError(null); // Reset error before search

    try {
      const result = await searchRecipesByIngredients(query);
      console.log("API Response:", result); // Debugging: Log the response

      // Check if the result is an array, if not, adjust accordingly
      if (Array.isArray(result)) {
        setRecipes(result);
      } else if (result && result.results) {
        setRecipes(result.results); // Handle case where API returns in a `results` key
      } else {
        setRecipes([]);
      }
    } catch (error) {
      setError("An error occurred while fetching recipes.");
      console.error("Search Error:", error);
    }
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
      {error && <p>{error}</p>}
      <div className="recipe-list">
        {searched && recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
