import * as React from 'react';

interface Props {
	width: string
	height: string
  fill?: string
}

export class IconClose extends React.Component<Props, {}> {
	render() {
		const {
			width,
			height,
      fill
		} = this.props;

		return (
			<svg
				fill={(fill) ? fill : '#000000'}
				height={width}
				width={height}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M16.243 17.657L12 13.414l-4.243 4.243-1.414-1.414L10.586 12 6.343 7.757l1.414-1.414L12 10.586l4.243-4.243 1.414 1.414L13.414 12l4.243 4.243"/></svg>
		);
	}
};