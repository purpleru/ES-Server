const { User } = require('../../mongo/models/User');

module.exports = function (req, res, next) {

    const { user: userInfo } = req.session;
    // console.log(userInfo);

    User.findById(userInfo._id, '-password').exec(function (err, doc) {
        if (err) {
            return res.json({
                code: 500,
                msg: err.message || '获取信息失败!'
            });
        }

        res.json({
            code: 200,
            msg: '获取信息成功!',
            user: doc.toObject()
        });
    });
}