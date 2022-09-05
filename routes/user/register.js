const { User, RegisterJoiSchema } = require('../../mongo/models/User');

module.exports = async function (req, res) {

    const { user, password, email } = req.body, registerTime = Date.now();

    const body = {
        user,
        password,
        email
    }
    const validateRes = RegisterJoiSchema.validate(body),
        resultData = {
            code: 400,
            time: registerTime,
            body,
            ip: req.ip
        }

    if (validateRes.error) {
        return res.json(Object.assign(resultData, { msg: validateRes.error.message }));
    }

    try {
        var findResult = await User.findOne({ user: validateRes.value.user });
        if (findResult) {
            const msg = user + '账户已存在,请换个账户名称!'
            return res.json(Object.assign(resultData, { msg }));
        } else {
            var result = await User.create(Object.assign(validateRes.value, {
                registerTime: registerTime,
                registerDate: registerTime
            }));
        }

    } catch (err) {
        return res.json({
            code: 500,
            msg: err.message
        });
    }

    res.json({
        code: 200,
        msg: '注册成功',
        result,
        registerTime,
        ip: req.ip
    });
}