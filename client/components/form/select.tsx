import * as React from 'react';
import * as classNames from 'classnames';

interface Option {
	value: string
	label: string
}

interface Props {
	notValid?: boolean
	value: string
	options: Option[]
	onChange: (e: any) => void
}

export default class Select extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			value,
			options,
			onChange,
			notValid,
			children,
		} = this.props;

		return (
			<select value={value} className={classNames('select','input', (notValid && 'input_error select_error'))} onChange={(e) => onChange(e)}>
				<option value='' disabled>{children}</option>
				{options.map((item: Option, index: number) => <option key={index} value={item.value}>{item.label}</option>)}
			</select>
		);
	}
}