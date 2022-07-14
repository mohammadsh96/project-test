'use strict';
const express = require('express');
const secretStuffRouters=express.Router();
const bearerAuth=require('../auth/bearer');
const logger=require("../auth/logger");

secretStuffRouters.get('/secret',bearerAuth,(req,res)=>{
    res.status(200).json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });})

secretStuffRouters.use(logger);

module.exports=secretStuffRouters;