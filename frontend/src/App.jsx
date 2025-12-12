import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/movies" replace /> : <Login />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/movies" replace /> : <Register />
          } 
        />
        <Route 
          path="/movies" 
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/movies/:id" 
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/watchlist" 
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/movies" : "/login"} replace />
          } 
        />
      </Routes>
    </Box>
  );
}

export default App;
