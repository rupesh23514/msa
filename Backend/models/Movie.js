const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    poster: {
        type: String,
    },
    url: {
        type: String,
    },
    released: {
        type: Number,
    },
    year: {
        type: Number,
    },
    genre: {
        type: [String],
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingsCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);