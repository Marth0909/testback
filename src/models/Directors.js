const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Directors = sequelize.define('directors', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT, //se usará text para que no tenga el numero de caracteres limitado
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

module.exports = Directors;