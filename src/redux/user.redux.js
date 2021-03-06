/**
 * Created by GRIMES on 2018/1/9 0009.
 */
import axios from 'axios';

import { rediectTo ,fromatId} from "./util";

const ERROR_MSG        = 'ERROR_MSG';
const AUTH_SUCCESS     = 'AUTH_SUCCESS';

const initState = {
    isAuth     : false,
    id         : '',
    name       : '',
    type       : '',
    redirect   : '',
    msg        : ''
}

//reducer
export default function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,isAuth: true, msg: action.payload.msg,redirect:rediectTo(action.payload.data),  ...action.payload.data};
            break;
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
            break;
        default:
            return state;
    }
}

function errMsg(msg) {
  return {msg,type:ERROR_MSG};
}
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}

//登录
export  function login(state){
    var {name,pwd}=state;
    if(!name || !pwd){
        return errMsg('请输入用户名和密码');
    }
    else{
        return dispatch=>{
            axios.post('/user/login',{name,pwd}).then(function(res){
                if(res.status === 200 && res.data.code === 0){
                    const data = fromatId(res.data.data);
                    dispatch(authSuccess(data));
                }
                else{
                    dispatch(errMsg(res.data.msg));
                }
            });
        }
    }
}

//注册
export  function register(state) {
    var {name, pwd, confirmpwd,isSupplement=1, type}=state;
    if (!name || !pwd || !confirmpwd) {
        return errMsg('请输入用户名或俩次密码并选择身份类型补充完整');
    }
    else if (pwd !== confirmpwd) {
        return errMsg('俩次密码不一致');
    }
    else {
        return dispatch => {
            axios.post('/user/register', {name, pwd, type,isSupplement}).then((res) => {
                if (res.status === 200 && res.data.code === 0) {
                    const msg  = res.data.msg,
                          data = fromatId(res.data.data); //格式化ID
                    dispatch(authSuccess({msg,data}));
                }
                else {
                    dispatch(errMsg(res.data.msg));
                }
            });
        };
    }
}

//加载用户信息
export function loadUserInfo(state){
    return dispatch=>dispatch(authSuccess(state));
}

export function updateUserInfo(state){
    var {title,avatar,company,money,desc} = state;
        return dispatch=>{
            axios.post('/user/update',state).then((res)=>{
                if(res.status===200 && res.data.code===0){
                   dispatch(authSuccess(res.data));
                }
                else{
                    dispatch(errMsg(res.data.msg));
                }
            })
        }
}

