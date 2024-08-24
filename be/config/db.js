const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('transport_db', 'root', 'Admin123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
