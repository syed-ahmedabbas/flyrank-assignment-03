# Cookbook.io - Premium MVVM Recipe Application

Cookbook.io is a modern, responsive single-page recipe and cookbook management dashboard built with **React**, **Vite**, **TypeScript**, and **Firebase**. The application follows a strict **Model-View-ViewModel (MVVM)** design pattern to cleanly decouple presentation, business logic, and backend services.

---

## 🌟 Key Features

1. **Tab-Based Navigation**: Switch between a public recipe search Dashboard and a private cloud-synced Cookbook.
2. **MealDB Search & Explore**: Fetches and aggregates live meal entries (including ingredients, image thumbnails, and preparation instructions) in parallel using the MealDB API.
3. **Protected Tab Routing**: Restricts the "My Cookbook" tab. Unauthenticated sessions are automatically redirected to a login/registration card view.
4. **Firebase Cloud Syncing**: Saves, loads, and deletes user-specific bookmarks dynamically to a Firebase Realtime Database path scoped by user UID.
5. **Local Storage Fallback**: Supports favoriting items for guest sessions locally, resolving synced states when authentication changes.
6. **Ingredients Modal Overlay**: Slides in step-by-step instructions and measured ingredients on a frosted glass canvas.
7. **Premium Aesthetics**: Warm obsidian and gold dark mode layout with custom animations, glassmorphic cards, and hover scaling.

---

## 🏗️ Architecture Design (MVVM Pattern)

The application separates concerns across three logical layers:

### 1. Model (Data & Logic Layer)
- Isolated from React view lifecycles and state.
- Responsible for transforming raw API schemas into application objects and executing filtering algorithms.
- *Examples*: [HomeModel.ts](file:///c:/Users/asada/OneDrive/Desktop/flyrank_03/src/pages/home/HomeModel.ts), [FavoritesModel.ts](file:///c:/Users/asada/OneDrive/Desktop/flyrank_03/src/pages/favorites/FavoritesModel.ts).

### 2. ViewModel (State & Presentation Layer)
- Implemented as customized, reactive React Hooks (e.g. `useHomeViewModel`, `useFavoritesViewModel`).
- Manages reactive state (such as search queries, loading overlays, errors, and list updates) and exposes handlers ("commands") to views.
- Subscribes to database/auth changes, synchronizing views.
- *Examples*: [HomeViewModel.ts](file:///c:/Users/asada/OneDrive/Desktop/flyrank_03/src/pages/home/HomeViewModel.ts), [FavoritesViewModel.ts](file:///c:/Users/asada/OneDrive/Desktop/flyrank_03/src/pages/favorites/FavoritesViewModel.ts).

### 3. View (UI Layer)
- Composed of React functional components that bind to states and trigger commands exposed by the ViewModel.
- Contain zero API calls or business logic computations, focusing purely on layout JSX and styling bindings.
- *Examples*: [HomeView.tsx](file:///c:/Users/asada/OneDrive/Desktop/flyrank_03/src/pages/home/HomeView.tsx), [FavoritesView.tsx](file:///c:/Users/asada/OneDrive/Desktop/flyrank_03/src/pages/favorites/FavoritesView.tsx), [AuthView.tsx](file:///c:/Users/asada/OneDrive/Desktop/flyrank_03/src/pages/auth/AuthView.tsx).

---

## 📁 Project Structure

```text
src/
├── components/
│   └── RecipeCard.tsx         # Reusable card component (thumbnails, category, difficulty)
├── context/
│   └── AuthContext.tsx        # Global Auth provider listening to onAuthStateChanged
├── pages/
│   ├── auth/
│   │   └── AuthView.tsx       # Controlled credential inputs & mode toggles
│   ├── favorites/
│   │   ├── FavoritesModel.ts  # Domain search computations for favorites list
│   │   ├── FavoritesView.tsx  # Layout for cookbook bookmarks & empty-state guides
│   │   └── FavoritesViewModel.ts # Custom hook binding favorites lists and UID paths
│   └── home/
│       ├── HomeModel.ts       # Parallel API fetches & category filters
│       ├── HomeView.tsx       # Hero dashboard grids & recipe detail modals
│       └── HomeViewModel.ts   # Custom hook syncing queries and database favorites
├── services/
│   ├── favoriteService.ts     # LocalStorage operations (Guest Fallbacks)
│   ├── firebaseService.ts     # Firebase auth/database initializations & friendly errors
│   ├── mealService.ts         # Fetch queries hitting TheMealDB API
│   └── recipeService.ts       # Fallback mock service
├── types/
│   └── index.ts               # Core TypeScript interfaces (Recipe, MealDBMeal, etc.)
├── App.css                    # UI theme styling (cards, grids, buttons, profile nav)
├── App.tsx                    # Protected tab routers
├── index.css                  # CSS reset, obsidian-gold variables, global spinners
└── main.tsx                   # AuthProvider wrappers
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory. Vite will compile these environment variables directly:

```env
# Firebase configuration settings
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
VITE_FIREBASE_DATABASE_URL=https://your-firebase-database-url-here.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_firebase_app_id_here
```
*Note: A defensive validation check is implemented in the Firebase service configuration to fall back to a dummy database URL structure if no environment variables are set, preventing application startup failures in local testing.*

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 3. Verify Code Quality & Compilation
Check typescript types compilation:
```bash
npm run build
```
Check formatting and syntax:
```bash
npm run lint
```
