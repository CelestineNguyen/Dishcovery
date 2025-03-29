import axios from "axios";

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const searchRecipesByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        ingredients: ingredients,
        number: 1, 
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const searchRecipesByFilter = async ({ diet, nutrient }) => {
    try {
      const params = {
        number: 1, 
        apiKey: API_KEY,
      };
  
      // Add diet filter if selected
      if (diet) params.diet = diet;
  
      // Add nutrient filters if selected
      if (nutrient) {
        if (nutrient === "high-protein") params.minProtein = 20; 
        if (nutrient === "fiber-rich") params.minFiber = 5; 
        if (nutrient === "low-carb") params.maxCarbs = 30; 
        if (nutrient === "low-fat") params.maxFat = 10;
      }
  
      const response = await axios.get(`${BASE_URL}/complexSearch`, { params });
      return response.data.results || [];
    } catch (error) {
      console.error("Error fetching filtered recipes:", error);
      return [];
    }
  };
  


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
