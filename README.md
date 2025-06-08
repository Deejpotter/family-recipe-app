# Family Recipe App

A personal and family-oriented Progressive Web App (PWA) designed to simplify meal planning, recipe management, and cooking. This app is built for my own use and for my family, with a focus on convenience, collaboration, and customization.

## Features

This application is designed to support the following features:

- **Recipe Management**: Store, organize, and search all our favorite recipes
  - Custom categories and tags
  - Ingredient tracking and scaling
  - Cooking time, difficulty, and dietary info
  - Photo uploads for completed dishes
  - Notes and family ratings
- **Meal Planning**: Generate meal plans based on preferences and dietary needs
  - Weekly/monthly planning
  - Dietary restriction filters
  - Special occasion/event planning
  - Family member preferences
- **Shopping List Generator**: Create shopping lists from meal plans
  - Consolidate ingredients
  - Categorize by grocery section
  - Mark pantry items
  - Share lists with family
- **Pantry Inventory**: Track what ingredients we have on hand
  - Expiration date tracking
  - Low stock alerts
  - Recipe suggestions based on available ingredients
- **Family Collaboration**: Share and collaborate on recipes and meal plans
  - Recipe ratings and reviews
  - Family favorites
  - Comments and notes
  - Modification history
- **PWA Support**: Installable, offline-capable, and mobile-friendly
- **User Preferences**: Save favorite cuisines, dietary restrictions, and more
- **(Optional/Future) Health & Nutrition**: Track calories, macros, and nutrition info
- **(Optional/Future) Integration**: Sync with calendars, smart devices, or grocery delivery

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
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- MongoDB - Database for storing application data
- Jest and React Testing Library - For comprehensive test coverage
- PWA support via Next.js and manifest configuration

## Development & Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB database (local or cloud instance)
- [Git](https://git-scm.com/) for version control
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) for deployment (optional)

### Environment Setup

1. Clone the repository
2. Create a `.env.local` file with the following variables:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_URL=your_api_url
   ```

3. Install dependencies with `npm install`
4. Run the development server with `npm run dev`

### Git & Netlify Setup

- Initialize git if not already done: `git init`
- Commit your code regularly
- Connect your repository to Netlify for automatic deployment
- Use the Netlify CLI for local testing and deployment: `npm install -g netlify-cli`

### PWA Setup

- The app is configured as a PWA (see `public/manifest.json` and Next.js config)
- To test PWA features, use Chrome DevTools or install the app on your device

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
- Next.js-specific optimizations for static pages and server components
- Comprehensive testing before production deployment
- PWA assets generated during build

## Project Structure

The project follows a Next.js App Router structure:

- `app/` - Main application pages and feature folders
- `app/actions/` - Server actions for backend functionality
- `components/` - Reusable UI components
- `contexts/` - React context providers
- `utils/` - Utility functions
- `types/` - TypeScript type definitions
- `public/` - Static assets (including PWA manifest)

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## License

See root LICENSE file.
