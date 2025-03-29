import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

const RecipeCard = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutrients, setNutrients] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );
        setRecipe(response.data);
        setNutrients(response.data.nutrition?.nutrients); 
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  const getNutrient = (name) => {
    const nutrient = nutrients?.find((n) => n.name === name);
    return nutrient ? `${nutrient.amount} ${nutrient.unit}` : "N/A";
  };

  return (
    <div className="recipe-card">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h2>Nutrition Facts</h2>
      <ul>
        <li><strong>Calories:</strong> {getNutrient("Calories")}</li>
        <li><strong>Protein:</strong> {getNutrient("Protein")}</li>
        <li><strong>Fat:</strong> {getNutrient("Fat")}</li>
        <li><strong>Carbohydrates:</strong> {getNutrient("Carbohydrates")}</li>
      </ul>
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>

      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
        Full Recipe
      </a>
    </div>
  );
};

export default RecipeCard;
