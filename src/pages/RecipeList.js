import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchRecipesByFilters } from "../api/spoonacular";
import RecipeCard from "../components/RecipeCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const query = useQuery();
  const diet = query.get("diet");
  const nutrient = query.get("nutrient");

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!diet && !nutrient) return;
      const result = await searchRecipesByFilters({ diet, nutrient });
      setRecipes(result);
    };
    fetchRecipes();
  }, [diet, nutrient]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {diet ? `${diet} Recipes` : `${nutrient} Recipes`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
