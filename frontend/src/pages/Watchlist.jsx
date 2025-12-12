import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/movieService';

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await movieService.getWatchlist();
      setWatchlistMovies(response.data);
    } catch {
      setError('Failed to fetch watchlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await movieService.removeFromWatchlist(movieId);
      setWatchlistMovies(prev => prev.filter(movie => movie._id !== movieId));
      setSnackbar({ open: true, message: 'Removed from watchlist', severity: 'info' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to remove from watchlist', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Watchlist
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {watchlistMovies.length === 0 && !loading ? (
        <Box textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Your watchlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start adding movies to your watchlist to see them here!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {watchlistMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard
                movie={movie}
                isInWatchlist={true}
                onWatchlistToggle={handleRemoveFromWatchlist}
                showRating={true}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Watchlist;