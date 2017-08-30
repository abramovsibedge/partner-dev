import * as React from 'react';
import {check} from '../../functions/auth';

import '../../static/scss/routes/auth.scss';

interface State {
	isSigned: boolean
}

export class Auth extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			isSigned: check()
		}
	}

	componentWillMount() {
		// this.state.isSigned && window.location.replace('/projects');
	}

	render() {
		return (
			<div className="register">{this.props.children}</div>
		);
	}
}