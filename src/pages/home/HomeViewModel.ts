import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '../../types';
import { FavoriteService } from '../../services/favoriteService';
import { useAuth } from '../../context/AuthContext';
import { saveFavoriteRecipe, removeFavoriteRecipe, loadFavoriteRecipes } from '../../services/firebaseService';
import { initialMeals, searchRecipes } from './HomeModel';

export function useHomeViewModel() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial recipes and synchronize user-specific favorites
  const loadInitialRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const meals = await initialMeals(8);
      
      let favIds: string[] = [];
      if (user) {
        // Load favorite recipes from Firebase Database and map to IDs
        const dbFavs = await loadFavoriteRecipes(user.uid);
        favIds = dbFavs.map((r) => r.id);
      } else {
        // Fallback to local storage for guest session
        favIds = FavoriteService.getFavoriteIds();
      }

      setRecipes(meals);
      setFavoriteIds(favIds);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while loading recipes.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadInitialRecipes();
  }, [loadInitialRecipes]);

  // Keep synced with changes to favorites occurring in other views (e.g., Favorites page deletions)
  useEffect(() => {
    const handleFavoritesUpdate = async () => {
      try {
        if (user) {
          const dbFavs = await loadFavoriteRecipes(user.uid);
          setFavoriteIds(dbFavs.map((r) => r.id));
        } else {
          setFavoriteIds(FavoriteService.getFavoriteIds());
        }
      } catch (err) {
        console.error('Failed to sync favorites update:', err);
      }
    };
    window.addEventListener('favorites-updated', handleFavoritesUpdate);
    return () => {
      window.removeEventListener('favorites-updated', handleFavoritesUpdate);
    };
  }, [user]);

  // Search meals by keyword
  const handleSearch = useCallback(async (searchTerm: string) => {
    setQuery(searchTerm);
    try {
      setIsLoading(true);
      setError(null);
      
      let meals: Recipe[] = [];
      if (searchTerm.trim() === '') {
        meals = await initialMeals(8);
      } else {
        meals = await searchRecipes(searchTerm);
      }

      setRecipes(meals);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching for meals.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Toggle favorite recipe command
  const toggleFavorite = useCallback(async (id: string) => {
    try {
      if (user) {
        const isFav = favoriteIds.includes(id);
        if (isFav) {
          await removeFavoriteRecipe(user.uid, id);
          setFavoriteIds((prev) => prev.filter((fId) => fId !== id));
        } else {
          const recipeToSave = recipes.find((r) => r.id === id);
          if (recipeToSave) {
            await saveFavoriteRecipe(user.uid, recipeToSave);
            setFavoriteIds((prev) => [...prev, id]);
          }
        }
      } else {
        // Fallback to local storage for guests
        const updatedFavIds = FavoriteService.toggleFavoriteId(id);
        setFavoriteIds(updatedFavIds);
      }

      // Broadcast favorites update event to sync other pages
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  }, [user, favoriteIds, recipes]);

  // Map state to recipes with favorite status derived from active favoriteIds
  const recipesWithFavoriteStatus = recipes.map((recipe) => ({
    ...recipe,
    isFavorite: favoriteIds.includes(recipe.id),
  }));

  return {
    recipes: recipesWithFavoriteStatus,
    query,
    isLoading,
    error,
    handleSearch,
    toggleFavorite,
    reload: loadInitialRecipes,
  };
}
export type HomeViewModel = ReturnType<typeof useHomeViewModel>;
