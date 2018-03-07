/**
 * Created by GRIMES on 2018/1/9 0009.
 * express中间件---user相关的路由接口
 */
const express=require('express');
const Router=express.Router();
const model = require('../model');
const utilyMd5 = require('../util');
//‘表’模型的创建
const User = model.getModel('user');

const _filter = {'pwd':0,'__v':0}

//清除所有MongoDB数据
// User.remove({},function(err,doc){
//     if(doc){
//         console.log('删除成功'+doc);
//     }
// });

Router.get('/info',function(req,res){
    //判断cookie信息
    const { userid } = req.cookies
    if(userid){
        User.findOne({'_id':userid},_filter,function(err,doc){
            if(err){return res.json({code:-1,msg:'Server Error'})}
            else if(doc){ return res.json({code:0})}
            else{return res.json({code:1})}
        })
    }
    else{
        return res.json({code:1});
    }

})

Router.post('/login',function(req,res){
    const {name,pwd}=req.body;

    //findOne中间的参数为不加到doc中去显示
    User.findOne({name,'pwd' : utilyMd5(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名不正确或密码错误'})
        }
        else{
            res.cookie('userid',doc._id)  //设置cookie信息

            return res.json({code:0,data:doc})
        }
    })
});

Router.post('/register',function(req,res){
    const {name,pwd,type}=req.body;
    //判断是否已经存在用户名
    User.findOne({name},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名已存在'});
        }
        const REuser=new User({name,pwd:utilyMd5(pwd),type});

        //save方法保存到MongoDB数据

        // REuser.save(function(err,doc){
        //     if(err){
        //         return {msg:'服务器错误，请稍后尝试'}
        //     }
        //     res.cookie('userid',doc._id);
        //     return {code:0,msg:'注册成功',data:doc}
        // });

        User.create({name,pwd:utilyMd5(pwd),type},_filter,function(err,doc){
            if(err){
                return res.json({code:1,msg:'服务器错误，请稍后尝试'});
            }
            //返回cookie信息
            res.cookie('userid',doc._id);
            const {_id,name,type}=doc;
            return res.json({code:0,msg:'注册成功',data:{_id,name,type}});
        })
    })
});

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc);
    })
})


module.exports = Router;