const Rating = require('../models/ratings');
const sequelize = require('sequelize').Sequelize;
exports.getAverageRatingByMovieId = async (req, res, next) => {
    const movieId = req.params.movieId;

    const ratingResp = await Rating.findAll({
        attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'avgRating']],
        where: { movieId: movieId }
    });

    const avgRating = ratingResp[0].dataValues.avgRating;
    if (ratingResp) {
        return res.json({ rating: Math.ceil(avgRating) });
    }
    else {
        return res.json({ err: 'No data found' })
    }
}

