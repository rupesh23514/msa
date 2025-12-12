import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  TextField,
  InputAdornment,
  Fab
} from '@mui/material';
import { Search, KeyboardArrowUp } from '@mui/icons-material';
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/movieService';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchData();
    
    // Show scroll to top button when scrolled down
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Filter movies based on search term
    if (searchTerm.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.genre && movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      setFilteredMovies(filtered);
    }
  }, [movies, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [moviesResponse, watchlistResponse] = await Promise.all([
        movieService.getMovies(),
        movieService.getWatchlist()
      ]);
      setMovies(moviesResponse.data);
      setWatchlist(watchlistResponse.data.map(item => item._id));
    } catch {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = async (movieId) => {
    try {
      const isInWatchlist = watchlist.includes(movieId);
      
      if (isInWatchlist) {
        await movieService.removeFromWatchlist(movieId);
        setWatchlist(prev => prev.filter(id => id !== movieId));
        setSnackbar({ open: true, message: 'Removed from watchlist', severity: 'info' });
      } else {
        await movieService.addToWatchlist(movieId);
        setWatchlist(prev => [...prev, movieId]);
        setSnackbar({ open: true, message: 'Added to watchlist', severity: 'success' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Failed to update watchlist', severity: 'error' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Discover Amazing Movies
        </Typography>
        
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Explore our collection of {movies.length} incredible films
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search movies by title or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ 
            mt: 3,
            maxWidth: 600,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
            }
          }}
        />
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results Summary */}
      {searchTerm && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found 
          {searchTerm && ` for "${searchTerm}"`}
        </Typography>
      )}

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={movie._id}>
            <MovieCard
              movie={movie}
              isInWatchlist={watchlist.includes(movie._id)}
              onWatchlistToggle={handleWatchlistToggle}
            />
          </Grid>
        ))}
      </Grid>

      {filteredMovies.length === 0 && !loading && (
        <Box textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {searchTerm ? 'No movies found' : 'No movies available'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchTerm ? 'Try searching with different keywords' : 'Check back later for new releases'}
          </Typography>
        </Box>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Fab
          color="primary"
          size="medium"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUp />
        </Fab>
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

export default Movies;