const { Sequelize } = require('sequelize');
const { modelName } = require('../models/user');

const sequelize = new Sequelize('testdb', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

const connectDB = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize;