import React, { useState } from 'react';
import { useFavoritesViewModel } from './FavoritesViewModel';
import { RecipeCard } from '../../components/RecipeCard';
import type { Recipe } from '../../types';

export const FavoritesView: React.FC = () => {
  const {
    recipes,
    searchQuery,
    isLoading,
    error,
    setSearchQuery,
    removeFavorite,
    reload,
  } = useFavoritesViewModel();

  const [selectedRecipeForDetails, setSelectedRecipeForDetails] = useState<Recipe | null>(null);

  return (
    <div className="favorites-container">
      {/* Header */}
      <header className="hero-header">
        <h1 className="hero-title">My Personal Cookbook</h1>
        <p className="hero-subtitle">Your collection of handpicked culinary experiences synced to your cloud account.</p>
      </header>

      {/* Control Bar */}
      <div className="control-bar">
        <div className="search-wrapper full-width">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search saved recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <h3>Error Loading Favorites</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={reload}>
            Retry Load
          </button>
        </div>
      )}

      {/* Grid List */}
      {!error && (
        <>
          {isLoading ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Opening your cloud cookbook...</p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📖</span>
              <h3>Your Cookbook is Empty</h3>
              <p>
                {searchQuery
                  ? "We couldn't find any saved recipes matching your search term."
                  : 'Start exploring recipes from the dashboard and click the ❤️ icon to save them to your account!'}
              </p>
            </div>
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onToggleFavorite={removeFavorite}
                  onViewDetails={setSelectedRecipeForDetails}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Recipe Details Modal */}
      {selectedRecipeForDetails && (
        <div className="modal-backdrop" onClick={() => setSelectedRecipeForDetails(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedRecipeForDetails(null)}>
              ×
            </button>

            <div className="modal-grid">
              <div className="modal-image-side">
                <img
                  src={selectedRecipeForDetails.imageUrl}
                  alt={selectedRecipeForDetails.title}
                  className="modal-img"
                />
                <div className="modal-meta-badges">
                  <span className="category-badge">{selectedRecipeForDetails.category}</span>
                  <span className={`difficulty-badge ${selectedRecipeForDetails.difficulty.toLowerCase()}`}>
                    {selectedRecipeForDetails.difficulty}
                  </span>
                </div>
                <div className="modal-times">
                  <span><strong>Prep Time:</strong> {selectedRecipeForDetails.prepTime} minutes</span>
                  <span><strong>Cook Time:</strong> {selectedRecipeForDetails.cookTime} minutes</span>
                </div>
              </div>

              <div className="modal-info-side">
                <h2 className="modal-title">{selectedRecipeForDetails.title}</h2>
                <p className="modal-desc">{selectedRecipeForDetails.description}</p>

                <div className="modal-section">
                  <h4 className="modal-section-title">Ingredients</h4>
                  <ul className="ingredients-list">
                    {selectedRecipeForDetails.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Preparation Steps</h4>
                  <ol className="instructions-list">
                    {selectedRecipeForDetails.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FavoritesView;
