# Client/Server Component Architecture

## Component Organization

### Server Components (Default)

Server components are the default in Next.js 13+ and should be used for:

- Root layouts (`app/layout.tsx`)
- Pages that don't need client interactivity
- Components that only render static content
- Metadata exports
- Loading and error states

### Client Components ("use client")

Client components should be used for:

- Interactive UI elements (buttons, forms, etc.)
- Components that use hooks (useState, useEffect, etc.)
- Components that need browser APIs
- Event handlers

### Current Structure

```
src/
  app/                      # Server components by default
    layout.tsx             # Server component (root layout)
    page.tsx              # Server component (can be client if needed)
    actions/              # Server actions
    meal-plans/           
      page.tsx            # Client component (uses state/interactivity)
    recipes/
      page.tsx           # Client component (uses state/interactivity)
  
  components/             # Mix of client/server components
    navbar/
      Auth.tsx           # Client (uses auth hooks)
      Navbar.tsx         # Client (uses state for mobile menu)
    recipes/
      RecipeCard.tsx     # Client (uses interactivity)
      RecipeForm.tsx     # Client (uses form state)
    shared/              # Reusable components
      ImageUpload.tsx    # Client (uses browser APIs)
      TagInput.tsx       # Client (uses interactivity)

  contexts/              # All client components
    AuthContext.tsx      # Client (provides auth state)
    ItemContext.tsx      # Client (provides item state)
```

## Best Practices

1. Keep client components as close to where they're needed as possible
2. Use server components by default
3. Create client boundaries only when needed
4. Pages can be client components if they need interactivity
5. Avoid "use client" in:
   - Root layout.tsx
   - Components that don't need interactivity
   - Static content rendering

## Performance Optimization

1. Server components:
   - Reduce JavaScript bundle size
   - Enable streaming and partial hydration
   - Allow direct database access

2. Client components:
   - Should be leaf nodes when possible
   - Keep state management close to where it's used
   - Use proper data fetching strategies (SWR, React Query)

## Testing Strategy

1. Server Components:
   - Unit test rendering logic
   - Test data fetching
   - Test metadata generation

2. Client Components:
   - Test user interactions
   - Test state management
   - Test event handlers
   - Test form validation

## Documentation

Always document:

1. Why a component is client-side ("use client")
2. Data flow between server/client components
3. State management decisions
4. Authentication/authorization boundaries
