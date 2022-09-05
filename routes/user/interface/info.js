const mongoose = require('mongoose');
const { Commit } = require('../../../mongo/models/Commit');

module.exports = function (req, res, next) {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.json({
            code: 400,
            msg: '获取失败,请检查提交ID是否正确!'
        });
    }

    Commit.findById(id).populate('user', '-password').populate('email', '-author.password').exec(function (err, doc) {
        if (err) {
            return next(err);
        } else if (!doc) {
            return res.json({
                code: 201,
                msg: '获取失败,此接口ID不存在!'
            });
        }
        res.json({
            code: 200,
            msg: '获取成功!',
            info: doc
        });
    });

}