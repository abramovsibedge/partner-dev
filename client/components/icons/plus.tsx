import * as React from 'react';

interface Props {
	width: string
	height: string
  fill?: string
}

export class IconPlus extends React.Component<Props, {}> {
	render() {
		const {
			width,
			height,
      fill
		} = this.props;

		return (
			<svg
				fill={fill}
				height={width}
				width={height}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
		);
	}
};