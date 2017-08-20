import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash'

interface Props {
	notValid?: boolean
	type: string
	value: string
	label: string
	className?: string
	onChange: (e: any) => void
}

interface State {
	id: string
}

export default class Input extends React.Component<Props, State> {
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
			type,
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
			<div className={classNames('input', className, (notValid && 'input_error'))}>
				{children}
				<input type={type} value={value} id={id} className={classNames('input_input', (value && 'is-filled'))} onChange={(e) => onChange(e)} />
				<label htmlFor={id} className="input_label">{label}</label>
			</div>
		);
	}
}