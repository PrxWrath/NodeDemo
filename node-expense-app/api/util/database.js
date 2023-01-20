const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodedemo', 'root', 'pratyush', {
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;