/**
 * Created by GRIMES on 2018/1/2 0002.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux'
import { Redirect ,Route } from 'react-router-dom'
import {
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'

import Logo from '../../component/logo/logo'
import {login} from '../../redux/user.redux'
import './login.css'

@connect(
    state=>state.user,
    { login }
)
class Login extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                name:'',
                pwd:''
            }
            this.Goregister = this.Goregister.bind(this);
            this.userLogin  = this.userLogin.bind(this);
        };

        saveInfo(key,v){
            this.setState({
                [key] : v
            })
        }

        userLogin(){
            this.props.login(this.state);
        }

        Goregister() {
            this.props.history.push('/register');
        }

        render() {
            return (
                <div>
                    <Logo></Logo>
                    {this.props.redirect?<Redirect to={this.props.redirect} />:''}
                    <h2 className="title">LOGIN</h2>
                    {this.props.msg
                        ?
                        <span style={{color:'red',fontSize:'13px',paddingLeft:'20px'}}>
                            {this.props.msg}
                        </span>:''
                    }
                    <WingBlank>
                        <List>
                            <WhiteSpace/>
                            <InputItem onChange={(v)=>this.saveInfo('name',v)}>NAME</InputItem>
                            <WhiteSpace/>
                            <InputItem onChange={(v)=>this.saveInfo('pwd',v)}>PASSWORD</InputItem>
                        </List>
                        <WhiteSpace/>
                        <WhiteSpace/>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.userLogin}>LOGIN</Button>
                        <WhiteSpace/>

                        <Button onClick={this.Goregister} type="primary">
                            REGISTER
                        </Button>
                    </WingBlank>
                </div>
            );
        }
    }
export default Login