import React, { useState } from 'react';
import { useHomeViewModel } from './HomeViewModel';
import { RecipeCard } from '../../components/RecipeCard';
import type { Recipe } from '../../types';

export const HomeView: React.FC = () => {
  const {
    recipes,
    query,
    isLoading,
    error,
    handleSearch,
    toggleFavorite,
    reload,
  } = useHomeViewModel();

  const [selectedRecipeForDetails, setSelectedRecipeForDetails] = useState<Recipe | null>(null);

  return (
    <div className="home-container">
      {/* Hero Header */}
      <header className="hero-header">
        <h1 className="hero-title">Culinary Chronicles</h1>
        <p className="hero-subtitle">Discover, create, and organize your favorite recipes from around the globe.</p>
      </header>

      {/* Control Bar */}
      <div className="control-bar">
        {/* Search Input */}
        <div className="search-wrapper full-width">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search meals by keyword (e.g. Chicken, Pasta, Sushi)..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button className="clear-search-btn" onClick={() => handleSearch('')}>
              ×
            </button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <h3>Error Loading Recipes</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={reload}>
            Retry Load
          </button>
        </div>
      )}

      {/* Main Grid Section */}
      {!error && (
        <>
          {isLoading ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Fetching culinary options...</p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🍳</span>
              <h3>No Recipes Found</h3>
              <p>We couldn't find any recipes matching your query. Try searching for other terms like Beef, Salad, or Dessert.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onToggleFavorite={toggleFavorite}
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
export default HomeView;
