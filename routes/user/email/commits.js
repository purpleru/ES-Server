const { User } = require('../../../mongo/models/User');
const { Commit } = require('../../../mongo/models/Commit');
const mongoose = require('mongoose');
module.exports = function (req, res, next) {

    Commit.find({
        user: req.session.user._id
    }, "-__v").populate('email', '-author.password -__v').exec(function (err, docs) {
        if (err) {
            return next(err);
        }
        res.json({
            code: 200,
            msg: '获取成功!',
            commits: docs
        })
    });

}