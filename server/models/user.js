const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('users',{
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
});

module.exports = User;
