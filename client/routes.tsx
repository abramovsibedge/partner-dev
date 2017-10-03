import * as React from 'react';
import {Route, IndexRoute} from 'react-router';

import {App} from './routes/app';
import {Main} from './routes/main/';
import {Auth} from './routes/auth/';
import Reset from './routes/auth/reset';
import Signin from './routes/auth/signin';
import Signup from './routes/auth/signup';
import Projects from './routes/projects/';
import CreateProjects from './routes/projects/CreateProject';
import Subscribers from './routes/subscribers/';
import {NotFound} from './routes/404/';
import {firebaseInit} from '../client/functions/firebaseInit';
import {List} from './routes/docs/List';
import {Article} from './routes/docs/Article';

export const routes = (
	<Route path='/' component={App} onEnter={firebaseInit} >
		<IndexRoute component={Main}/>

		<Route path='projects' component={Projects} />
		<Route path='createproject' component={CreateProjects} />
		<Route path='subscribers' component={Subscribers} />

		<Route path='docs' component={List} />
		<Route path='docs/*' component={Article} />

		<Route path='auth' component={Auth}>
			<Route path='reset' component={Reset}/>
			<Route path='signin' component={Signin}/>
			<Route path='signup' component={Signup}/>
		</Route>
		<Route path='*' component={NotFound}/>
	</Route>
);

export default routes;
