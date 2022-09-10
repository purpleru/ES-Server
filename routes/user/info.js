const { User } = require('../../mongo/models/User');
const { Commit } = require('../../mongo/models/Commit');
const { Email } = require('../../mongo/models/Email');
module.exports = async function (req, res, next) {

    const { user: userInfo } = req.session;
    // console.log(userInfo);
    try {
        var info = await User.findById(userInfo._id, '-password');
        var userCount = await User.countDocuments({});
        var interfaceCount = await Commit.countDocuments({ user: userInfo._id });
        var serviceCount = await Email.countDocuments({});
    } catch (err) {
        return res.json({
            code: 500,
            msg: err.message || '获取信息失败!'
        });
    }

    res.json({
        code: 200,
        msg: '获取信息成功!',
        user: info.toObject(),
        userCount,
        interfaceCount,
        serviceCount
    });
}
