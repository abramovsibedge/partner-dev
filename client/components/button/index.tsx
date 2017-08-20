import * as React from 'react';
import * as classNames from 'classnames';

import Spinner from '../spinner';

import '../../static/scss/components/button.scss';

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
			loading,
			children
		} = this.props;

		return (
			<button type={type} className={classNames("button", className)} disabled={loading}>
				{loading ? <Spinner width="30px" height="30px" strokeWidth="6"/> : children}
			</button>
		);
	}
}