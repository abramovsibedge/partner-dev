import * as React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import {App} from './routes/app';
import {Main} from './routes/main/';
import {Auth} from './routes/auth/';
import {Reset} from './routes/auth/reset';
import {Signin} from './routes/auth/signin';
import {Signup} from './routes/auth/signup';
import {Projects} from './routes/projects/';
import {Subscribers} from './routes/subscribers/';
import {NotFound} from './routes/404/';

import {check} from '../client/functions/auth';
import {firebaseInit} from '../client/functions/firebaseInit';

export const routes = (
	<Route path='/' component={App} onEnter={firebaseInit}>
		<IndexRoute component={Main}/>

		<Route path='projects' component={Projects}>
			{/*{!check() && <Redirect from="projects" to="/" />}*/}
		</Route>
		<Route path='subscribers' component={Subscribers}>
			{/*{!check() && <Redirect from="subscribers" to="/" />}*/}
		</Route>

		<Route path='auth' component={Auth}>
			{/*{check() && <Redirect from="auth" to="projects" />}*/}

			<Route path='reset' component={Reset}/>
			<Route path='signin' component={Signin}/>
			<Route path='signup' component={Signup}/>
		</Route>
		<Route path='*' component={NotFound}/>
	</Route>
);

export default routes;
