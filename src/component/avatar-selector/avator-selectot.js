import './index.css'

import React from 'react';
import {Modal, Grid} from 'antd-mobile';
import swal from 'sweetalert2';

let avatarList;
let avatarAlert;
const Alert = Modal.alert;

class AvatorSelectot extends React.Component {
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
                this.setState(elm);
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
                    <div onClick={this.openModel} className='img-warp'>
                        {this.state.icon
                            ? <img src={this.state.icon} style={{width: '60px', height: '60px', paddingTop: '20%'}}
                                   alt=""/>
                            : <span style={{color:'#cecece'}}>选择头像</span>
                        }
                    </div>
            </div>
        )
    }
}

export default AvatorSelectot