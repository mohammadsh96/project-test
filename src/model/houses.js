'use strict';
const houseModel = (sequelize, DataTypes) => 
sequelize.define('house', {
   
    category: {
        type: DataTypes.STRING,
        required: true
    }, describtion: {
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

module.exports = houseModel;