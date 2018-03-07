/**
 * Created by GRIMES on 2018/1/3 0003.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import {WingBlank,List,Radio,WhiteSpace,InputItem,Button} from 'antd-mobile'

import Logo from '../../component/logo/logo'

import { register } from '../../redux/user.redux';

@connect(
    state=>state.user,
    { register }
)
class Register extends React.Component{
    constructor(){
        super();
        this.state={
            name:'',
            pwd:'',
            confirmpwd:'',
            type:'genius',  //'genius':大牛  'boss':猎头
        }
    }

    saveInfo(key,v){
        this.setState({
            [key]:v
        })
    }
    toRegister(){
        this.props.register(this.state);
    }
    render(){
        const RadioItem =Radio.RadioItem;
        return(
            <div>
                {this.props.redirect?<Redirect to={this.props.redirect} />:''}
                <Logo></Logo>
                <WingBlank>
                    <WhiteSpace/>
                    {this.props.msg
                        ?
                        <span style={{color:'red',fontSize:'13px',paddingLeft:'10px'}}>
                            {this.props.msg}
                        </span>:''
                    }
                    <List>
                        <InputItem
                            onChange={v=>this.saveInfo('name',v)}
                        >用户名:</InputItem>
                        <InputItem type="password"
                            onChange={v=>this.saveInfo('pwd',v)}
                        >密 &nbsp; 码:</InputItem>
                        <InputItem type="password"
                            onChange={v=>this.saveInfo('confirmpwd',v)}
                        >确认密码:</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem
                            onChange={()=>this.saveInfo('type','genuis')}
                            checked={this.state.type ==='genuis'}>我是求职者</RadioItem>
                        <RadioItem
                            onChange={()=>this.saveInfo('type','boss')}
                            checked={this.state.type ==='boss'}>我是boss</RadioItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <div>
                        <Button
                            onClick={this.toRegister.bind(this)}
                            type="primary">注册</Button>
                        <WhiteSpace/>
                        <Button type="primary" onClick={()=>this.props.history.push('/login')}>已有账号 返回登录</Button>
                    </div>
                </WingBlank>
            </div>
        );
    }
}

export  default Register;