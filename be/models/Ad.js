const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ad = sequelize.define('Ad', {
    adPhoto: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    adTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    budget: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isProduct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Product İlanlarına Özel Alanlar
    productSpecialType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productSpecialDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productSpecialStartCity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productSpecialEndCity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productSpecialIsElevatorNeeded: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    productSpecialStartFloor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    productSpecialEndFloor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    //Vehicle İlanlarına Özel Alanlar
    vehicleSpecialLicensePlate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vehicleSpecialType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vehicleSpecialServiceCities: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Ad;
