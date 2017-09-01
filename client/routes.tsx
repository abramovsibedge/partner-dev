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
import {firebaseInit} from '../client/functions/firebaseInit';

import {DocsProxyAndroid} from './routes/docs/DocsProxyAndroid';
import {DocsVpnAndroid} from './routes/docs/DocsVpnAndroid';
import {DocsProxyIos} from './routes/docs/DocsProxyIos';
import {DocsVpnIos} from './routes/docs/DocsVpnIos';

export const routes = (
	<Route path='/' component={App} onEnter={firebaseInit} >
		<IndexRoute component={Main}/>

		<Route path='projects' component={Projects} />
		<Route path='subscribers' component={Subscribers} />

		<Route path='docs/proxy_sdk_android.html' component={DocsProxyAndroid} />
		<Route path='docs/vpn_sdk_android_openvpn.html' component={DocsVpnAndroid} />
		<Route path='docs/proxy_sdk_ios.html' component={DocsProxyIos} />
		<Route path='docs/vpn_sdk_ios_ipsec.html' component={DocsVpnIos} />

		<Route path='auth' component={Auth}>
			<Route path='reset' component={Reset}/>
			<Route path='signin' component={Signin}/>
			<Route path='signup' component={Signup}/>
		</Route>
		<Route path='*' component={NotFound}/>
	</Route>
);

export default routes;
