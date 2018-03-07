import './index.css'
import bg from './img/bbb.jpg'
import React from 'react';
import { connect } from 'react-redux'
import {NavBar,InputItem,TextareaItem, Button} from 'antd-mobile';
import { updateUserInfo } from '../../redux/user.redux'
import AvatorSelectot from '../../component/avatar-selector/avator-selectot'

@connect(
    state=>state.user,
    {updateUserInfo}
)
 class BossInfo extends React.Component {
    constructor() {
        super();
        this.state={
            title:'',
            company:'',
            money:'',
            desc:''
        }
    }

     onChange(key,v){
        this.setState({
            [key]:v
        })
     }

    render(){
        return (
            <div style={{position:'relative',height:'100%',backgroundImage:`url(${bg})`}}>
                <NavBar mode="dark" >BOSS完善信息页</NavBar>
                    <AvatorSelectot></AvatorSelectot>
                <div className="inputItemDIV" style={{margin: '20px 15px'}}>
                    <InputItem placeholder="请输入招聘职位" onChange={(v)=>this.onChange('title',v)}>
                        招聘职位：
                    </InputItem>
                    <InputItem placeholder="请输入公司名称" onChange={(v)=>this.onChange('company',v)}>
                        公司名称：
                    </InputItem>
                    <InputItem placeholder="请输入职位薪资" onChange={(v)=>this.onChange('money',v)}>
                        职位薪资：
                    </InputItem>
                    <TextareaItem
                        placeholder="请描述职位要求"
                        onChange={(v)=>this.onChange('desc',v)}
                        rows={3}
                        autoHeight
                        title='职位要求：'
                    >
                    </TextareaItem>
                    <Button style={{position: 'absolute',
                                    bottom: '25px',
                                    width: '92%'}}
                            nClick={()=>{this.props.updateUserInfo(this.state)}}
                            type='primary'>保存
                    </Button>
                </div>
            </div>
        )
    }
}
export default BossInfo;