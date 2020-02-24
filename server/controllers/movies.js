const Movies = require('../models/movie');
const Ratings = require('../models/ratings');
const sequelize = require('sequelize').Sequelize;
exports.getMovies = async (req, res, next) => {

  const currentPage = req.params.page || 1;
  const perPageLimit = 9;


  let firstMovie = await Movies.findOne({
    attributes: ['movieId']
  });
  let firstMovieId = firstMovie.dataValues.movieId;

  let lastMovie = await Movies.findOne({
    attributes: ['movieId'],
    order: [['movieId', 'DESC']]
  });
  let lastMovieId = lastMovie.dataValues.movieId;

  Movies.findAll({
    offset: (currentPage - 1) * perPageLimit,
    limit: 9,
  }).then(
    movies => {
      if (movies) {
        // console.log(movies[8].dataValues,movies[8].dataValues === lastMovieId);
        return res.json({
          movies,
          hasmore: movies[8].dataValues.movieId === lastMovieId ? false : true,
          hasprev: movies[0].dataValues.movieId === firstMovieId ? false : true,
        });

      }
    }
  ).catch(err => { console.log('ERROR IN getMovies()', err); });

};

exports.getMovieByMovieId = (req, res, next) => {
  const movieId = req.params.movieId;
  Movies.findByPk(movieId)
    .then(movie => {
      if (!movie) {
        return res.json({
          error: 'No Movie Found'
        });
      }
      return res.json({ movie });
    })
}

exports.getWatchlist = async (req, res, next) => {

  const watchList = await Movies.findAll({ where: { watched: 1 } })
  return res.json({ watchList: watchList });
}

exports.updateWatchlist = async (req, res, next) => {
  let watch;
  const { movieId, task } = req.body;
  if (task === "add") {
    watch = 1;
  }
  if (task === "remove") {
    watch = 0;
  }

  const updatedResponse = await Movies.update(
    { watched: watch },
    { where: { movieId: movieId } }
  )
  if (updatedResponse) {

    const movieDetail = await Movies.findOne({ where: { movieId: movieId } })
    return res.json(
      {
        movie: movieDetail,
        code: 200,
      })
  }
}


exports.getMoviesWithComedyAndRating = async (req, res, next) => {

  const {genre,rating} = req.body;

  const resp = await Movies.findAll({
    attributes: [
      'movieId',
      'title',
      'genres',
      [sequelize.fn('avg', sequelize.col('ratings.rating')), 'avgRating']],
    include: [{
      model: Ratings,
      attributes: [],
    }],

    group: ['movies.title'],
  });


  const testdata = resp.filter(data => data.dataValues &&  data.dataValues.genres.toLowerCase().includes(genre.toLowerCase()) && data.dataValues.avgRating>=rating);

  return res.json(testdata);
}