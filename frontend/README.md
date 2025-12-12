# Movie Streaming App - Frontend

A modern React frontend for the Movie Streaming App built with Material-UI and Vite.

## Features

- 🎬 Browse and discover movies
- ⭐ Rate movies with star ratings
- 📋 Personal watchlist management
- 🔐 JWT Authentication
- 🎨 Modern Netflix-style UI with Material-UI
- 📱 Responsive design

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - Global state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── MovieCard.jsx
│   └── ProtectedRoute.jsx
├── context/             # React Context providers
│   └── AuthContext.jsx
├── pages/               # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Movies.jsx
│   ├── MovieDetails.jsx
│   └── Watchlist.jsx
├── services/            # API services
│   ├── api.js
│   └── movieService.js
├── theme/               # MUI theme configuration
│   └── theme.js
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

## API Integration

The frontend connects to your backend API with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies/:id/rate` - Rate a movie
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist/add` - Add movie to watchlist
- `POST /api/watchlist/remove` - Remove movie from watchlist

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Setup

The frontend is configured to proxy API requests to `http://localhost:5000`. Make sure your backend server is running on that port.

## Authentication

- JWT tokens are stored in localStorage
- Automatic token refresh and logout on expiration
- Protected routes redirect to login when unauthenticated

## Theme

The app uses a dark Netflix-style theme with:
- Primary color: `#e50914` (Netflix red)
- Secondary color: `#ff6b6b`
- Dark background: `#141414`
- Card background: `#1e1e1e`
