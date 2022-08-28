const { Schema, model } = require('mongoose');


const Users = model('Users', new Schema({
    userName: String,
    password: String,
    age: Number
}), 'Users');


const Articles = model('Articles', new Schema({
    title: String,
    description: String,
    author: Schema.Types.ObjectId,
    category_id: Schema.Types.ObjectId
}), 'Articles');


const Categorys = model('Categorys', new Schema({
    title: String,
    description: String
}), 'Categorys');



// Categorys.create([{
//     title:'手机',
//     description:'国产手机，品牌手机，二手手机'
// },{
//     title:'食物',
//     description:'国产食物，品牌食物，美味食物'
// }]);

// Users.create([{
//     userName: '张三',
//     password: '123456',
//     age: 18
// }, {
//     userName: '李四',
//     password: '112233',
//     age: 19
// }, {
//     userName: '王五',
//     password: '741852',
//     age: 20
// }]);


// Articles.create([{
//     title: '张三发布手机文章',
//     description: '这是一台很好用的手机',
//     author: '630a0779df53fe639c405c92',
//     category_id: '630a070c19facb2e48904008'
// },{
//     title: '张三发布手机文章1',
//     description: '这是一台很好用的手机1',
//     author: '630a0779df53fe639c405c92',
//     category_id: '630a070c19facb2e48904008'
// },{
//     title: '张三发布手机文章2',
//     description: '这是一台很好用的手机2',
//     author: '630a0779df53fe639c405c92',
//     category_id: '630a070c19facb2e48904008'
// },{
//     title: '张三发布食物文章',
//     description: '食物文章美味可口',
//     author: '630a0779df53fe639c405c92',
//     category_id: '630a070c19facb2e48904009'
// },{
//     title: '李四发布手机文章1',
//     description: '这是一台很好用的手机1',
//     author: '630a0779df53fe639c405c93',
//     category_id: '630a070c19facb2e48904008'
// }]);

// 利用管道查询用户发布的所有文章
Users.aggregate([{
    $lookup: {
        from: 'Articles',// 从哪个集合中查找
        localField: '_id',// 本地关联的字段
        foreignField: 'author',// 集合中关联的字段
        as: 'articles'// 把查找到的结果填充到文档对象中的articles属性中
    }
}]).then(docs => {
    console.log(JSON.stringify(docs));
    console.log(docs);

});