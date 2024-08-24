const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    favoriteAds: {
        type: DataTypes.JSON, // JSON type to store an array of numbers
        allowNull: true,
        defaultValue: []
    }
}, {
    timestamps: true
});

module.exports = User;
