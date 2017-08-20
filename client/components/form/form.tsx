import * as React from 'react';
import * as classNames from 'classnames';

import '../../static/scss/components/form.scss';

interface Props {
	submit: () => void,
	className?: string
}

export default class Form extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	formSubmitHandler(e: any) {
		e.preventDefault();
		this.props.submit();
	}

	render() {
		const {
			className,
			children
		} = this.props;

		return (
			<form className={classNames('form', className)} onSubmit={(e) => this.formSubmitHandler(e)} noValidate>
				{children}
			</form>
		);
	}
}