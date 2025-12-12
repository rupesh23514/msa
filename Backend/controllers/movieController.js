const Movie = require('../models/Movie');
const Rating = require('../models/Rating');

exports.createMovie = async (req, res) => {
    try{
         const movie = await Movie.create(req.body);
            res.json(movie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });


    }
};

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Get current user's rating if authenticated
        let userRating = null;
        if (req.user) {
            const rating = await Rating.findOne({ user: req.user.userId, movie: movie._id });
            userRating = rating ? rating.rating : null;
        }

        res.json({ 
            ...movie.toObject(),
            userRating: userRating
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.rateMovie = async (req, res) => {
    try {
        const userId = req.user.userId;
        const movieId = req.params.id;
        const { rating } = req.body;
        
        if (!rating) return res.status(400).json({ message: 'Please provide a rating' });
        if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });

        // Check if movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        // Find existing rating by this user for this movie
        const existing = await Rating.findOne({ user: userId, movie: movieId });
        
        if (existing) {
            // Update existing rating
            existing.rating = rating;
            await existing.save();
        } else {
            // Create new rating
            await Rating.create({ user: userId, movie: movieId, rating });
        }

        // Recalculate average rating for the movie
        const ratings = await Rating.aggregate([
            { $match: { movie: movie._id } },
            { 
                $group: { 
                    _id: '$movie', 
                    avgRating: { $avg: '$rating' }, 
                    count: { $sum: 1 } 
                } 
            }
        ]);

        if (ratings.length > 0) {
            const avgRating = Number(ratings[0].avgRating.toFixed(1));
            const count = ratings[0].count;
            
            // Update movie with new average rating
            await Movie.findByIdAndUpdate(movieId, {
                averageRating: avgRating,
                ratingsCount: count
            });
        }

        res.json({ 
            message: existing ? 'Rating updated' : 'Rating added',
            rating: rating
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};