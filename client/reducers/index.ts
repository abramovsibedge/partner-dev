import { combineReducers } from 'redux';

import signin from './signin';
import signup from './signup';
import reset from './reset';


const rootReducer = combineReducers({
    signin: signin,
    signup: signup,
    reset: reset
});

export default rootReducer;