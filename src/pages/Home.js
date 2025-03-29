import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchRecipesByIngredients } from "../api/spoonacular";

const dietCategories = [
  { name: "Vegan", path: "/browse?diet=vegan", image: "/images/vegan.jpg" },
  { name: "Vegetarian", path: "/browse?diet=vegetarian", image: "/images/vegetarian.jpg" },
  { name: "Keto", path: "/browse?diet=keto", image: "/images/keto.jpg" },
  { name: "Paleo", path: "/browse?diet=paleo", image: "/images/paleo.jpg" },
  { name: "Pescatarian", path: "/browse?diet=pescatarian", image: "/images/pescatarian.jpg" },
  { name: "Dairy-Free", path: "/browse?diet=dairy-free", image: "/images/dairy-free.jpg" },
  { name: "Gluten-Free", path: "/browse?diet=gluten-free", image: "/images/gluten-free.jpg" },
];

import RecipeCard from "../components/RecipeCard";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty search
    setLoading(true);
    setError(""); // Reset error message

    try {
      console.log("Searching for recipes with:", query);
      const result = await searchRecipesByIngredients(query);
      console.log("API Response:", result);

      if (!result || result.length === 0) {
        setError("No recipes found. Try different ingredients.");
      }
      setRecipes(result || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);

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

    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Find Recipes</h1>

      {/* Search Input */}
      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          className="p-2 border rounded w-64"
          placeholder="Enter ingredients (comma separated)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Recipe List with Button-like Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="flex flex-col items-center bg-white border rounded-lg shadow-md p-4 hover:bg-gray-100 transition"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{recipe.title}</h2>
          </Link>
        ))}
      </div>

      {/* Diet-Based Categories */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Explore by Diet</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dietCategories.map((category) => (
          <Link to={category.path} key={category.name} className="text-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 object-cover rounded-lg shadow-md hover:opacity-80 transition"
            />
            <p className="mt-2 font-medium">{category.name}</p>
          </Link>
        ))}

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
