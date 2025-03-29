import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchRecipesByIngredients } from "../api/spoonacular";
import "./Home.css";

const dietCategories = [
  { name: "Vegan", path: "/recipelist?diet=vegan", image: "/images/vegan.jpg" },
  { name: "Vegetarian", path: "/recipelist?diet=vegetarian", image: "/images/vegetarian.jpg" },
  { name: "Keto", path: "/recipelist?diet=keto", image: "/images/keto.jpg" },
  { name: "Paleo", path: "/recipelist?diet=paleo", image: "/images/paleo.jpg" },
  { name: "Pescatarian", path: "/recipelist?diet=pescatarian", image: "/images/pescatarian.jpg" },
  { name: "Dairy-Free", path: "/recipelist?diet=dairy-free", image: "/images/dairy-free.jpg" },
  { name: "Gluten-Free", path: "/recipelist?diet=gluten-free", image: "/images/gluten-free.jpg" },
];

const nutrientCategories = [
  { name: "High Protein", path: "/recipelist?nutrient=high-protein", image: "/images/high-protein.jpg" },
  { name: "Fiber Rich", path: "/recipelist?nutrient=fiber-rich", image: "/images/fiber-rich.jpg" },
  { name: "Low Carb", path: "/recipelist?nutrient=low-carb", image: "/images/low-carb.webp" },
  { name: "Low Fat", path: "/recipelist?nutrient=low-fat", image: "/images/low-fat.jpg" },
  { name: "High Iron", path: "/recipelist?nutrient=high-iron", image: "/images/high-iron.avif" },
  { name: "Low Sodium", path: "/recipelist?nutrient=low-sodium", image: "/images/low-sodium.png" },
  { name: "Omega-3 Rich", path: "/recipelist?nutrient=omega3-rich", image: "/images/omega3-rich.png" },
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

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
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="home-title">Find Recipes</h1>

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

      {/* Recipe List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="recipecard flex flex-col items-center bg-white border rounded-lg shadow-md p-4 hover:bg-gray-100 transition"
            style={{ textDecoration: "none", color: "inherit" }}
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

      {/* Diet Categories */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Explore by Diet</h2>
      <div className="diet-grid">
        {dietCategories.map((category) => (
          <Link to={category.path} key={category.name} className="diet-card">
            <img src={category.image} alt={category.name} />
            <p className="mt-2 font-medium">{category.name}</p>
          </Link>
        ))}
      </div>

      {/* Nutrient-Based Categories */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Explore by Nutrient</h2>
      <div className="diet-grid">
        {nutrientCategories.map((category) => (
          <Link to={category.path} key={category.name} className="diet-card">
            <img src={category.image} alt={category.name} />
            <p className="mt-2 font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
