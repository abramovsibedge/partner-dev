import * as React from 'react';
import * as classNames from 'classnames';

import '../../static/scss/components/button.scss';

interface Props {
	type: string
	className?: string
	onClick?: () => void
}

export class Button extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			type,
			className,
			onClick,
			children
		} = this.props;

		return (
			<button onClick={onClick} type={type} className={classNames("button", className)}>{children}</button>
		);
	}
}