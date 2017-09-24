import * as React from 'react';
import {AuthMessage} from './messages';

import '../../static/scss/routes/auth.scss';

import {checkAuth} from '../../utils';

export class Auth extends React.Component<{}, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="register">
				{checkAuth() ? <AuthMessage isSigned={checkAuth()} /> : this.props.children}
			</div>
		);
	}
}