const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('moviexpress','root','shubhamg2595:)',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;