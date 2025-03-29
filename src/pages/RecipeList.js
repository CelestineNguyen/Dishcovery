import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchRecipesByFilter } from "../api/spoonacular";
import { Link } from "react-router-dom";
// import "./RecipeList.css"; // Ensure you have styles for better layout

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useQuery();
  const diet = query.get("diet");
  const nutrient = query.get("nutrient");

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!diet && !nutrient) return; // No filter selected

      setLoading(true);
      setError("");

      try {
        const result = await searchRecipesByFilter({ diet, nutrient });
        if (result.length === 0) {
          setError("No recipes found for this category.");
        }
        setRecipes(result);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [diet, nutrient]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
  {diet
    ? `${diet.charAt(0).toUpperCase() + diet.slice(1)} Recipes`
    : nutrient
    ? `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} Recipes`
    : "Recipes"}
</h1>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="recipe-card flex flex-col items-center bg-white border rounded-lg shadow-md p-4 hover:bg-gray-100 transition"
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
    </div>
  );
};

export default RecipeList;
