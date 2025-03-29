import React, { useState } from "react";
import { searchRecipesByIngredients } from "../api/spoonacular";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter some ingredients.");
      return; // Don't proceed if query is empty
    }
  
    setSearched(true);
    setError(null); // Reset error before search
    setLoading(true); // Start loading
  
    try {
      const result = await searchRecipesByIngredients(query);
      console.log("API Response:", result); // Log the full response
  
      // Check the structure of the API response here in the console
      if (result && result.results) {
        console.log("Recipe results:", result.results); // Log the results specifically
        setRecipes(result.results); // If the result has a `results` key
      } else if (Array.isArray(result)) {
        console.log("Recipe list:", result); // Log the array of recipes
        setRecipes(result); // If the result is directly an array of recipes
      } else {
        console.log("No results found, empty response");
        setRecipes([]); // No recipes found
      }
    } catch (error) {
      setError("An error occurred while fetching recipes.");
      console.error("Search Error:", error);
    } finally {
      setLoading(false); // Stop loading after the search is completed
    }
  };
  

  return (
    <div>
      <h1>Find Recipes</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma separated)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {loading ? ( // Show loading spinner or message while waiting for the response
        <p>Loading...</p>
      ) : (
        <div className="recipe-list">
          {searched && recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
