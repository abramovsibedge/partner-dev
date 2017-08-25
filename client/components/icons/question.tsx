import * as React from 'react';

interface Props {
	width: string
	height: string
}

export class IconQuestion extends React.Component<Props, {}> {
	render() {
		const {
			width,
			height
		} = this.props;

		return (
			<svg
				height={width}
				width={height}
				viewBox="0 0 34 34"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M17.123 9.2c-1.44 0-2.642.503-3.604 1.32S11.993 12 11.83 14h2.937c.063-1 .302-1.23.715-1.61s.926-.62 1.54-.62c.616 0 1.117.175 1.505.572.39.396.583.882.583 1.48s-.187 1.094-.558 1.5l-1.772 1.768c-.518.518-.626.934-.78 1.25-.154.314-.003.793-.003 1.44V21h2v-.832c0-.646.29-1.148.58-1.504.113-.13.334-.287.522-.473.186-.186.448-.404.715-.655.267-.25.5-.457.662-.62.16-.16.403-.436.71-.824.534-.646.806-1.455.806-2.426 0-1.408-.45-2.503-1.356-3.29-.908-.782-2.077-1.174-3.517-1.174zM16.94 22.145c-.51 0-.946.18-1.31.534-.365.355-.547.78-.547 1.273 0 .493.186.914.558 1.262.373.348.814.52 1.323.52.51 0 .947-.177 1.31-.532.364-.356.547-.78.547-1.274s-.187-.915-.56-1.264c-.37-.348-.81-.52-1.32-.52z"/>
				<path d="M17 0C7.61 0 0 7.61 0 17s7.61 17 17 17 17-7.61 17-17S26.39 0 17 0zm0 31C9.268 31 3 24.732 3 17S9.268 3 17 3s14 6.268 14 14-6.268 14-14 14z"/>
			</svg>
		);
	}
};



