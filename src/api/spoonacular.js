import axios from "axios";

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

// Search recipes by ingredients
export const searchRecipesByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        ingredients: ingredients,
        number: 10,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

// Get detailed recipe information
export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: { apiKey: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};
