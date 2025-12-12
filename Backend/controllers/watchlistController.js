const User = require('../models/User');

exports.getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('watchlist');
        res.json(user.watchlist || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.addToWatchlist = async (req, res) => {
    try {
        const {movieId} = req.body;
        if(!movieId) {
            return res.status(400).json({message: 'Please provide movie ID'});
        }
        const user = await User.findById(req.user.userId);
        if(!user) return res.status(404).json({message: 'User not found'});

        if(!user.watchlist.includes(movieId)) {
            user.watchlist.push(movieId);
            await user.save();
            return res.json({message: 'Movie added to watchlist'});
        }
        res.json({message: 'Movie already in watchlist'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

};
exports.removeFromWatchlist = async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await User.findById(req.user.userId);
        if(!user) return res.status(404).json({message: 'User not found'});
        
        user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
        await user.save();
        res.json({ message: 'Movie removed from watchlist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};