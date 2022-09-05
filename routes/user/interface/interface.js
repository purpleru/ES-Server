const { Commit, CommitJoiSchema } = require('../../../mongo/models/Commit');
const { Email } = require('../../../mongo/models/Email');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    const { id } = req.query,
        { addressee, title, sendName } = req.body;

    const { error, value } = CommitJoiSchema.validate({
        title,
        addressee,
        sendName
    });
    if (error) {
        return next({
            code: 400,
            msg: error.message
        });
    }

    if (mongoose.isValidObjectId(id) === false) {
        return res.json({
            code: 400,
            msg: '这不是一个有效的ID'
        });
    }

    try {
        var result = await Email.findById(id);

        if (!result) {
            return next({
                code: 201,
                msg: '生成接口失败,不存在此邮箱服务'
            });
        }

        var doc = await Commit.create(Object.assign(value, {
            user: req.session.user._id,
            email: id
        }));

    } catch (err) {
        return next(err);
    }

    doc.populate('user', '-password', function (err, doc) {
        if (err) {
            return next(err);
        }
        doc.populate('email', '-author.password', function (err, doc) {
            if (err) {
                return next(err);
            }
            res.json(Object.assign({
                code: 200,
                msg: '生成接口成功!'
            }, doc.toObject()));
        });
    });
}