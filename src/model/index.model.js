'use strict';
require('dotenv').config();
const houseModel = require('./houses')
const villaModel =require("./villa")
const landModel = require('./land')
const Collection = require('./collection');
const salesCollection=require("./forSale/salesCollection")
const forSaleModel = require('./forSale/forsale')
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user.model');
const postModel = require("./posts")


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const houseTable = houseModel(sequelize, DataTypes);
const villaTable = villaModel(sequelize, DataTypes);
const landTable = landModel(sequelize, DataTypes);
const forSaleTable = forSaleModel(sequelize, DataTypes);
const userTable = UserModel(sequelize, DataTypes);
const postTable = postModel(sequelize, DataTypes);

const houseCollection = new salesCollection(houseTable);
const forsaleCollection = new salesCollection(forSaleTable);
const villaCollection = new salesCollection(villaTable);
const landCollection = new salesCollection(landTable);
const postCollection = new salesCollection(postTable);

module.exports = {
    db: sequelize,
    house:houseCollection,
sales:forsaleCollection,
villa:villaCollection,
land:landCollection,
 Users: userTable,
 post:postCollection,
};