import * as React from 'react';

import '../../static/scss/routes/auth.scss';

import {check} from '../../functions/auth';

export class Auth extends React.Component<{}, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="register">
				{check() ? 'qwr' : this.props.children}
			</div>
		);
	}
}