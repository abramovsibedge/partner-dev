import * as React from 'react';
import * as classnames from 'classnames/bind';

const s = require('../../static/scss/components/button.scss');
const cx = classnames.bind(s);

interface Props {
	type: string
	loading?: boolean
	className?: string
}

export class Button extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			type,
			className,
			children
		} = this.props;

		return (
			<button type={type} className={cx('button', className)}>
				{children}
			</button>
		);
	}
}