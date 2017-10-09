import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';

interface Props {
	notValid?: boolean
	value: string
	label: string
	className?: string
	onChange: (e: any) => void
}

interface State {
	id: string
}

export default class Textarea extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			id: ''
		}
	}

	componentWillMount() {
		const id = _.uniqueId("prefix-");
		this.setState({id: id});
	}

	render() {
		const {
			value,
			label,
			className,
			children,
			onChange,
			notValid
		} = this.props;

		const {
			id
		} = this.state;

		return (
			<div className={classNames('textarea', className, (notValid && 'input_error'))}>
				{children}
				<textarea id={id} value={value} className={classNames('textarea_textarea', (value && 'is-filled'))} onChange={(e) => onChange(e)} />
				<label htmlFor={id} className="textarea_label">{label}</label>
			</div>
		);
	}
}