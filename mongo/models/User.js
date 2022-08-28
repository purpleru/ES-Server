const { Schema, model } = require('mongoose');

const Joi = require('joi');

const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

const userRule = new Schema({
    user: {
        type: String,
        required: [true, 'user不能为空'],
        minlength: [4, 'user长度最小为6'],
        maxlength: [16, 'user最大长度为16'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password不能为空'],
        minlength: [6, 'password长度最小为6'],
        maxlength: [20, 'password最大长度为20'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email不能为空'],
        trim: true,
        validate: {
            validator(val) {
                return emailReg.test(val);
            },
            message: 'email不符合验证规则'
        }
    },
    registerTime: {
        type: Number,
        default() {
            return Date.now();
        }
    },
    registerDate: {
        type: Date,
        default() {
            return Date.now();
        }
    }
});

const User = model('User', userRule);

const UserJoi = {
    user: Joi.string().required().alphanum().message('账户名称不符合规则').$.min(4).max(16).rule({ message: '账户长度最小为4并且不能超过16' }),
    password: Joi.string().required().pattern(/^[A-z0-9(\.\+\=\*\-\$\@)]{6,20}/).error(new Error('密码不符合验证规则')),
    email: Joi.string().required().pattern(emailReg).error(new Error('邮箱不符合验证规则'))
}

const RegisterJoiSchema = Joi.object(UserJoi);

const LoginJoiSchema = Joi.object({
    user: UserJoi.user,
    password: Joi.string().required().min(6).message('密码最小长度不能少于6')
});


module.exports = {
    User,
    RegisterJoiSchema,
    LoginJoiSchema
};