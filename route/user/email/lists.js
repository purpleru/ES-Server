const { Email, EmailJoiSchema } = require('../../../mongo/models/Email');
module.exports = function (req, res) {
    Email.find({}, '-author.password').populate('user', '-password').exec(function (err, docs) {
        if (err) {
            return res.json({
                code: 500,
                msg: err.message
            });
        }
        res.json({
            code: 200,
            lists: docs
        });
    });
}