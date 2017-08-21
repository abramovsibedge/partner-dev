import { combineReducers } from 'redux';

import mainsReducer from './main'


const rootReducer = combineReducers({
    mains: mainsReducer
});

export default rootReducer;