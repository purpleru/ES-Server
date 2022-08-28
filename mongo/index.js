const mongoose = require('mongoose');

const connectAddress = `mongodb://localhost/email`;

mongoose.connect(connectAddress, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        return console.log('数据库连接出错');
    }
    console.log('数据库连接OK');
});