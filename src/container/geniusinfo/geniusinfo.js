// @flow
import './index.css'
import bg from './img/bg.jpg'
import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {updateUserInfo} from '../../redux/user.redux'
import AvatorSelectot from '../../component/avatar-selector/avator-selectot';

const DivGeniusWrap = styled.div`
    position:relative;
    height:100%;
    backgroundImage:url(${bg})
   `;
const BtnSave=styled.button`
    position: absolute;
    bottom: 5%;
    left: 50%;
    margin-left: -45%;
    width: 90%;
    height: 50px;
    background: #00b6ff;
    border: none;
`
@connect(
    state => state.user,
    {updateUserInfo}
)

class BossInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            avatar: '',
            title: '',
            money: '',
            desc: ''
        }
    }

    onChange(key:string, v:string) {
        this.setState({
            [key]: v
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirect;
        return (
            <DivGeniusWrap>
                {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : ''}
                <NavBar mode="dark">求职者完善信息页</NavBar>
                <AvatorSelectot onChange={this.onChange.bind(this)}></AvatorSelectot>
                <div className="inputItemDIV" style={{margin: '20px 15px'}}>
                    <InputItem placeholder="请输入感兴趣的职位"
                               onChange={(v) => this.onChange('title', v)}>
                        职位：
                    </InputItem>
                    <InputItem placeholder="请输入期望薪资"
                               onChange={(v) => this.onChange('money', v)}>
                        职位薪资：
                    </InputItem>
                    <TextareaItem
                        placeholder="请输入个人简介"
                        onChange={(v) => this.onChange('desc', v)}
                        rows={3}
                        autoHeight
                        title='简介：'
                    >
                    </TextareaItem>
                    <BtnSave style={{ }}
                             onClick={() => {
                                 this.props.updateUserInfo(this.state)
                             }}
                    >保存
                    </BtnSave>
                </div>
            </DivGeniusWrap>
        )
    }
}

export default BossInfo;