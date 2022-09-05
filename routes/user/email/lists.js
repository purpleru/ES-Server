const { Email, EmailJoiSchema } = require('../../../mongo/models/Email');
const Joi = require('joi');
const validateQueryJoi = Joi.object({
    currentPage: Joi.number().required().min(1).messages({
        'any.required': '缺少当前页码数参数'
    }),
    pageSize: Joi.number().default(5).min(5).max(50)
});
module.exports = async function (req, res, next) {

    let { currentPage, pageSize } = req.query;

    const { error, value } = validateQueryJoi.validate({
        currentPage,
        pageSize
    });

    if (error) {
        return next({
            msg: error.message,
            code: 400
        });
    }

    currentPage = value.currentPage;
    pageSize = value.pageSize;

    try {
        var count = await Email.countDocuments({});

        var total = Math.ceil(count / pageSize);

        currentPage = currentPage > total ? total : currentPage;

        var start = (currentPage - 1) * pageSize;

        var emailLists = await Email.find({}, '-author.password').populate('user', '-password').skip(start).limit(pageSize);

    } catch (err) {
        return next(err);
    }

    res.json({
        code: 200,
        lists: emailLists,
        total,
        currentPage,
        pageSize
    });
}