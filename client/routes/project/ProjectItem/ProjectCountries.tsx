import * as React from 'react';
import * as classNames from 'classnames';

import {Flags} from '../../../components/icons';
import {Checkbox} from '../../../components/form';

interface Props {
	countries: any
	onChange: (country: string, state: boolean) => void
}

interface State {
	stickedTableHead: boolean
}

class ProjectCountries extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			stickedTableHead: false
		}
	}

	componentDidMount() {
		window && window.addEventListener('scroll', this.stickTableHead);
	}

	componentWillUnmount() {
		window && window.removeEventListener('scroll', this.stickTableHead);
	}

	stickTableHead = () => {
		let {stickedTableHead} = this.state;

		window && window.scrollY > 240 ?
			!stickedTableHead && this.setState({stickedTableHead: true})
			:
			stickedTableHead && this.setState({stickedTableHead: false});
	};

	render() {
		const {
			countries,
			onChange
		} = this.props;
		const {stickedTableHead} = this.state;

		return (<div className="table main_table">
			<div className={classNames("table_head", stickedTableHead && "table_head_sticked")}>
				<table>
					<tbody>
					<tr>
						<td style={{width: '20%'}}>Country</td>
						<td style={{width: '70%'}}>Protocols</td>
						<td style={{width: '10%'}}>Visibility</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div className="table_body">
				{countries.map((item: any, index: any) => {
					return <div className={classNames('table_row')} key={index}>
						<div className="table_row_wrapper">
							<div className="table_cell" style={{width: '20%'}}>
								<div className="table_cell_content">
									<div className="project_country">
										<Flags type={item.country}/>
										{item.country}
									</div>
								</div>
							</div>
							<div className="table_cell" style={{width: '70%'}}>
								<div className="table_cell_content">
									<p>{item.protocols.join(', ')}</p>
								</div>
							</div>
							<div className="table_cell" style={{width: '10%'}}>
								<div className="table_cell_content">
									<div className="project_accesibility">
										<Checkbox
											className="project_edit_checkbox"
											checked={item.visibility}
											onChange={() => onChange(item.country, !item.visibility)}>&nbsp;</Checkbox>
									</div>
								</div>
							</div>
						</div>
					</div>;
				})}
			</div>
		</div>);
	}
}

export default ProjectCountries;