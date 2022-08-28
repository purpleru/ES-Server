const { User, LoginJoiSchema } = require('../../mongo/models/User');

const crypto = require('crypto');

module.exports = async function (req, res) {

    const { user, password, email } = req.body, loginTime = Date.now();

    const validateRes = LoginJoiSchema.validate({
        user,
        password
    });

    const resultData = {
        code: 250,
        ip: req.ip,
        msg: 'error',
        loginTime
    }

    if (!user || !password || user.trim().length === 0 || password.trim().length === 0) {
        return res.json(resultData);
    }

    if (validateRes.error) {
        return res.json(Object.assign(resultData, {
            msg: validateRes.error.message,
            code: 400
        }));
    }

    try {
        var findResult = await User.findOne({
            user: validateRes.value.user
        });

        if (findResult) {
            const databasePasswordHash = md5(findResult.password);
            if (validateRes.value.password === databasePasswordHash) {
                findResult = findResult.toObject();
                req.session.user = JSON.parse(JSON.stringify(findResult));
                delete findResult.password;
                return res.json(Object.assign(resultData, {
                    code: 200,
                    msg: '登录成功!',
                    user: findResult
                }));

            } else {
                return res.json(Object.assign(resultData, {
                    code: 201,
                    msg: '账户或者密码错误!'
                }));
            }
        } else {
            return res.json(Object.assign(resultData, {
                code: 302,
                msg: '该账户还没有注册!'
            }));
        }

    } catch (err) {
        return res.json({
            code: 500,
            msg: err.message || '登录失败,请联系管理员!'
        });
    }
}

function md5(str) {
    return crypto.createHash('md5').update(str.toString(), 'utf8').digest('hex');
}
