import * as React from 'react';
import {AuthMessage} from './messages';

import '../../static/scss/routes/auth.scss';

import {check} from '../../functions/auth';

export class Auth extends React.Component<{}, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="register">
				{check() ? <AuthMessage isSigned={check()} /> : this.props.children}
			</div>
		);
	}
}