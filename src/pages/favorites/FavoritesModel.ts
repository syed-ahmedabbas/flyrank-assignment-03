import type { Recipe } from '../../types';

export class FavoritesModel {
  /**
   * Filters the user's saved recipes list by a search query.
   * Business logic remains isolated from custom react hooks.
   */
  static filterFavorites(recipes: Recipe[], searchQuery: string): Recipe[] {
    const query = searchQuery.trim().toLowerCase();
    if (query === '') {
      return recipes;
    }

    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(query))
    );
  }
}
