const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Using environment variables to connect to the MySQL database
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging; default is console.log
});

module.exports = sequelize;
