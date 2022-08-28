const express = require('express');

const user = express.Router();

user.use(require('./appraisal'));
user.post('/register', require('./register'));
user.post('/login', require('./login'));
user.get('/emails', require('./email/lists'));
user.post('/email', require('./email/add'));

user.get('/info', (req, res, next) => {
    console.log(req.session.user);

    if (req.session.user) {
        return res.json({
            code: 200,
            msg: '你好呀'
        });
    } else {
        return res.json({
            code: 400,
            msg: '对不起我不认得你'
        });
    }
});

module.exports = user;