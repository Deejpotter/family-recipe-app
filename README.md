# Family Recipe App

A personal and family-oriented application designed to simplify meal planning, recipe management, and cooking. This Next.js-powered Progressive Web App (PWA) serves as a central hub for storing favorite recipes, generating meal plans, and making cooking easier for the whole family.

## Features

This application contains several core features:

- **Recipe Management** - Store and organize all your favorite recipes:
  - Custom categorization and tagging
  - Ingredient tracking and scaling
  - Cooking time and difficulty rating
  - Photo uploads for completed dishes
  
- **Meal Planning** - Generate customized meal plans based on preferences:
  - Weekly and monthly planning options
  - Preference-based meal suggestions
  - Dietary restriction filters
  - Special occasion and event planning
  
- **Shopping List Generator** - Automatically create shopping lists from meal plans:
  - Consolidate ingredients across multiple recipes
  - Categorize by grocery store sections
  - Mark items already in pantry
  - Share lists with family members
  
- **Pantry Inventory** - Track what ingredients you have on hand:
  - Expiration date tracking
  - Low stock alerts
  - Recipe suggestions based on available ingredients
  
- **Family Collaboration** - Share and collaborate on recipes and meal plans:
  - Recipe ratings and reviews
  - Family favorites collection
  - Recipe modification history
  - Comments and notes

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework with server actions for backend functionality
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- Custom Bootstrap implementation for responsive design
- MongoDB - Database for storing application data
- Jest and React Testing Library - For comprehensive test coverage

## Development

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB database (local or cloud instance)

### Environment Setup

1. Clone the repository
2. Create a `.env.local` file with the following variables:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_URL=your_api_url
   ```

3. Install dependencies with `npm install`
4. Run the development server with `npm run dev`

### Testing

Run the test suite with:

```bash
npm test
```

For test coverage reporting:

```bash
npm run test:coverage
```

## Deployment

The application is deployed on Netlify for production use. The deployment process includes:

- Automatic deployment from the main branch
- Build-time TypeScript and ESLint checks
- Environment variable configuration for API keys and database connections
- NextJS-specific optimizations for static pages and server components
- Comprehensive testing before production deployment

## Project Structure

The project follows a Next.js App Router structure:

- `app/` - Main application pages and mini-apps
- `app/actions/` - Server actions for backend functionality
- `components/` - Reusable UI components
- `interfaces/` - TypeScript interfaces
- `contexts/` - React context providers
- `utils/` - Utility functions
- `styles/` - CSS and SCSS files
- `public/` - Static assets
- `types/` - TypeScript type definitions

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## License

See root LICENSE file.
