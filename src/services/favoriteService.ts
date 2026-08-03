const FAVORITES_KEY = 'cookbook_favorites_ids';

export const FavoriteService = {
  getFavoriteIds: (): string[] => {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading favorites from localStorage', e);
      return [];
    }
  },

  saveFavoriteIds: (ids: string[]): void => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Error saving favorites to localStorage', e);
    }
  },

  toggleFavoriteId: (id: string): string[] => {
    const ids = FavoriteService.getFavoriteIds();
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1); // remove
    } else {
      ids.push(id); // add
    }
    FavoriteService.saveFavoriteIds(ids);
    return ids;
  }
};
