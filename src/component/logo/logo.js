/**
 * Created by GRIMES on 2018/1/5 0005.
 */
import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components'

import logoImg from './job.png'

const LogoBlock=styled.img`
    text-align: center;
    margin: 20px auto 0px auto;
    display: block;
`

class Logo extends React.Component{
    constructor(){
        super();
    }
        render(){

            return(
                <div>
                    <LogoBlock src={logoImg}/>
                </div>
            )
        }


}

export default Logo;