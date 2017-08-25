import * as React from 'react';
import {check} from '../../functions/auth';

import '../../static/scss/routes/auth.scss';

export class Auth extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentWillMount() {
		check() && window.location.replace("/");
	}

	render() {
		return (
			<div className="register">
				{this.props.children}
			</div>
		);
	}
}