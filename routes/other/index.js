const express = require('express');

const other = express.Router();

other.post('/commit/:key', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
}, require('./commit'));
other.post('/validate', require('./validateService'));

module.exports = other;