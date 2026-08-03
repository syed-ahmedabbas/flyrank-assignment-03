import type { MealDBResponse, MealDBMeal, Recipe } from '../types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Maps a raw MealDBMeal object into the application's clean Recipe object.
 */
export function mapMealToRecipe(meal: MealDBMeal): Recipe {
  const ingredients: string[] = [];

  // TheMealDB structure provides ingredients and measures in numbered properties
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      const combined = measure && measure.trim() !== ''
        ? `${measure.trim()} ${ingredient.trim()}`
        : ingredient.trim();
      ingredients.push(combined);
    }
  }

  // Split multi-line instructions into array steps
  let instructions: string[] = [];
  if (meal.strInstructions) {
    instructions = meal.strInstructions
      .split(/\r?\n/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0 && !/^\d+\.?$/.test(step));
  }

  if (instructions.length === 0 && meal.strInstructions) {
    instructions = [meal.strInstructions.trim()];
  }

  // Derive stable preparation time, cook time, and difficulty from the meal ID to ensure rich UI visualization
  const idNum = parseInt(meal.idMeal, 10) || 0;
  const prepTime = 10 + (idNum % 16); // 10 to 25 mins
  const cookTime = 15 + (idNum % 31); // 15 to 45 mins
  
  const difficultyOptions: Recipe['difficulty'][] = ['Easy', 'Medium', 'Hard'];
  const difficulty = difficultyOptions[idNum % 3];

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    description: meal.strArea 
      ? `A traditional ${meal.strArea} recipe categorized under ${meal.strCategory || 'general dishes'}.` 
      : `A delicious ${meal.strCategory || 'dish'} recipe.`,
    category: meal.strCategory || 'Other',
    ingredients,
    instructions,
    prepTime,
    cookTime,
    difficulty,
    imageUrl: meal.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  };
}

/**
 * Searches meals by keyword using TheMealDB API.
 * Throws clear, readable error messages if the response fails.
 */
export async function searchMealsByKeyword(keyword: string): Promise<MealDBMeal[]> {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(keyword)}`);

    if (!response.ok) {
      throw new Error(`HTTP network error with status: ${response.status} ${response.statusText}`);
    }

    const data: MealDBResponse = await response.json();

    if (!data || !data.meals) {
      return [];
    }

    return data.meals;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search meals for keyword "${keyword}": ${error.message}`);
    }
    throw new Error(`An unknown error occurred while searching meals for keyword "${keyword}".`);
  }
}

/**
 * Fetches a random meal from TheMealDB API.
 * Throws clear, readable error messages if the response fails.
 */
export async function fetchRandomMeal(): Promise<MealDBMeal> {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);

    if (!response.ok) {
      throw new Error(`HTTP network error with status: ${response.status} ${response.statusText}`);
    }

    const data: MealDBResponse = await response.json();

    if (!data || !data.meals || data.meals.length === 0) {
      throw new Error('No meal data returned from the API.');
    }

    return data.meals[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch a random meal: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching a random meal.');
  }
}
