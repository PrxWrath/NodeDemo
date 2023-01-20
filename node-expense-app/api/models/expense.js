const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expenses', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amount:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Expense;