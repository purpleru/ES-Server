const express = require('express');

const index = express.Router();

index.use('/user',require('./user/index'));
index.use('/other',require('./other/index'));

module.exports = index;