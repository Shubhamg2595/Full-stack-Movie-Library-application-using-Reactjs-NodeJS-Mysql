const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Movie = sequelize.define('movies',{
    movieId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    genres: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    watched: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Movie;
