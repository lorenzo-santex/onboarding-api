require('dotenv').config();
/**
 * To add new configuration create a new file in
 * the ./config folder, define the variable as an
 * object, export it and then import the file in here.
 */

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'sqlite',
    operatorsAliases: '0',
    storage: 'database.sqlite'
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'sqlite',
    operatorsAliases: '0',
    storage: 'database.sqlite'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'sqlite',
    operatorsAliases: '0',
    storage: 'database.sqlite'
  },
};

module.exports = config;
