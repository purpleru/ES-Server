const express = require('express');

const other = express.Router();

other.post('/commit/:key', require('./commit'));
other.post('/validate', require('./validateService'));

module.exports = other;