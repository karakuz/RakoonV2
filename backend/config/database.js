const { Sequelize } = require('sequelize');
const { modelName } = require('../models/user');
require('dotenv').config({ path: './.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const connectDB = async function () {
  return new Promise(async (resolve,reject)=>{
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      resolve();
  } catch (error) {
      console.error('Unable to connect to the database:', error);
      reject();
  }
  })
}

const get = async (sql, options) =>{
  await connectDB();
  const [results, metadata] = await sequelize.query(sql, options);
  await sequelize.close();
  
  return results;
} 

module.exports = {
  sequelize,
  connectDB,
  get
};