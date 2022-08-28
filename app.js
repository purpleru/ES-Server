const express = require('express');

const app = express();

const expressSession = require('express-session');

const globalConfig = require('./config/global.json');

require('./mongo/index');

app.use(expressSession({
    secret: globalConfig.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));

app.use(require('./route/index'));

app.listen(3000, function (err) {

    if (err) {
        return console.log(err);
    }
    console.log('服务启动成功');

});
