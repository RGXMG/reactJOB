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

function NoKonwError(res){
    return res.json({code:0,msg:'服务器错误，请刷新后重试！'});
}

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
            let json={};
            if(err)json={code:-1,msg:'Server Error'}
            else if(doc)json = {code:0,data:doc}
            else json={code:1}
            return res.json(json);
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
    console.log(req);
    const {name,pwd,type,isSupplement}=req.body;
    //判断是否已经存在用户名
    User.findOne({name},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名已存在'});
        }
        //const REuser=new User({name,pwd:utilyMd5(pwd),type,isSupplement});

        //save方法保存到MongoDB数据

        // REuser.save(function(err,doc){
        //     if(err){
        //         return {msg:'服务器错误，请稍后尝试'}
        //     }
        //     res.cookie('userid',doc._id);
        //     return {code:0,msg:'注册成功',data:doc}
        // });

        User.create({name,pwd:utilyMd5(pwd),type,isSupplement},_filter,function(err,doc){
            err && NoKonwError(res);
            //返回cookie信息
            res.cookie('userid',doc._id);
            console.log(doc);
            const {_id,name,type,isSupplement}=doc;
            return res.json({code:0,msg:'注册成功',data:{_id,name,type,isSupplement}});
        })
    })
});

Router.post('/update',function(req,res){
    const userid=req.cookies.userid;
    if(!userid) return res.json.dumps({code:-1});
    const body = req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){
        err && NoKonwError(res);
        const data=Object.assign({},{
            user:doc.user,
            type:doc.type,
        },body);
        return res.json({code:0,data});
    })
})

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc);
    })
})


module.exports = Router;