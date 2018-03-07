/**
 * Created by GRIMES on 2018/1/9 0009.
 */
const mongoose = require('mongoose')
const DB_URL = 'localhost:27017/foundWordTwo';
mongoose.connect(DB_URL);//{useMongoClient:true}

mongoose.connection.on('connected', function () {
    console.log('MongDB---Connected Success!');
})

//‘表’模型
const models = {
    user : {
        'name'   : {'type': String, 'require': true}, //用户名
        'pwd'    : {'type': String, 'require': true}, //密码
        'type'   : {'type': String, 'require': true}, //用户类型
        'avatar' : {'type': String, 'require': true}, //头像
        'desc'   : {'type': String, 'require': true}, //简历描述
        'title'  : {'type': String},  //职位名称
        'company': {'type': String},  //公司名称
        'salary' : {'type': String}   //薪水
    },
    chat : {

    }
}

//循环创建‘表’
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

//对外暴露方法获取‘表’引用对象，实际上是给server是调用数据库
module.exports={
    getModel:function(name){
        return mongoose.model(name);
    }
}
// //mongoose.model相当于创建一张sql中的表
// const User=mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age :{type:Number,require:true}
// }))
//---增---
// User.create({
//     user:'RG',
//     age:20
// },function (err,doc) {
//         !err&&console.log(doc);
//         err&&console.log(err);
// })
//---删---
// User.remove({age:21},function (err,doc) {
//     console.log(doc);
// })
//---改---
// User.update({'user':'RG'},{$set:{ age : 1000}},function (err,d  oc) {
//     console.log(doc)
// })