/**
 * Created by GRIMES on 2018/1/5 0005.
 */
import React from 'react';
import ReactDom from 'react-dom';

import './logo.css'
import logoImg from './job.png'

class Logo extends React.Component{
    constructor(){
        super();
    }
        render(){

            return(
                <div>
                    <img className="logo-container" src={logoImg}/>
                </div>
            )
        }


}

export default Logo;