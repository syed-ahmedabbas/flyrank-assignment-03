import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { getDatabase, ref, set, remove, get } from 'firebase/database';
import type { Recipe } from '../types';

const dbUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;
const isDbUrlValid = dbUrl && dbUrl.startsWith('https://');

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy-auth-domain.firebaseapp.com",
  databaseURL: isDbUrlValid ? dbUrl : "https://dummy-database.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy-storage-bucket.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

/**
 * Translates typical Firebase Authentication error codes to user-friendly text messages.
 */
function handleFirebaseError(error: any): string {
  if (!error || typeof error !== 'object') {
    return 'An unknown authentication error occurred.';
  }

  const code = error.code || '';
  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is invalid or poorly formatted.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'There is no user record matching this email address.';
    case 'auth/wrong-password':
      return 'The password entered is incorrect.';
    case 'auth/email-already-in-use':
      return 'An account already exists with the provided email address.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use at least 6 characters.';
    case 'auth/operation-not-allowed':
      return 'Email/password authentication is not enabled on this project.';
    case 'auth/network-request-failed':
      return 'A network error occurred. Please check your connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many request attempts. Access has been temporarily blocked. Please try again later.';
    case 'auth/invalid-credential':
      return 'Invalid email or password credentials provided.';
    default:
      return error.message || 'An error occurred during authentication.';
  }
}

/**
 * Registers a new user with email and password.
 * Throws a readable error message if creation fails.
 */
export async function registerUser(email: string, password: string): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(handleFirebaseError(error));
  }
}

/**
 * Logs in an existing user with email and password.
 * Throws a readable error message if sign-in fails.
 */
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(handleFirebaseError(error));
  }
}

/**
 * Logs out the current user session.
 * Throws a readable error message if logout fails.
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(handleFirebaseError(error));
  }
}

/**
 * Subscribes to changes in user authorization status.
 * Returns an unsubscribe teardown function.
 */
export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Saves a recipe object to the database under the user's specific UID favorites directory.
 */
export async function saveFavoriteRecipe(uid: string, recipe: Recipe): Promise<void> {
  try {
    const dbRef = ref(database, `users/${uid}/favorites/${recipe.id}`);
    await set(dbRef, recipe);
  } catch (error: any) {
    throw new Error(`Failed to save favorite recipe to database: ${error.message}`);
  }
}

/**
 * Removes a recipe object from the database under the user's specific UID favorites directory.
 */
export async function removeFavoriteRecipe(uid: string, recipeId: string): Promise<void> {
  try {
    const dbRef = ref(database, `users/${uid}/favorites/${recipeId}`);
    await remove(dbRef);
  } catch (error: any) {
    throw new Error(`Failed to remove favorite recipe from database: ${error.message}`);
  }
}

/**
 * Loads all user-specific favorite recipes from the database.
 */
export async function loadFavoriteRecipes(uid: string): Promise<Recipe[]> {
  try {
    const dbRef = ref(database, `users/${uid}/favorites`);
    const snapshot = await get(dbRef);
    if (!snapshot.exists()) {
      return [];
    }
    const data = snapshot.val();
    if (!data) {
      return [];
    }
    return Object.values(data) as Recipe[];
  } catch (error: any) {
    throw new Error(`Failed to load favorite recipes from database: ${error.message}`);
  }
}

