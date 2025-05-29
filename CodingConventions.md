# Coding Conventions for Family Recipe App

## Overview

This document outlines the coding conventions and best practices for my Family Recipe App project. The goal is to maintain a consistent code structure that makes it easy to find files and understand the codebase. Having explicit conventions helps me maintain consistency throughout development and makes it easier if I want to expand the app in the future.

## Index

1. [Naming conventions](#naming-conventions)
   - [Files and folders](#files-and-folders)
   - [TypeScript](#typescript)

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

## Component structure

### Components organization

Components are organized in two main ways:

1. **Shared components**: Located in `/components` folder, reusable across the application
2. **Feature-specific components**: Located within their respective feature folder in `/app`

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

## Styling conventions

1. **Primary styling**: Tailwind CSS for consistent layout and components
2. **Custom styling**:
   - Global styles in `app/globals.css`
   - Component-specific styles using Tailwind class composition
3. **Color scheme**: 
   - Primary: #4f6df5 (blue)
   - Secondary: #f97316 (orange)
   - Background: #ffffff (white)
   - Text: #1e293b (slate-800)

## Documentation

1. **Code comments**: Include descriptive comments for complex logic
2. **JSDoc**: Use JSDoc style comments for functions and components
3. **README**: Maintain up-to-date documentation in README.md

## Feature structure

My application will have the following main features, each organized in its own directory:

1. **Recipe Management**:
   - `/app/recipes`
   - Components: RecipeCard, RecipeDetail, RecipeForm
   - Types: Recipe, Ingredient

2. **Meal Planning**:
   - `/app/meal-plans`
   - Components: MealPlanCalendar, MealPlanForm
   - Types: MealPlan, DailyPlan

3. **Shopping List**:
   - `/app/shopping-lists`
   - Components: ShoppingList, GroceryItem
   - Types: ShoppingList, GroceryItem

4. **Pantry Inventory**:
   - `/app/pantry`
   - Components: PantryList, PantryItem
   - Types: PantryItem, StockLevel

5. **Family Collaboration**:
   - `/app/family`
   - Components: FamilyMember, SharingSettings
   - Types: FamilyMember, Permissions

## State management

1. **Local state**: Use React hooks (`useState`, `useReducer`) for component-local state
2. **Server state**: Use Next.js server actions for data operations
3. **Data persistence**:
   - MongoDB for database storage
   - Local storage for user preferences and settings

## Testing strategy

1. **Unit tests**: Test individual components and utility functions
2. **Integration tests**: Test feature workflows (e.g., creating a recipe and adding it to a meal plan)
3. **End-to-end tests**: Test the complete user journey

## Deployment

The application is deployed on Netlify with the following workflow:

1. Push changes to the main branch
2. Netlify automatically builds and deploys the application
3. PWA assets are generated during the build process
4. Environment variables are configured in Netlify

## Testing Conventions

### Testing Overview

This document outlines the testing conventions and best practices for the Family Recipe App project. Following these guidelines will ensure consistency in how we test our code and make it easier for team members to understand and contribute to tests.

### Test File Structure

#### File Naming and Location

1. **Unit Tests**: Place unit tests next to the file they're testing with a `.test.ts` or `.test.tsx` suffix
   - Example: `recipeUtils.ts` → `recipeUtils.test.ts`
2. **Integration Tests**: Create a `__tests__` folder within the feature directory
   - Example: `app/recipes/__tests__/integration.test.ts`
3. **E2E Tests**: Store in a top-level `e2e` directory (if implemented later)

### Testing Approaches

#### Server Actions & API Testing

- Mock external dependencies (databases, third-party services)
- Test both success and error cases
- Verify that returned data matches expected format

#### Component Testing

- Focus on component behavior rather than implementation details
- Test user interactions (clicks, form submissions)
- Verify that components render correctly with different props
- Test accessibility where applicable

#### Utility Functions Testing

- Test edge cases thoroughly
- Use table-driven tests for functions with many input/output combinations
- Test error handling

### Test Structure

Use the following structure for your tests:

```typescript
// Import dependencies
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

- Use Jest's mocking capabilities for external dependencies
- Create mock data factories for commonly used test data
- Define mocks in a separate file if they're reused across tests

### Coverage Goals

- Aim for at least 80% code coverage for critical business logic
- Focus on meaningful tests rather than hitting coverage numbers
- Always test edge cases and error handling

### Continuous Integration

- Tests will run automatically on pull requests
- Failed tests should block merges to main branches

## File Headers

Every file should include a consistent header comment with the following format:

```typescript
/**
 * [File Name]
 * Updated: [Date in DD/MM/YYYY format]
 * Author: [Author Name]
 * Description: [Brief description of the file's purpose]
 * [Optional additional details about implementation]
 */
```

Example:

```typescript
/**
 * RecipeUtils
 * Updated: 29/05/2025
 * Author: Deej Potter
 * Description: Helper functions for recipe management and filtering.
 * Implements sorting, filtering, and transformation of recipe data.
 */
```

## Best practices

1. **TypeScript**: Use proper typing for all components and functions
2. **Error handling**: Include proper error handling for asynchronous operations
3. **Accessibility**: Follow accessibility best practices in UI components
4. **Performance**: Optimize components using React best practices (memoization, etc.)
5. **Testing**: Write tests following the testing conventions outlined above
6. **File Headers**: Include consistent file headers in all files as specified above
7. **Documentation**: Keep README files and inline documentation up to date
