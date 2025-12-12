import api from './api';

export const movieService = {
  // Get all movies
  getMovies: () => api.get('/movies'),
  
  // Get movie by ID
  getMovie: (id) => api.get(`/movies/${id}`),
  
  // Rate a movie
  rateMovie: (id, rating) => api.post(`/movies/${id}/rate`, { rating }),
  
  // Get watchlist
  getWatchlist: () => api.get('/watchlist'),
  
  // Add to watchlist
  addToWatchlist: (movieId) => api.post('/watchlist/add', { movieId }),
  
  // Remove from watchlist
  removeFromWatchlist: (movieId) => api.post('/watchlist/remove', { movieId }),
};