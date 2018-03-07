/**
 * Created by GRIMES on 2018/1/10 0010.
 */

//返回多重加密
const utily=require('utility');
function utilyMd5(pwd){
    let salt='RICK_GEIMES92JAMES!@#$%^&+9296jyy69jxbai54';
    return utily.md5(utily.md5(salt));
}
module.exports=utilyMd5;