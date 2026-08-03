import React, { useState } from 'react';
import HomeView from './pages/home/HomeView';
import FavoritesView from './pages/favorites/FavoritesView';
import AuthView from './pages/auth/AuthView';
import { useAuth } from './context/AuthContext';
import { logoutUser } from './services/firebaseService';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'favorites'>('home');
  const { user, isLoading } = useAuth();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      setActiveTab('home'); // Redirect back to public dashboard on sign out
    } catch (e) {
      console.error('Failed to log out:', e);
    }
  };

  return (
    <div className="app-layout">
      {/* Top Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-logo">
          <span className="logo-emoji">🍳</span>
          <span className="logo-text">Cookbook.io</span>
        </div>
        <div className="nav-links-wrapper">
          <div className="nav-links">
            <button
              className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Dashboard
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              My Cookbook
            </button>
          </div>
          {user && (
            <div className="user-profile">
              <span className="user-email">👨‍🍳 {user.email}</span>
              <button className="sign-out-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Protected Navigation Views */}
      <main className="main-content">
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading application state...</p>
          </div>
        ) : activeTab === 'home' ? (
          <HomeView />
        ) : user ? (
          <FavoritesView />
        ) : (
          <AuthView />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 Cookbook.io. Structured in MVVM with React + Firebase Auth.</p>
      </footer>
    </div>
  );
};

export default App;
