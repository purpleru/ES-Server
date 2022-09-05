const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

const commitSchema = new Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 150,
        required: true
    },
    email: {
        type: Schema.Types.ObjectId,
        ref: 'Email',
        required: true
    },
    sendName: {
        type: String,
        minlength: 2,
        maxlength: 80
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addressee: {
        type: String,
        validate: {
            validator(val) {
                return emailReg.test(val);
            },
            message: 'addressee不符合验证规则'
        },
        required: true
    }
});

const Commit = model('Commit', commitSchema);

const CommitJoiSchema = Joi.object({
    title: Joi.string().required().min(4).max(150),
    addressee: Joi.string().required().regex(emailReg).min(6).error(new Error('收信地址不符合验证规则')),
    sendName: Joi.string().required().min(2).max(80)
});
module.exports = {
    Commit,
    CommitJoiSchema
};

