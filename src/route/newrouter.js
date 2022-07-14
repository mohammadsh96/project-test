'use strict';

const express = require('express');
const dataModules = require('../model/index.model');
const bearer = require('../auth/bearer');
const acl = require('../auth/acl');

const newrouter = express.Router();
newrouter.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

newrouter.get('/:model/:category', bearer,acl('read'),FilterbyCategory);

async function FilterbyCategory(req, res) {
  const category = req.params.category;
  let theRecord = await req.model.get(category)
  res.status(200).json(theRecord);
}



module.exports = newrouter;