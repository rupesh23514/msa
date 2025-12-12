const express  = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require('../controllers/watchlistController');
router.get('/', auth, getWatchlist);
router.post('/add', auth, addToWatchlist);
router.post('/remove', auth, removeFromWatchlist);
module.exports = router;

