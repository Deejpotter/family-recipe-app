# Coding Conventions for Family Recipe App

This document outlines the coding conventions and best practices for my Family Recipe App project. The goal is to keep the codebase consistent, maintainable, and easy for me (and my family) to understand and expand in the future. These conventions reflect my personal preferences and the needs of this specific project.

## Index

1. [Naming conventions](#naming-conventions)
   - [Files and folders](#files-and-folders)
   - [TypeScript](#typescript)
2. [Component structure](#component-structure)
3. [Styling conventions](#styling-conventions)
4. [Documentation](#documentation)
5. [Feature structure](#feature-structure)
6. [State management](#state-management)
7. [Testing strategy](#testing-strategy)
8. [Deployment](#deployment)
9. [Testing Conventions](#testing-conventions)
10. [File Headers](#file-headers)
11. [Best practices](#best-practices)

## Naming conventions

### Files and folders

1. **React components**: Use PascalCase for component files (e.g., `RecipeCard.tsx`, `MealPlannerContainer.tsx`)
2. **Non-component files**: Use camelCase (e.g., `recipeUtils.ts`, `mealPlanGenerator.ts`)
3. **Folder names**: Use kebab-case for feature folders (e.g., `recipe-management`, `meal-planner`)
4. **Special files**: Use the Next.js convention for special files (`page.tsx`, `layout.tsx`)

### TypeScript

1. **Interfaces**: Use PascalCase starting with descriptive names (e.g., `Recipe`, `MealPlan`, `Ingredient`)
2. **Type definitions**: Store in the `/types` directory with `.d.ts` extension or `types.ts` files
3. **Component Props**: Name as `ComponentNameProps` (e.g., `RecipeCardProps`)

   Example types for my recipe app:

   ```typescript
   interface Recipe {
     id: string;
     title: string;
     description: string;
     ingredients: Ingredient[];
     instructions: string[];
     prepTime: number;
     cookTime: number;
     servings: number;
     tags: string[];
     image?: string;
     createdBy: string;
     createdAt: Date;
     updatedAt: Date;
   }

   interface Ingredient {
     name: string;
     quantity: number;
     unit: string;
   }

   interface MealPlan {
     id: string;
     title: string;
     startDate: Date;
     endDate: Date;
     meals: Meal[];
     createdBy: string;
     createdAt: Date;
     updatedAt: Date;
   }
   ```

## Component Architecture

### Server Components (Default)

Server components are the default in Next.js 13+ and should be used whenever possible.
They offer better performance and smaller bundle sizes.

Example of a server component:

```tsx
// app/recipes/[id]/page.tsx
import { Recipe } from "@/types/recipe/recipe-types";

async function getRecipe(id: string): Promise<Recipe> {
  // Server-side data fetching
  return fetch(`/api/recipes/${id}`).then(res => res.json());
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  return <RecipeDisplay recipe={recipe} />;
}
```

### Client Components

Add "use client" directive only when the component needs:

- Browser APIs
- Event listeners
- State or lifecycle effects
- Client-side libraries

Example of a client component:

```tsx
"use client";

import { useState } from "react";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
    </form>
  );
}
```

### Component Organization

- **Shared components**: Located in `/components`, reusable across the app (e.g., `RecipeCard`, `IngredientList`, `RatingStars`)
- **Feature-specific components**: Located within their respective feature folder in `/app` (e.g., `meal-plans/WeeklyCalendar`, `recipes/RecipeForm`)

### Component file structure

1. **Imports**: Group imports by type (React, local, external)
2. **Interface/Type definitions**: Define component props interfaces
3. **Component declaration**: Use functional components with TypeScript typing
4. **Export**: Default export at the end of the file

Example:

```tsx
// Imports
import React, { useState, useEffect } from "react";
import { SomeType } from "@/types/types";

// Interface definition
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

// Component declaration
const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Component logic
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

## Component Architecture

### Server Components (Default)

Server components are the default in Next.js 13+ and should be used whenever possible.
They offer better performance and smaller bundle sizes.

Example of a server component:

```tsx
// app/recipes/[id]/page.tsx
import { Recipe } from "@/types/recipe/recipe-types";

async function getRecipe(id: string): Promise<Recipe> {
  // Server-side data fetching
  return fetch(`/api/recipes/${id}`).then(res => res.json());
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  return <RecipeDisplay recipe={recipe} />;
}
```

### Client Components

Add "use client" directive only when the component needs:

- Browser APIs
- Event listeners
- State or lifecycle effects
- Client-side libraries

Example of a client component:

```tsx
"use client";

import { useState } from "react";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
    </form>
  );
}
```

### Component Organization

- Keep client components as leaf nodes in the component tree
- Don't mark layout files as client components
- Group related client components together
- Use server components for static content and layouts

## Styling conventions

- **Primary styling**: Tailwind CSS for layout and components
- **Custom styling**:
  - Global styles in `app/globals.css`
  - Component-specific styles using Tailwind class composition
- **Color scheme**:
  - Primary: #4f6df5 (blue)
  - Secondary: #f97316 (orange)
  - Background: #ffffff (white)
  - Text: #1e293b (slate-800)

## Documentation

- **Code comments**: Add descriptive comments for complex logic or important decisions
- **JSDoc**: Use JSDoc style comments for functions and components
- **README**: Keep documentation up to date for future reference

## Feature structure

The app is organized by feature, each in its own directory under `/app`:

- **Recipe Management**: `/app/recipes`
- **Meal Planning**: `/app/meal-plans`
- **Shopping List**: `/app/shopping-lists`
- **Pantry Inventory**: `/app/pantry`
- **Family Collaboration**: `/app/family`

Each feature contains its own components, types, and tests as needed.

## State management

- **Local state**: Use React hooks (`useState`, `useReducer`) for component-local state
- **Server state**: Use Next.js server actions for data operations
- **Data persistence**:
  - MongoDB for database storage
  - Local storage for user preferences and settings

## Testing strategy

- **Unit tests**: Test individual components and utility functions
- **Integration tests**: Test feature workflows (e.g., creating a recipe and adding it to a meal plan)
- **End-to-end tests**: Store in a top-level `e2e` directory (if implemented)

## Deployment

- The app is deployed on Netlify
- Pushes to main branch trigger automatic builds and deploys
- PWA assets are generated during build
- Environment variables are configured in Netlify dashboard

## Testing Conventions

### Test File Structure

- **Unit Tests**: Place next to the file they're testing with a `.test.ts` or `.test.tsx` suffix
- **Integration Tests**: In a `__tests__` folder within the feature directory
- **E2E Tests**: In a top-level `e2e` directory

### Testing Approaches

- Mock external dependencies (databases, third-party services)
- Test both success and error cases
- Focus on component behavior and user interactions
- Test accessibility where possible
- Use table-driven tests for utility functions

### Test Structure

```typescript
import { functionToTest } from './path-to-function';

describe('FunctionName or ComponentName', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    // Act
    const result = functionToTest(input);
    // Assert
    expect(result).toBe('expected output');
  });
});
```

### Mocking

- Use Jest's mocking for external dependencies
- Create mock data factories for common test data
- Define reusable mocks in a separate file if needed

### Coverage Goals

- Aim for at least 80% code coverage for critical logic
- Focus on meaningful tests, not just coverage numbers
- Always test edge cases and error handling

### Continuous Integration

- Tests run automatically on pull requests
- Failed tests block merges to main

## File Headers

Every file should include a header comment with:

```typescript
/**
 * [File Name]
 * Updated: [Date in DD/MM/YYYY format]
 * Author: [Author Name]
 * Description: [Brief description of the file's purpose]
 */
```

Example:

```typescript
/**
 * RecipeUtils
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Helper functions for recipe management and filtering.
 */
```

## Best practices

- Use TypeScript typing for all components and functions
- Include error handling for async operations
- Follow accessibility best practices in UI
- Optimize components using React best practices
- Write tests as outlined above
- Include consistent file headers
- Keep documentation up to date

---

*These conventions are tailored for my Family Recipe App and may evolve as the project grows or as my preferences change. Comments and documentation are written from my perspective to help me (or my family) maintain and expand the app in the future.*
