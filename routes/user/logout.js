module.exports = function (req, res) {
    req.session.destroy(function (error) {
        res.json({
            code: 200,
            msg: '退出成功！'
        });
    });
}