import * as React from 'react';
import * as classnames from 'classnames/bind';

// const s = require('../static/scss/app.scss');
// const cx = classnames.bind(s);
// className={cx('content')}

export class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
	};

	render() {
		return (
			<div className="content">
				{this.props.children}
			</div>
		);
	}
}