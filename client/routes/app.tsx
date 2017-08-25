import * as React from 'react';

export class App extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="content">
				{this.props.children}
			</div>
		);
	}
}