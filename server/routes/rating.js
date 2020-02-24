const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating');


// GET //Averagerating/:movieId
router.get('/:movieId',ratingController.getAverageRatingByMovieId);


module.exports = router;