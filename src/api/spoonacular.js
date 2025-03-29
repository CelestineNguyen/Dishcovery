import axios from "axios";

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

// Search recipes by ingredients
export const searchRecipesByIngredients = async (ingredients) => {
    if (!ingredients) return [];
  
    const url = `${BASE_URL}/findByIngredients?apiKey=${API_KEY}&ingredients=${encodeURIComponent(
      ingredients
    )}&number=1`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching recipes by ingredients:", error);
      return [];
    }
  };
 

export const searchRecipesByFilters = async ({ diet, nutrient }) => {
    const apiKey = "YOUR_SPOONACULAR_API_KEY";
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=1`;
  
    if (diet) url += `&diet=${diet}`;
    // if (nutrient) url += `&min${nutrient}=10`;
  
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
  };
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        ingredients: ingredients,
        number: 2, // change this to change the number of displayed images
        apiKey: API_KEY,
      },
    });
    console.log("Raw API Response:", response.data); // Debugging API response
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
