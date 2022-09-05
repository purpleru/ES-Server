const { EmailJoiSchema } = require('../../mongo/models/Email');
const { validateService } = require('../../config/global.json');
const nodemailer = require('nodemailer');
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
module.exports = async function (req, res, next) {
    const { host, user, password, port, email } = req.body;
    const validateData = {
        host,
        author: {
            user,
            password
        },
        port,
        sendName: 'EmailService'
    }
    const { error, value } = EmailJoiSchema.validate(validateData);
    if (error) {
        return res.json({
            code: 400,
            msg: error.message
        });
    } else if (!emailReg.test(email)) {
        return res.json({
            code: 400,
            msg: '邮箱地址不符合验证规则'
        });
    }

    let transporter = nodemailer.createTransport({
        host,
        port: value.port,
        secure: value.port === 465, // true for 465, false for other ports
        auth: {
            user,
            pass: password,
        },

        connectionTimeout: 8000,
        greetingTimeout: 5000

    });

    try {
        var { response, envelope, accepted, messageId } = await transporter.sendMail({
            from: `"${value.sendName}" <${user}>`,
            to: email,
            subject: validateService.title,
            html: validateService.content
        });
    } catch (err) {
        return next(err);
    }

    res.json({
        code: 200,
        msg: 'OK',
        response,
        envelope,
        accepted,
        messageId
    });
}