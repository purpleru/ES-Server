
const { Email, EmailJoiSchema } = require('../../../mongo/models/Email');

module.exports = async function (req, res) {

    const { host, port, user, password, sendName } = req.body;

    const body = {
        host,
        port,
        author: {
            user,
            password
        },
        sendName
    }

    const { value, error } = EmailJoiSchema.validate(body);

    if (error) {
        return res.json({
            msg: error.message || '添加失败!',
            code: 400
        });
    }

    try {
        var findResult = await Email.findOne({
            'author.user': user
        }, '-author').populate('user', '-password -__v -email');

        if (findResult) {
            return res.json(Object.assign({
                code: 201,
                msg: '你提交的邮箱服务已经存在!'
            }, findResult.toObject()));
        }

        var createResult = await Email.create(Object.assign(value, { user: req.session.user._id }));

    } catch (err) {
        return res.json({
            code: 500,
            msg: err.message
        });
    }

    res.json(Object.assign({
        code: 200,
        msg: '添加成功!'
    }, createResult.toObject()));


}