const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Rating = sequelize.define('ratings', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    movieId: {
        type: Sequelize.INTEGER,
    },
    rating: {
        type: Sequelize.INTEGER
    },
    timeStamp: {
        type: Sequelize.STRING
    }
});

module.exports = Rating;
