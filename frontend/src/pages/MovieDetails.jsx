import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import { Favorite, FavoriteBorder, ArrowBack, Star, StarBorder } from '@mui/icons-material';
import { movieService } from '../services/movieService';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(-1);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchMovieDetails();
    checkWatchlistStatus();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await movieService.getMovie(id);
      setMovie(response.data);
      setUserRating(response.data.userRating || 0);
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  const checkWatchlistStatus = async () => {
    try {
      const response = await movieService.getWatchlist();
      const isMovieInWatchlist = response.data.some(item => item._id === id);
      setIsInWatchlist(isMovieInWatchlist);
    } catch (err) {
      // Handle silently
    }
  };

  const handleRatingChange = async (event, newValue) => {
    if (ratingLoading) return;
    
    try {
      setRatingLoading(true);
      await movieService.rateMovie(id, newValue);
      setUserRating(newValue);
      setSnackbar({ 
        open: true, 
        message: `You rated this movie ${newValue} star${newValue !== 1 ? 's' : ''}!`, 
        severity: 'success' 
      });
      
      // Refresh movie details to get updated average rating
      setTimeout(() => {
        fetchMovieDetails();
      }, 500);
      
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to submit rating', severity: 'error' });
    } finally {
      setRatingLoading(false);
    }
  };

  const handleWatchlistToggle = async () => {
    try {
      if (isInWatchlist) {
        await movieService.removeFromWatchlist(id);
        setIsInWatchlist(false);
        setSnackbar({ open: true, message: 'Removed from watchlist', severity: 'info' });
      } else {
        await movieService.addToWatchlist(id);
        setIsInWatchlist(true);
        setSnackbar({ open: true, message: 'Added to watchlist', severity: 'success' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update watchlist', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => navigate('/movies')} variant="outlined" startIcon={<ArrowBack />}>
            Back to Movies
          </Button>
        </Box>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mt: 4 }}>
          Movie not found
        </Typography>
        <Button onClick={() => navigate('/movies')} variant="outlined" sx={{ mt: 2 }} startIcon={<ArrowBack />}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 4 }}>
        <Button 
          onClick={() => navigate('/movies')} 
          variant="outlined" 
          sx={{ mb: 3 }}
          startIcon={<ArrowBack />}
        >
          Back to Movies
        </Button>
        
        <Grid container spacing={4}>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                sx={{ 
                  width: '100%',
                  height: { xs: 400, md: 600 }
                }}
                image={movie.poster || '/default-poster.jpg'}
                alt={movie.title}
              />
            </Card>
          </Grid>
          
          {/* Movie Details */}
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {movie.title}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {movie.genre && movie.genre.map((g, index) => (
                  <Chip 
                    key={index}
                    label={g} 
                    color="primary" 
                    sx={{ mr: 1, mb: 1 }} 
                  />
                ))}
                {movie.year && (
                  <Chip 
                    label={`${movie.year}`} 
                    variant="outlined" 
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
              </Box>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
                {movie.description}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              {/* Average Rating Display */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Community Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating 
                    value={movie.averageRating || 0} 
                    readOnly 
                    size="large" 
                    precision={0.1}
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" component="span">
                      {movie.averageRating ? movie.averageRating.toFixed(1) : 'No rating'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.ratingsCount > 0 && ` (${movie.ratingsCount} rating${movie.ratingsCount !== 1 ? 's' : ''})`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {/* User Rating Section */}
              <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom>
                  Rate This Movie
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating
                    name="user-rating"
                    value={userRating}
                    onChange={handleRatingChange}
                    onChangeActive={(event, newHover) => {
                      setHoverRating(newHover);
                    }}
                    size="large"
                    disabled={ratingLoading}
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#ff6d75',
                      },
                      '& .MuiRating-iconHover': {
                        color: '#ff3d47',
                      },
                    }}
                  />
                  {ratingLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {hoverRating !== -1 
                    ? `${hoverRating} star${hoverRating !== 1 ? 's' : ''}`
                    : userRating > 0 
                      ? `You rated this movie ${userRating} star${userRating !== 1 ? 's' : ''}`
                      : 'Click to rate this movie'
                  }
                </Typography>
              </Paper>
              
              {/* Watchlist Button */}
              <Button
                variant="contained"
                size="large"
                startIcon={isInWatchlist ? <Favorite /> : <FavoriteBorder />}
                onClick={handleWatchlistToggle}
                color={isInWatchlist ? "secondary" : "primary"}
                sx={{ 
                  mt: 2,
                  minWidth: 200,
                  py: 1.5
                }}
              >
                {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

export default MovieDetails;