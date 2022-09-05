module.exports = function (error, req, res, next) {
    var info;
    if (error instanceof Error) {
        try {
            info = JSON.parse(error.message);
        } catch{
            info = error.message;
        }
    } else {
        info = error;
    }


    if (info instanceof Object) {
        res.json(Object.assign({
            code: 500,
            msg: '服务器错误,请稍后再试!'
        }, info));
    } else {
        res.json({
            code: 500,
            msg: info || '服务器错误,请稍后再试!'
        });
    }

}

