import * as React from 'react';

interface Props {
	width: string
	height: string
  fill?: string
}

export class Resume extends React.Component<Props, {}> {
	render() {
		const {
			width,
			height,
      fill
		} = this.props;

		return (
			<svg
				height={width}
				width={height}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path
							fill={(fill) ? fill : '#ffffff'}
							d="M10,0 C4.48,0 0,4.48 0,10 C0,15.52 4.48,20 10,20 C15.52,20 20,15.52 20,10 C20,4.48 15.52,0 10,0 Z M8,14.5 L8,5.5 L14,10 L8,14.5 Z"
							id="path-1"
				></path>
			</svg>
		);
	}
};