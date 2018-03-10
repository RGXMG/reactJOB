// @flow
import './index.css'
import bg from './img/bbb.jpg'
import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {updateUserInfo} from '../../redux/user.redux'
import AvatorSelectot from '../../component/avatar-selector/avator-selectot';

const DivBossInfoWrap = styled.div`
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
            company: '',
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
            <DivBossInfoWrap>
                {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : ''}
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatorSelectot onChange={this.onChange.bind(this)}></AvatorSelectot>
                <div className="inputItemDIV" style={{margin: '20px 15px'}}>
                    <InputItem placeholder="请输入招聘职位"
                               onChange={(v) => this.onChange('title', v)}>
                        招聘职位：
                    </InputItem>
                    <InputItem placeholder="请输入公司名称"
                               onChange={(v) => this.onChange('company', v)}>
                        公司名称：
                    </InputItem>
                    <InputItem placeholder="请输入职位薪资"
                               onChange={(v) => this.onChange('money', v)}>
                        职位薪资：
                    </InputItem>
                    <TextareaItem
                        placeholder="请描述职位要求"
                        onChange={(v) => this.onChange('desc', v)}
                        rows={3}
                        autoHeight
                        title='职位要求：'
                    >
                    </TextareaItem>
                    <BtnSave style={{ }}
                        onClick={() => {
                            this.props.updateUserInfo(this.state)
                        }}
                       >保存
                    </BtnSave>
                </div>
            </DivBossInfoWrap>
        )
    }
}

export default BossInfo;