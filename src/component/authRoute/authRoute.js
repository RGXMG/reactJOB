/**
 * Created by GRIMES on 2018/1/9 0009.
 *
 *  验证用户是否已经登录
 */
import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

@withRouter  //提供混合模式 minxs？？？
class AuthRoute extends React.Component{
    componentWillMount(){
        const currentPathName=this.props.history.location.pathname;
        const vaildPath=['/login','/register'];

        axios.get('/user/info').then((res)=> {
            if(res.status===200&&res.data.code===1){
                if(vaildPath.indexOf(currentPathName)>-1){
                    return null;
                }
                else {
                    this.props.history.push('/login');
                }
            }
        });
    }

    render(){
        return null;
    }
}
export default AuthRoute;