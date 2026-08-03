import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onToggleFavorite,
  onViewDetails,
}) => {
  return (
    <div className="recipe-card">
      {/* Card Image */}
      <div className="card-image-wrapper">
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-card-img" />
        <div className="card-overlay"></div>
        <span className="category-badge">{recipe.category}</span>
        <span className={`difficulty-badge ${recipe.difficulty.toLowerCase()}`}>
          {recipe.difficulty}
        </span>
      </div>

      {/* Card Body */}
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-description">{recipe.description}</p>

        {/* Metadata */}
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <span>Prep: {recipe.prepTime}m</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🔥</span>
            <span>Cook: {recipe.cookTime}m</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="recipe-card-footer">
          <button
            className="view-details-btn"
            onClick={() => onViewDetails(recipe)}
          >
            View Details
          </button>
          <button
            className={`favorite-btn ${recipe.isFavorite ? 'is-fav' : ''}`}
            onClick={() => onToggleFavorite(recipe.id)}
            aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {recipe.isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
