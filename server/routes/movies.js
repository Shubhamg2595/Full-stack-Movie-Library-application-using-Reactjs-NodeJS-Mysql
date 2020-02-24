const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies');
// GET /movies/allMovies
router.get('/allMovies/:page', movieController.getMovies);
//  testing
router.post('/test',movieController.getMoviesWithComedyAndRating);

// GET /watchlist
router.get('/watchList',movieController.getWatchlist)

// PUT /movies/:movieId
router.put('/watchList', movieController.updateWatchlist);

// GET /movies/:movieId
router.get('/:movieId',movieController.getMovieByMovieId);



// GET 
module.exports = router;