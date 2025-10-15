# Rick & Morty Explorer

A full-featured web application for exploring the Rick and Morty universe, built as a technical assessment. The application demonstrates modern React development practices, TypeScript usage, and advanced UI/UX patterns.

## Live Demo

🚀 **[View Live Application](https://rick-and-morty-explorer-mdtnoyxky-tarekr94-3660s-projects.vercel.app)**

## Project Overview

This single-page application provides a comprehensive interface for browsing characters, locations, and episodes from the Rick and Morty series. It features advanced filtering, pagination, smart caching, and context-aware navigation.

## Tech Stack

- **React 18.2** with functional components and hooks
- **TypeScript 5.3** for type safety
- **Vite 5.0** for fast development and optimized builds
- **React Router DOM 6.20** for client-side routing
- **SCSS (Sass 1.93)** for advanced styling
- **Rick and Morty API** for data fetching

## Key Features

### Core Functionality
- Browse 826 characters, 126 locations, and 51 episodes
- Advanced multi-criteria filtering
- Pagination with URL persistence
- Detailed view pages for all entities
- Watch episodes via VidSrc integration (opens in new tab)

### Technical Implementation
- **Smart Caching System**: In-memory cache with configurable TTL to reduce API calls
- **URL State Management**: Filter and pagination state persisted in URL for shareability
- **Context-Aware Navigation**: Back button remembers navigation context
- **Loading Skeletons**: Smooth loading states for better UX
- **Error Boundaries**: Graceful error handling with custom 404 page
- **First Load Animation**: Portal-themed loader on initial visit
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Architecture
- Centralized API service layer with caching
- Reusable icon components (SVG)
- Modular SCSS architecture with variables and mixins
- Type-safe interfaces for all data models
- Service-based navigation helpers

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Clone the repository (or extract the zip file)
cd rick-and-morty-explorer

# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

```bash
# Run tests
npm test
```

Tests are written using Vitest and React Testing Library.

### Building for Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Build output will be in the `dist/` directory.

## Deployment

When deploying this SPA, ensure your hosting platform is configured to redirect all routes to `index.html` to support client-side routing:

### Netlify
Create a `_redirects` file in the `public/` directory:
```
/*    /index.html   200
```

### Vercel
Create a `vercel.json` file in the project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Apache
Create a `.htaccess` file:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx
Add to your nginx configuration:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── icons/          # SVG icon components
│   ├── AppLoader.tsx   # First load animation
│   ├── BackButton.tsx  # Context-aware navigation
│   ├── ErrorBoundary.tsx
│   ├── LoadingSkeleton.tsx
│   └── [filters, cards, pagination]
├── pages/              # Route-level components
│   ├── CharacterList.tsx / CharacterDetail.tsx
│   ├── LocationList.tsx / LocationDetail.tsx
│   ├── EpisodeList.tsx / EpisodeDetail.tsx
│   └── NotFound.tsx
├── services/           # Business logic layer
│   ├── api.ts         # API service with caching
│   ├── cache.ts       # Cache implementation
│   └── navigation.ts  # Navigation helpers
├── constants/          # Configuration and constants
│   ├── app-config.ts  # Centralized config
│   ├── character-data.ts
│   └── episode-data.ts
├── styles/            # Global SCSS architecture
│   ├── _variables.scss
│   ├── _typography.scss
│   ├── _mixins.scss
│   ├── _background-portals.scss
│   └── theme.scss
└── types/             # TypeScript definitions
    └── character.ts
```

## API Integration

**Data Source**: [Rick and Morty API](https://rickandmortyapi.com/documentation)

**Endpoints Used**:
- `/character` - Character list and details
- `/location` - Location list and details
- `/episode` - Episode list and details

**Caching Strategy**:
- List endpoints: 5 minutes
- Single entities: 15 minutes
- Static data: 1 hour
- Max cache size: 100 entries

## Features Breakdown

### Character Management
- List view with card layout
- Filter by: name, status, species, type, gender
- Pagination (20 per page)
- Click to view detailed information
- Navigate to character's origin/location
- View episode appearances

### Location Management
- List view with animated cards
- Filter by: name, type, dimension
- Pagination (20 per page)
- View residents (paginated)
- Dynamic emoji icons based on location type
- Animated gradient borders

### Episode Management
- List view with season/episode codes
- Filter by: name, episode code
- Pagination (20 per page)
- View character appearances (paginated)
- Watch episode button (opens VidSrc in new tab)
- Display air dates

## Configuration

All configuration is centralized in `src/constants/app-config.ts`:

```typescript
API_CONFIG          // API base URL and endpoints
CACHE_CONFIG        // TTL and cache size settings
VIDEO_CONFIG        // VidSrc integration settings
PAGINATION_CONFIG   // Items per page settings
FILTER_OPTIONS      // Dropdown options
ERROR_MESSAGES      // User-facing messages
UI_TEXT            // Button labels and text
```

## Development

**Available Scripts**:
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm test` - Run unit tests

**Key Development Patterns**:
- Functional components with hooks
- TypeScript for type safety
- SCSS modules for styling
- Service layer for business logic
- URL-based state management (since the project is small enough for us not to use global data management systems)

## Testing

The project includes unit tests using Vitest and React Testing Library. Tests cover:
- Component rendering and user interactions
- API service methods
- Pagination functionality
- Error handling

Run tests with: `npm test`

**Built with React, TypeScript, and modern web development best practices.**
