/**
 * Created by GRIMES on 2018/1/2 0002.
 *
 * 将所有的reducer合并
 */
import { combineReducers } from 'redux';

import user from './redux/user.redux'


export default combineReducers({user})