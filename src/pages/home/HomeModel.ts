import type { Recipe, RecipeCategory } from '../../types';
import { fetchRandomMeal, searchMealsByKeyword, mapMealToRecipe } from '../../services/mealService';

export class HomeModel {
  /**
   * Filters the list of recipes by category and search query.
   * Business logic isolated from React state and presentation.
   */
  static filterRecipes(
    recipes: Recipe[],
    searchQuery: string,
    category: RecipeCategory
  ): Recipe[] {
    let filtered = [...recipes];

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(
        (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query (checks title, description, or ingredients)
    const query = searchQuery.trim().toLowerCase();
    if (query !== '') {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(query))
      );
    }

    return filtered;
  }
}

/**
 * Fetches multiple random meals in parallel, removes duplicates, and converts them to Recipe items.
 * Robust against individual network query failures using try/catch wrapper per promise.
 */
export async function initialMeals(count: number = 8): Promise<Recipe[]> {
  const promises = Array.from({ length: count }, async () => {
    try {
      return await fetchRandomMeal();
    } catch (error) {
      console.warn('Skipping failed random meal fetch:', error);
      return null;
    }
  });

  const rawResults = await Promise.all(promises);
  const validMeals = rawResults.filter((meal): meal is NonNullable<typeof meal> => meal !== null);

  // De-duplicate meals by idMeal
  const uniqueMealsMap = new Map<string, typeof validMeals[0]>();
  for (const meal of validMeals) {
    uniqueMealsMap.set(meal.idMeal, meal);
  }

  // Convert raw MealDB format to Recipe interface
  return Array.from(uniqueMealsMap.values()).map(mapMealToRecipe);
}

/**
 * Searches meals by keyword using the API service and returns mapped Recipe items.
 */
export async function searchRecipes(keyword: string): Promise<Recipe[]> {
  const rawMeals = await searchMealsByKeyword(keyword);
  return rawMeals.map(mapMealToRecipe);
}
