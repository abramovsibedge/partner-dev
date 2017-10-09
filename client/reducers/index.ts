import { combineReducers } from 'redux';

import signin from './signin';
import signup from './signup';
import reset from './reset';
import subscribers from './subscribers';
import subscriber from './subscriber';
import projects from './projects';
import project from './project';

const rootReducer = combineReducers({
	signin: signin,
	signup: signup,
	reset: reset,
	project: project,
	projects: projects,
	subscribers: subscribers,
	subscriber: subscriber
});

export default rootReducer;