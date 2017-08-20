import * as React from 'react';
import * as classnames from 'classnames/bind';

const s = require('../../static/scss/components/form.scss');
const cx = classnames.bind(s);

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
			<form className={cx('form', className)} onSubmit={(e) => this.formSubmitHandler(e)} noValidate>
				{children}
			</form>
		);
	}
}