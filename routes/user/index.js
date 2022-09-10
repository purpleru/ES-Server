const express = require('express');

const user = express.Router();

user.use(require('./appraisal'));
user.post('/register', require('./register'));
user.post('/login', require('./login'));
user.get('/emails', require('./email/lists'));
user.post('/email', require('./email/add'));
user.get('/info', require('./info'));
user.post('/interface', require('./interface/interface'));
user.get('/interface/:id', require('./interface/info'));
user.get('/commits', require('./email/commits'));
user.get('/logout', require('./logout'));

module.exports = user;