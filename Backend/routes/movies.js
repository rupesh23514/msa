const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
    createMovie,
    getMovies,
    getMovie,
    rateMovie
} = require('../controllers/movieController');

router.get('/', getMovies);
router.post('/', createMovie);
router.get('/:id', getMovie);
router.post('/:id/rate', auth, rateMovie);

module.exports = router;