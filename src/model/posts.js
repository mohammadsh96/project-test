'use strict';
const postModel = (sequelize, DataTypes) => 
sequelize.define('posts', {
    username: { 
        type: DataTypes.STRING, 
        required: true, unique: true 
    },
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
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    profileImg: {
        type: DataTypes.STRING,
        required: true
    }
});

module.exports = postModel;