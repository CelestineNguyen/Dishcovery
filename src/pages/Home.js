import React, { useState } from "react";
import { searchRecipesByIngredients } from "../api/spoonacular";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const result = await searchRecipesByIngredients(query);
    setRecipes(result);
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
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
