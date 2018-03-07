/**
 * Created by GRIMES on 2017/12/28 0028.
 *
 *
 * nodeJS中的异步执行函数一般第一个参数就是err
 */


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const userRouter = require('./Router/userrouter');  //路由作为中间件

var app=express();
app.use(cookieParser());
app.use(bodyParser());
app.use('/user',userRouter);  //user类型的路由控制


app.listen('8090',function(){
    console.log('express start success!');
})