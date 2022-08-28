const { Schema, model } = require('mongoose');

const Joi = require('joi');

const emailSchema = new Schema({
    host: {
        type: String,
        required: true,
        minlength: [4, 'host属性长度不能少于4'],
        maxlength: [50, 'host属性长度不能大于50'],
        trim: true
    },
    port: {
        type: Number,
        required: true
    },
    author: {
        user: {
            type: String,
            required: true,
            minlength: [4, 'user属性长度不能少于4'],
            maxlength: [50, 'user属性长度不能大于50'],
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: [4, 'user属性长度不能少于4'],
            maxlength: [50, 'user属性长度不能大于50'],
            trim: true
        }
    },
    sendName: {
        type: String,
        minlength: [4, 'snedName属性长度不能少于4'],
        maxlength: [30, 'sendName属性长度不能大于30'],
        trim: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Email = model('Email', emailSchema);

const EmailJoiSchema = Joi.object({
    host: Joi.string().required().$.min(4).max(100).rule({ message: '主机字符长度最小为4并且不能超过100' }),
    author: {
        user: Joi.string().required().$.min(4).max(100).rule({ message: '账户长度最小为4并且不能超过100' }),
        password: Joi.string().required().$.min(4).max(100).rule({ message: '密码长度最小为4并且不能超过100' })
    },
    port: Joi.number().required().$.min(1).max(65535).rule({ message: '端口的值应该为1-65535之间的值' }),
    sendName: Joi.string().required().$.min(4).max(80).rule({ message: '发信名称长度最小为4并且不能超过80长度' })
});

// var g = EmailJoiSchema.validate({
//     host: 'asasa',
//     author: {
//         user: '88888',
//         password: 'wewewewe'
//     },
//     port: '88',
//     sendName:'89'
// });

// console.log(g);


module.exports = {
    Email,
    EmailJoiSchema
}
