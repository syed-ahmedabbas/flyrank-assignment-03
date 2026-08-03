import type { Recipe } from '../types';

const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Gourmet Avocado Toast',
    description: 'Crisp artisanal sourdough topped with creamy mashed avocado, organic cherry tomatoes, crumbled feta, and a pinch of chili flakes.',
    category: 'Breakfast',
    ingredients: [
      '2 slices of sourdough bread',
      '1 ripe Haas avocado',
      '1/2 cup cherry tomatoes, halved',
      '2 tbsp feta cheese, crumbled',
      '1 tsp extra virgin olive oil',
      'Salt, pepper, and chili flakes to taste'
    ],
    instructions: [
      'Toast the sourdough bread slices until golden brown and crisp.',
      'In a small bowl, mash the avocado with a fork and season with salt, pepper, and a squeeze of lemon juice if desired.',
      'Spread the mashed avocado evenly over the toasted bread slices.',
      'Top with halved cherry tomatoes and crumbled feta cheese.',
      'Drizzle with extra virgin olive oil and sprinkle with red chili flakes.'
    ],
    prepTime: 10,
    cookTime: 5,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    title: 'Fluffy Berry Pancakes',
    description: 'Light and airy buttermilk pancakes served with a warm compote of fresh organic blueberries, raspberries, and pure maple syrup.',
    category: 'Breakfast',
    ingredients: [
      '1 cup all-purpose flour',
      '2 tbsp sugar',
      '1 tsp baking powder',
      '1/2 tsp baking soda',
      '1 cup buttermilk',
      '1 large egg',
      '2 tbsp melted butter',
      '1 cup mixed fresh berries',
      'Pure maple syrup'
    ],
    instructions: [
      'Whisk dry ingredients (flour, sugar, baking powder, baking soda, salt) in a bowl.',
      'In another bowl, whisk egg, buttermilk, and melted butter. Pour into the dry ingredients and stir until just combined.',
      'Heat a non-stick skillet over medium-high heat and grease lightly with butter.',
      'Pour batter in circles, drop fresh berries onto the pancakes, and cook until bubbles form on top.',
      'Flip and cook until the other side is golden. Serve warm with maple syrup and extra berries.'
    ],
    prepTime: 15,
    cookTime: 10,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    title: 'Pan-Seared Herb Salmon',
    description: 'Crispy skin salmon filet basted with fresh rosemary, thyme, garlic butter, and served with a side of asparagus.',
    category: 'Dinner',
    ingredients: [
      '2 salmon filets (skin-on)',
      '2 tbsp butter',
      '2 cloves garlic, crushed',
      'Fresh sprigs of rosemary and thyme',
      '1 tbsp olive oil',
      '1 lemon, sliced',
      'Salt and freshly cracked black pepper'
    ],
    instructions: [
      'Pat salmon dry with paper towels. Season generously with salt and pepper on both sides.',
      'Heat olive oil in a pan over medium-high heat. Add salmon skin-side down and press gently.',
      'Sear for 4-5 minutes until skin is crispy. Flip the salmon.',
      'Add butter, garlic, and fresh herbs to the pan. Spoon the melted butter over the salmon repeatedly (basting) for 3 minutes.',
      'Remove salmon, squeeze fresh lemon juice over it, and let it rest for a minute before serving.'
    ],
    prepTime: 10,
    cookTime: 8,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    title: 'Decadent Chocolate Lava Cake',
    description: 'Rich dark chocolate cake with a warm, liquid chocolate center. Served with fresh strawberries and vanilla bean gelato.',
    category: 'Dessert',
    ingredients: [
      '100g high-quality dark chocolate (70% cocoa)',
      '1/2 cup butter',
      '2 whole eggs + 2 egg yolks',
      '1/4 cup sugar',
      '2 tbsp all-purpose flour',
      'Cocoa powder for dusting',
      'Vanilla ice cream for serving'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Butter four ramekins and dust inside with cocoa powder.',
      'Melt the chocolate and butter together in a heatproof bowl set over simmering water; stir until smooth.',
      'In a separate bowl, whisk eggs, egg yolks, and sugar together until pale and thick.',
      'Fold the melted chocolate mixture and flour into the egg mixture until just combined.',
      'Divide batter among the ramekins. Bake for 10-12 minutes until sides are firm but centers are soft. Invert onto plates and serve immediately with ice cream.'
    ],
    prepTime: 15,
    cookTime: 12,
    difficulty: 'Hard',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    title: 'Garlic Butter Tuscan Shrimp',
    description: 'Plump shrimp seared in a garlic butter sauce, cooked with sun-dried tomatoes, spinach, and heavy cream.',
    category: 'Lunch',
    ingredients: [
      '1 lb large shrimp, peeled and deveined',
      '3 tbsp butter',
      '4 cloves garlic, minced',
      '1/2 cup sun-dried tomatoes, sliced',
      '2 cups fresh baby spinach',
      '1/2 cup heavy cream',
      '1/4 cup grated Parmesan cheese',
      'Fresh parsley'
    ],
    instructions: [
      'Heat 1 tbsp butter and oil in a large skillet. Sear shrimp for 2 minutes on each side until pink, then set aside.',
      'In the same skillet, melt remaining butter. Add garlic and cook until fragrant (1 minute).',
      'Add sun-dried tomatoes and cook for 2 minutes. Pour in heavy cream and bring to a simmer.',
      'Add spinach and let it wilt in the cream sauce. Stir in Parmesan cheese until melted and smooth.',
      'Return shrimp to the pan, toss to coat in the creamy sauce, and simmer for another minute. Garnish with parsley.'
    ],
    prepTime: 10,
    cookTime: 10,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    title: 'Heirloom Tomato Caprese Salad',
    description: 'Slices of ripe heirloom tomatoes and creamy fresh buffalo mozzarella, layered with fresh basil leaves and drizzled with aged balsamic glaze.',
    category: 'Appetizer',
    ingredients: [
      '3 large heirloom tomatoes, sliced thick',
      '8 oz fresh buffalo mozzarella, sliced',
      '1 cup fresh sweet basil leaves',
      '2 tbsp extra virgin olive oil',
      '2 tbsp high-quality aged balsamic glaze',
      'Coarse sea salt and cracked black pepper'
    ],
    instructions: [
      'On a large serving platter, alternate tomato slices and mozzarella slices, overlapping them slightly.',
      'Tuck fresh basil leaves between the tomato and mozzarella slices.',
      'Drizzle the entire platter with premium extra virgin olive oil.',
      'Drizzle with the thick balsamic glaze.',
      'Sprinkle with flaky sea salt and freshly cracked black pepper right before serving.'
    ],
    prepTime: 10,
    cookTime: 0,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80'
  }
];

export const RecipeService = {
  getRecipes: async (): Promise<Recipe[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_RECIPES]);
      }, 800);
    });
  }
};
