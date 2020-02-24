const express = require('express');
const bodyParser = require('body-parser');

const movieRoutes = require('./routes/movies');
const ratingRoutes = require('./routes/rating');

const app = express();

const sequelize = require('./util/database');

const Rating = require('./models/ratings');
const Movie = require('./models/movie');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/movies', movieRoutes);
app.use('/rating',ratingRoutes);

Movie.hasMany(Rating,{foreignKey: 'movieId'});

sequelize
    .sync()
    .then(() => { app.listen(8080); })
    .catch(err => console.log('ERROR in DB conn ::', err));