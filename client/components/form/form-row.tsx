import * as React from 'react';

export default class FormRow extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { children } = this.props;

		return (
			<div className="form_row">
				{children}
			</div>
		);
	}
}