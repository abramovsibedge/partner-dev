import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash'

interface Props {
	notValid?: boolean
	checked: boolean
	onChange: (e: any) => void
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
			children,
			notValid
		} = this.props;

		const {
			id
		} = this.state;

		return (
			<div className={classNames('checkbox', (notValid && 'checkbox_error'))}>
				<input id={id} className="checkbox_input" type="checkbox" checked={(checked)} onChange={(e) => onChange(e)} />
				<label htmlFor={id} className="checkbox_label">{children}</label>
			</div>
		);
	}
}