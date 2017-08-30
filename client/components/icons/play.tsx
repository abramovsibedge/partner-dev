import * as React from 'react';

interface Props {
	width: string
	height: string
}

export class IconPlay extends React.Component<Props, {}> {
	render() {
		const {
			width,
			height
		} = this.props;

		return (
			<svg
				height={width}
				width={height}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M0 0h24v24H0z" fill="none"></path>
				<path d="M7 10l5 5 5-5z"></path>
			</svg>
		);
	}
};