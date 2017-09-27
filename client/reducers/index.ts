import { combineReducers } from 'redux';

import signin from './signin';
import signup from './signup';
import reset from './reset';
import subscribers from './subscribers';
import projects from './projects';

const rootReducer = combineReducers({
	signin: signin,
	signup: signup,
	reset: reset,
	projects: projects,
	subscribers: subscribers
});

export default rootReducer;