import * as React from 'react';

import '../../static/scss/routes/auth.scss';

export class Auth extends React.Component<{}, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="register">{this.props.children}</div>
		);
	}
}