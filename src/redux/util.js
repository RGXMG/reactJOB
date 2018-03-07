/**
 * Created by GRIMES on 2018/1/10 0010.
 */
export function rediectTo({type,avator}){
    //根据用户信息 返回跳转地址
    //user.type: boss genius
    //user.avator: /bossinfo,/geniusinfo
    let url= avator
        ? (type === 'boss' ? '/boss'    :'/genius')
        : (type === 'boss' ? '/bossinfo':'/geniusinfo')
    return url;
}

/**
 * 格式化ID
 * @param data
 * @returns {*}
 */
export function fromatId(data){
    data.id=data._id;
    delete data._id;
    return data;
}