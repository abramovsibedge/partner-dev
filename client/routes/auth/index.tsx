import * as React from 'react';
import * as classnames from 'classnames/bind';

const s = require('../../static/scss/routes/auth.scss');
const cx = classnames.bind(s);

export class Auth extends React.Component {
	constructor(props: any) {
		super(props);
	}

	static propTypes = {
		children: React.PropTypes.node,
	};

	render() {
		return (
			<div className={cx('register')}>
				{this.props.children}
			</div>
		);
	}
}