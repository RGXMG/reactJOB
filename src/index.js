'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Redirect,Switch } from 'react-router-dom';

import reducers from './reducers';
import './config';
import registerServiceWorker from './registerServiceWorker';

import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authRoute/authRoute';
import BossInfo from './container/bossinfo/bossinfo';
// import GeniusInfo from './container/geniusinfo/geniusinfo'
const store = createStore(reducers,compose(applyMiddleware(thunk)
    ,window.devToolsExtension?window.devToolsExtension():f=>f))

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div style={{height:'100%'}}>
                {/* 判断用户 */}
                <AuthRoute/>
                <Route path="/login" component={Login}></Route>
                <Route path="/register"component={Register}></Route>
                <Route path="/bossinfo" component={BossInfo}></Route>
                {/*<Route path="/bossinfo" component={GeniusInfo}></Route>*/}
            </div>
        </BrowserRouter>
    </Provider>)
    , document.getElementById('root'));
registerServiceWorker();
