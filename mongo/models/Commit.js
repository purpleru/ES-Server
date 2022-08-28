const { Schema, model } = require('mongoose');

const commitSchema = new Schema({
    title: {
        type: String
    },
    email: {
        type: Schema.Types.ObjectId,
        ref: 'Email'
    },
    snedName: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    addressee: String
});

const Commit = model('Commit', commitSchema);

// Commit.create({
//     title: '测试一下',
//     addressee: '3072953029@qq.com',
//     snedName: 'EmailService',
//     user: '630a1314c759065e54b4db8e',
//     email: '630864eea3299308e8171852'
// })

module.exports = {
    Commit
};

