# Rick and Morty Explorer

A modern, responsive web application built with React and TypeScript that allows users to explore characters from the Rick and Morty universe using the [Rick and Morty API](https://rickandmortyapi.com/).

## Features

- 📱 **Responsive Design**: Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful gradient-based design with smooth animations and transitions
- 🔍 **Character List**: Browse through all Rick and Morty characters with pagination
- 📄 **Character Details**: View detailed information about each character including:
  - Name, Status, Species, Gender
  - Origin and Last Known Location
  - Number of episode appearances
  - High-quality character image
- ⚡ **Fast Navigation**: Quick page transitions with React Router
- 🧪 **Comprehensive Testing**: High test coverage with unit tests for all components

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **React Router 6** - Client-side routing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **CSS Modules** - Scoped styling

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (version 7 or higher) or **yarn** (version 1.22 or higher)

To check your versions, run:
```bash
node --version
npm --version
```

## Installation

1. **Extract the project** (if you received it as a .zip file):
   ```bash
   unzip rick-and-morty-explorer.zip
   cd rick-and-morty-explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
   Or if you prefer yarn:
   ```bash
   yarn install
   ```

## Running the Application

### Development Mode

To start the development server:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173` (Vite's default port).

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- TypeScript type checking

### Production Build

To create a production-optimized build:

```bash
npm run build
```

Or with yarn:
```bash
yarn build
```

The build output will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

Or with yarn:
```bash
yarn preview
```

## Running Tests

### Run all tests:

```bash
npm test
```

Or with yarn:
```bash
yarn test
```

### Run tests with coverage:

```bash
npm run test:coverage
```

Or with yarn:
```bash
yarn test:coverage
```

Coverage reports will be generated in the `coverage` directory.

### Test Coverage

The project includes comprehensive tests for:
- API service functions
- All React components (CharacterCard, Pagination, Loading, Error)
- Page components (CharacterList, CharacterDetail)
- User interactions and navigation
- Error handling and edge cases

Current test coverage targets:
- Statements: >80%
- Branches: >75%
- Functions: >80%
- Lines: >80%

## Project Structure

```
rick-and-morty-explorer/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── CharacterCard.tsx
│   │   ├── CharacterCard.css
│   │   ├── CharacterCard.test.tsx
│   │   ├── Pagination.tsx
│   │   ├── Pagination.css
│   │   ├── Pagination.test.tsx
│   │   ├── Loading.tsx
│   │   ├── Loading.css
│   │   ├── Loading.test.tsx
│   │   ├── Error.tsx
│   │   └── Error.css
│   │   └── Error.test.tsx
│   ├── pages/               # Page components
│   │   ├── CharacterList.tsx
│   │   ├── CharacterList.css
│   │   ├── CharacterList.test.tsx
│   │   ├── CharacterDetail.tsx
│   │   ├── CharacterDetail.css
│   │   └── CharacterDetail.test.tsx
│   ├── services/            # API services
│   │   ├── api.ts
│   │   └── api.test.ts
│   ├── types/               # TypeScript type definitions
│   │   └── character.ts
│   ├── test/                # Test configuration
│   │   └── setup.ts
│   ├── App.tsx              # Root component
│   ├── App.css
│   ├── App.test.tsx
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Vite type definitions
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## API

This project uses the [Rick and Morty API](https://rickandmortyapi.com/), a free and open API that provides:
- Character information
- Episode details
- Location data

No API key is required.

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Key Features Breakdown

### Character List Page
- Displays 20 characters per page
- Shows character name, image, status, and species
- Pagination controls for navigating through all characters
- Smooth scroll to top when changing pages
- Responsive grid layout that adapts to screen size
- Loading state while fetching data
- Error handling with user-friendly messages

### Character Detail Page
- Full character information display
- Visual status indicators (Alive/Dead/Unknown)
- Back button to return to character list
- Responsive layout for all screen sizes
- Episode count display

### Responsive Design
- **Desktop (>968px)**: Multi-column grid with large cards
- **Tablet (768px-968px)**: Adjusted grid with medium cards
- **Mobile (<768px)**: Single column layout with optimized spacing

## Performance Optimizations

- Lazy loading of character images
- Efficient pagination to minimize API calls
- React component optimization
- CSS animations using GPU-accelerated properties
- Production build with code splitting and minification

## Development

### Code Style

The project uses TypeScript strict mode for better type safety. Key conventions:
- Functional components with hooks
- TypeScript interfaces for all data types
- CSS modules for component styling
- Descriptive variable and function names

### Adding New Features

1. Create new components in `src/components/`
2. Add corresponding test files with `.test.tsx` extension
3. Update types in `src/types/` if needed
4. Add new routes in `App.tsx` if creating new pages
5. Run tests to ensure coverage remains high

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a custom port:

```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

If you encounter module errors, try:
1. Delete `node_modules` folder
2. Delete `package-lock.json` (or `yarn.lock`)
3. Run `npm install` again

### TypeScript Errors

If you see TypeScript errors:
1. Ensure you're using Node.js 16 or higher
2. Try running `npm run build` to see detailed type errors
3. Check `tsconfig.json` for configuration issues

## Future Enhancements

Potential features for future iterations:
- Search functionality to find characters by name
- Filter characters by status, species, or gender
- Favorites/bookmarking system
- Episode information pages
- Location information pages
- Dark/light theme toggle
- Character comparison feature

## License

This project is created for educational/demonstration purposes.

## Author

Created as a technical assessment project.

## Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the free API
- The Rick and Morty show creators for the amazing content
- The React and TypeScript communities for excellent tools and documentation

