module.exports = function (req, res, next) {
    const { path } = req, exclude = ['/register', '/login'];
    if (!req.session.user && exclude.indexOf(path) === -1) {
        return res.json({
            code: 401,
            msg: '请先进行登录!'
        })
    } else {
        next();
    }
}