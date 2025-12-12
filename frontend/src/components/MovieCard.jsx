import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  Typography, 
  Rating,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import { Visibility, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, isInWatchlist, onWatchlistToggle, showRating = true }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movies/${movie._id}`);
  };

  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return 'Unknown';
    return genres.slice(0, 2).join(', ');
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        }
      }}
    >
      <CardMedia
        component="img"
        height="400"
        image={movie.poster || '/default-poster.jpg'}
        alt={movie.title}
        sx={{ 
          objectFit: 'cover',
          '&:hover': {
            opacity: 0.9
          }
        }}
        onClick={handleViewDetails}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 600,
            height: '3rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            cursor: 'pointer'
          }}
          onClick={handleViewDetails}
        >
          {movie.title}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Chip 
            label={formatGenres(movie.genre)} 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Chip 
            label={movie.year || movie.released} 
            size="small" 
            variant="outlined"
          />
        </Box>

        {showRating && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating 
              value={movie.averageRating || 0} 
              readOnly 
              size="small" 
              precision={0.1}
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {movie.averageRating ? movie.averageRating.toFixed(1) : 'No rating'}
            </Typography>
            {movie.ratingsCount > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                ({movie.ratingsCount})
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <IconButton 
          size="small" 
          onClick={handleViewDetails} 
          color="primary"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          <Visibility />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={() => onWatchlistToggle(movie._id)}
          color={isInWatchlist ? 'secondary' : 'default'}
          sx={{
            bgcolor: isInWatchlist ? 'secondary.main' : 'transparent',
            color: isInWatchlist ? 'white' : 'text.secondary',
            '&:hover': { 
              bgcolor: isInWatchlist ? 'secondary.dark' : 'rgba(255, 107, 107, 0.1)' 
            }
          }}
        >
          {isInWatchlist ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;