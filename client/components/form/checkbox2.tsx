import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash'

interface Props {
	notValid?: boolean
	checked: boolean
	className?: string
	onChange: (e: any) => void
	label: string
}

interface State {
	id: string
}

export default class Checkbox extends React.Component<Props, State> {
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
			checked,
			onChange,
			label,
			className,
			notValid
		} = this.props;

		const {
			id
		} = this.state;

		return (
			<div className={classNames('checkbox', className, (notValid && 'checkbox_error'))}>
				<input id={id} className="checkbox_input" type="checkbox" checked={(checked)} onChange={(e) => onChange(e)} />
				<label htmlFor={id} className="checkbox_label">{label}</label>
			</div>
		);
	}
}