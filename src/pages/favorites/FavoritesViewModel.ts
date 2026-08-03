import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Recipe } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { loadFavoriteRecipes, removeFavoriteRecipe } from '../../services/firebaseService';
import { FavoritesModel } from './FavoritesModel';

export function useFavoritesViewModel() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Loads the user-specific favorite recipes from Firebase RTDB
  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setRecipes([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await loadFavoriteRecipes(user.uid);
      setRecipes(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred while loading your saved recipes.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial load
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Keep synced with changes to favorites occurring in other views
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      fetchFavorites();
    };
    window.addEventListener('favorites-updated', handleFavoritesUpdate);
    return () => {
      window.removeEventListener('favorites-updated', handleFavoritesUpdate);
    };
  }, [fetchFavorites]);

  // Compute filtered favorites using FavoritesModel
  const filteredRecipes = useMemo(() => {
    return FavoritesModel.filterFavorites(recipes, searchQuery);
  }, [recipes, searchQuery]);

  // Deletes a recipe from the user's favorites directory
  const removeFavorite = useCallback(async (recipeId: string) => {
    if (!user) return;
    try {
      setError(null);
      await removeFavoriteRecipe(user.uid, recipeId);
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
      
      // Dispatch update to sync other views (e.g. Dashboard view status indicators)
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred while removing the recipe.');
    }
  }, [user]);

  return {
    recipes: filteredRecipes,
    searchQuery,
    isLoading,
    error,
    setSearchQuery,
    removeFavorite,
    reload: fetchFavorites,
  };
}
export type FavoritesViewModel = ReturnType<typeof useFavoritesViewModel>;
