import * as React from 'react';

interface Props {
	width: string
	height: string
}

export default class IconHTMLTag extends React.Component<Props, {}> {
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
				<path d="M8.998 21.6L16.53 2.4h1.99l-7.51 19.2H8.998zM0 13.3l8.8 5.09v-2.13l-6.31-3.557L8.8 9.338V7.212L0 12.108v1.194zm18.352-4.338l-.665 1.7 3.824 2.04-5.93 3.342-.38.974v1.37l8.8-5.088V12.11l-5.648-3.146z"/>
			</svg>
		);
	}
};




