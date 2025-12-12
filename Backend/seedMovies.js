const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movieapp')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.error('MongoDB connection error:', err));

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
    genre: {
        type: [String],
    },
    year: {
        type: Number,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    ratingsCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

const sampleMovies = [
    {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        released: 1994,
        year: 1994,
        genre: ["Drama"],
        averageRating: 4.8,
        ratingsCount: 125
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        released: 2008,
        year: 2008,
        genre: ["Action", "Drama", "Crime"],
        averageRating: 4.7,
        ratingsCount: 98
    },
    {
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        released: 1994,
        year: 1994,
        genre: ["Crime", "Drama"],
        averageRating: 4.6,
        ratingsCount: 87
    },
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        released: 2010,
        year: 2010,
        genre: ["Action", "Sci-Fi", "Thriller"],
        averageRating: 4.5,
        ratingsCount: 156
    },
    {
        title: "The Matrix",
        description: "A computer programmer discovers that reality as he knows it is a simulation controlled by machines, and joins a rebellion to free humanity.",
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        released: 1999,
        year: 1999,
        genre: ["Action", "Sci-Fi"],
        averageRating: 4.4,
        ratingsCount: 203
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        released: 2014,
        year: 2014,
        genre: ["Adventure", "Drama", "Sci-Fi"],
        averageRating: 4.3,
        ratingsCount: 78
    },
    {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        released: 1972,
        year: 1972,
        genre: ["Crime", "Drama"],
        averageRating: 4.9,
        ratingsCount: 234
    },
    {
        title: "Avatar",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
        released: 2009,
        year: 2009,
        genre: ["Action", "Adventure", "Fantasy"],
        averageRating: 4.1,
        ratingsCount: 167
    },
    {
        title: "Avengers: Endgame",
        description: "After the devastating events of Infinity War, the Avengers must assemble once more to undo Thanos' actions and restore order to the universe.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
        released: 2019,
        year: 2019,
        genre: ["Action", "Adventure", "Drama"],
        averageRating: 4.2,
        ratingsCount: 289
    },
    {
        title: "Titanic",
        description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
        poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        released: 1997,
        year: 1997,
        genre: ["Drama", "Romance"],
        averageRating: 4.0,
        ratingsCount: 145
    },
    {
        title: "Joker",
        description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
        poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
        released: 2019,
        year: 2019,
        genre: ["Crime", "Drama", "Thriller"],
        averageRating: 4.3,
        ratingsCount: 92
    },
    {
        title: "Spider-Man: No Way Home",
        description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
        poster: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
        released: 2021,
        year: 2021,
        genre: ["Action", "Adventure", "Fantasy"],
        averageRating: 4.4,
        ratingsCount: 278
    },
    {
        title: "Black Panther",
        description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and confront a challenger from his country's past.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg",
        released: 2018,
        year: 2018,
        genre: ["Action", "Adventure", "Sci-Fi"],
        averageRating: 4.2,
        ratingsCount: 134
    },
    {
        title: "Forrest Gump",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
        poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        released: 1994,
        year: 1994,
        genre: ["Drama", "Romance"],
        averageRating: 4.6,
        ratingsCount: 189
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
        released: 2001,
        year: 2001,
        genre: ["Adventure", "Drama", "Fantasy"],
        averageRating: 4.7,
        ratingsCount: 201
    }
];

async function seedMovies() {
    try {
        // Clear existing movies
        await Movie.deleteMany({});
        console.log('Existing movies cleared');

        // Insert new movies
        await Movie.insertMany(sampleMovies);
        console.log(`${sampleMovies.length} movies added successfully!`);
        
        const count = await Movie.countDocuments();
        console.log(`Total movies in database: ${count}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding movies:', error);
        process.exit(1);
    }
}

seedMovies();