import * as React from 'react';

import '../../static/scss/components/spinner.scss';

interface Props {
	width: string
	height: string
	strokeWidth: string
}

export default class Spinner extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			width,
			height,
			strokeWidth
		} = this.props;

		return (
			<svg
				className="spinner"
				width={width}
				height={height}
				viewBox="0 0 66 66"
				xmlns="http://www.w3.org/2000/svg">
				<circle className="path" fill="none" strokeWidth={strokeWidth} strokeLinecap="round" cx="33" cy="33" r="30"></circle>
			</svg>
		);
	}
}