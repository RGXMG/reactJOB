//@flow
import React from 'react';
import {Modal, Grid} from 'antd-mobile';
import styled from 'styled-components'
let avatarList;
let avatarAlert;
const Alert = Modal.alert;

const AvatorSelect=styled.div`
    height: 100px;
    width: 100px;
    margin: 10% auto 0 auto;
    background: white;
    text-align: center;
    line-height: 130px;
    border-radius: 50%;
    box-shadow: 0 0 5px 1px #d9d9d9;
`;

const Imgblock =styled.img`
   width: 60px;
   height: 60px;
   paddingTop: 20%;
`;

type Props ={
    onChange:Function
}

class AvatorSelectot extends React.Component<Props>{
    constructor() {
        super();
        this.state = {};
        this.openModel = this.openModel.bind(this);
    }

    componentWillMount() {
        avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`./img/${v}.png`),
            }));
    }

    openModel() {
        const grid = <Grid
            data={avatarList}
            hasLine={false}
            columnNum={3}
            onClick={elm => {
                this.setState(elm,()=>{
                    this.props.onChange('avatar',this.state.icon);
                });
                avatarAlert.close();
            }}/>

        avatarAlert = Alert('请选择', grid, [
            {text: 'Cancel', onPress: () => '', style: 'default'},
        ]);
        // swal(
        //     'The Internet?',
        //     'That thing is still around?',
        //     'error'
        // )
    }



    render() {
        return (
            <div>
                    <AvatorSelect onClick={this.openModel}>
                        {this.state.icon
                            ? <Imgblock src={this.state.icon} style={{}}
                                   alt=""/>
                            : <span style={{color:'#cecece'}}>选择头像</span>
                        }
                    </AvatorSelect>
            </div>
        )
    }
}
export default AvatorSelectot