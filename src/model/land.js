'use strict';
const landModel = (sequelize, DataTypes) => 
sequelize.define('land', {
   
    category: {
        type: DataTypes.STRING,
        required: true
    }, 
    describtion: {
        type: DataTypes.STRING,
        required: true
    },
    area: {
        type: DataTypes.STRING,
        required: true
    },
    location: {
        type: DataTypes.STRING,
        required: true
    },
    price: {
        type: DataTypes.STRING,
        required: true
    },
    owner: {
        type: DataTypes.STRING,
        required: true
    },
    phone: {
        type: DataTypes.STRING,
        required: true
    }
});

module.exports =landModel;