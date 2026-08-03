export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl: string;
  isFavorite?: boolean;
}

export type RecipeCategory = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Appetizer';

export interface MealDBMeal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternative: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  [key: string]: string | null; // index signature for ingredients and measures
}

export interface MealDBResponse {
  meals: MealDBMeal[] | null;
}

