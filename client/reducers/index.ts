import { combineReducers } from 'redux';

import signin from './signin';
import signup from './signup';


const rootReducer = combineReducers({
    signin: signin,
    signup: signup
});

export default rootReducer;