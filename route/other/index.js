const express = require('express');

const other = express.Router();

other.post('/commit/:key',require('./commit'));

module.exports = other;