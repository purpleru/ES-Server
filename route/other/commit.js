const { Commit } = require('../../mongo/models/Commit');

const nodemailer = require('nodemailer');

const Joi = require('joi');

const dataJoi = Joi.object({
    title: Joi.string().required().min(4).max(100),
    content: Joi.string().required().min(4).max(3000)
});

module.exports = async function (req, res) {
    const { key } = req.params;

    const { title, content } = req.body;


    const validateRes = dataJoi.validate(req.body);

    if (validateRes.error) {
        return res.json({
            code: 400,
            msg: validateRes.error.message
        });
    }

    console.log(validateRes);


    Commit.findById(key).populate(['user', 'email']).exec(async function (err, result) {

        if (err) {
            return res.end();
        } else if (!result) {
            return res.json({
                code: 400,
                msg: '此密钥不存在,请检查提交的密钥是否存在!'
            });
        }

        const { email, addressee, snedName } = result;

        const transporter = nodemailer.createTransport({
            host: email.host,
            port: email.port,
            secure: email.port === 465, // true for 465, false for other ports
            auth: {
                user: email.author.user, // generated ethereal user
                pass: email.author.password, // generated ethereal password
            }
        });

        const from = `"${snedName}" <${email.author.user}>`;

        transporter.sendMail({
            from: from, // sender address
            to: addressee, // list of receivers
            subject: title, // Subject line
            text: content, // plain text body
            //html: "<b>Hello world?</b>", // html body
        }, function (err, info) {

            if (err) {
                return res.json({
                    code: 401,
                    msg: err.message,
                    transporter: {
                        host: transporter.options.host,
                        port: transporter.options.port
                    },
                    to: addressee,
                    from
                });
            }

            const { response, envelope, accepted } = info;

            res.json({
                msg: response || '发送成功!',
                code: 200,
                envelope,
                accepted
            });
        });
    });
}