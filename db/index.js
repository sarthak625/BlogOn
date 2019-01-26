const Sequelize = require('sequelize');

// Connect to the database
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect : 'postgres',       // can be 'mysql' | 'sqlite' | 'postgres' | 'mssql'
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Authenticate the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:',err);
    });

module.exports = {
    sequelize,
    Sequelize
};