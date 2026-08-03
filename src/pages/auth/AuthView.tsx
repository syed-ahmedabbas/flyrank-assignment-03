import React, { useState } from 'react';
import { loginUser, registerUser } from '../../services/firebaseService';

export const AuthView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all email and password fields.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      if (isLoginMode) {
        await loginUser(email, password);
      } else {
        await registerUser(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo-emoji">🔐</span>
          <h2>{isLoginMode ? 'Sign In' : 'Create Account'}</h2>
          <p>
            {isLoginMode
              ? 'Access your personal cookbook and saved recipes.'
              : 'Join Cookbook.io to curate your culinary collection.'}
          </p>
        </div>

        {error && (
          <div className="auth-error-banner">
            <span className="auth-error-icon">⚠️</span>
            <span className="auth-error-text">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="chef@cookbook.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="inline-spinner"></span>
            ) : isLoginMode ? (
              'Sign In'
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="auth-toggle">
          <span>
            {isLoginMode
              ? "Don't have an account? "
              : 'Already have an account? '}
          </span>
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError(null);
            }}
            disabled={isLoading}
          >
            {isLoginMode ? 'Register here' : 'Sign in here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
