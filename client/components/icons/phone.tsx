import * as React from 'react';

interface Props {
	width: string
	height: string
}

export class IconPhone extends React.Component<Props, {}> {
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
				<path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"></path>
				<path d="M0 0h24v24H0z" fill="none"></path>
			</svg>
		);
	}
};