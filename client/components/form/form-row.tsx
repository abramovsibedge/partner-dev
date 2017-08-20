import * as React from 'react';

import '../../static/scss/components/form.scss';

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