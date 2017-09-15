import * as React from 'react';
import Modal from 'react-modal';

import {
	IconPlus,
	IconClose,
	IconDelete,
	IconPen
} from '../../../components/icons'

import {
	Form,
	FormRow,
	Input
} from '../../../components/form';
import {Button} from '../../../components/button';

import {
	addPaymentsSettings,
	updatePaymentsSettings,
	deletePaymentsSettings,
} from '../../../functions/projects';

interface Parent {
	payments: any,
	projectId: string,
	refreshPage: () => void
}

interface State {
	payments: any,
	isOpened: boolean,
	addObject: any,
	projectId: string
}

class Payments extends React.Component<Parent, State> {
	refreshPage: () => void;

	constructor(props: any) {
		super();

		this.state = {
			payments: props.payments,
			projectId: props.projectId,
			isOpened: false,
			addObject: {
				form: 'new',
				message: '',
				type: {
					value: '',
					valid: true
				},
				settings: {
					value: '',
					valid: true
				}
			}
		};

		this.refreshPage = props.refreshPage;
	}

	componentWillReceiveProps(props: any) {
		this.setState({
			payments: props.payments
		})
	}

	addHandler(value: string, key: string) {
		let newState = this.state.addObject;
		newState[key].value = value;
		this.setState({
			addObject: newState
		})
	}

	submitForm() {
		let newState = this.state.addObject;
		newState.type.value = newState.type.value.replace(/ /g, '');
		newState.settings.value = newState.settings.value.replace(/ /g, '');
		let valid = true;

		if(newState.type.value === '') {
			valid = false;
			newState.type.valid = false;
		} else {
			newState.type.valid = true;
		}

		let json;

		if(newState.settings.value !== '') {
			if(newState.settings.value.match(/^[0-9]+$/)) {
				valid = false;
				newState.settings.valid = false;
			}
			else {
				try {
					json = JSON.parse(newState.settings.value);
					newState.settings.valid = true;
				} catch (e) {
					valid = false;
					newState.settings.valid = false;
				}
			}
		}

		if(!valid) {
			return this.setState({
				addObject: newState
			});
		}

		this.setState({
			isOpened: false
		});
		this.refreshPage();
		if(newState.form === 'new') {
			addPaymentsSettings(this.state.projectId, newState.type.value, newState.settings.value).then(() => {
				this.refreshPage();
			});
		}
		else {
			updatePaymentsSettings(this.state.projectId, newState.type.value, newState.settings.value).then(() => {
				this.refreshPage();
			})
		}
	}

	openAdd(sourece: any) {
		let addObject = {
			form: 'new',
			message: '',
			type: {
				value: '',
				valid: true
			},
			settings: {
				value: '',
				valid: true
			}
		};

		if(sourece !== 'new') {
			addObject = {
				form: 'update',
				message: '',
				type: {
					value: sourece.purchase_type,
					valid: true
				},
				settings: {
					value: (sourece.purchase_settings?JSON.stringify(sourece.purchase_settings):''),
					valid: true
				}
			};
		}

		this.setState({
			isOpened: true,
			addObject: addObject
		});
	}

	deleteAuthentification(type: string) {
		this.setState({
			isOpened: false
		});
		deletePaymentsSettings(this.state.projectId, type).then(() => {
			this.refreshPage();
		})
	}

	render() {
		let content;

		if(this.state.payments.length === 0) {
			content =
				<div className="project_tabs_empty">
					<p>Project has no authentifications.</p>
				</div>;
		}
		else {
			content = <div className="table inner_table">
				<div className="table_head">
					<table>
						<tbody>
						<tr>
							<td style={{width: '30%'}}>Type</td>
							<td style={{width: '60%'}}>Settings</td>
							<td style={{width: '5%'}} />
							<td style={{width: '5%'}} />
						</tr>
						</tbody>
					</table>
				</div>
				<div className="table_body">
					{this.state.payments.map((payment: any, index: number) => {
						return <div key={index} className="table_row">
							<div className="table_row_wrapper">
								<div className="table_cell" style={{width: '30%'}}>
									<div className="table_cell_content">{payment.purchase_type}</div>
								</div>
								<div className="table_cell" style={{width: '60%'}}>
									<div className="table_cell_content">{payment.purchase_settings?JSON.stringify(payment.purchase_settings):''}</div>
								</div>
								<div className="table_cell" style={{width: '5%'}}>
									<div className="table_cell_content">
										<Button type="button" className="user_new_btn is-transparent"
														onClick={() => this.openAdd(payment)}>
											<IconPen width="24" height="24"/>
										</Button>
									</div>
								</div>
								<div className="table_cell" style={{width: '5%'}}>
									<div className="table_cell_content">
										<Button type="button" className="user_new_btn is-transparent"
														onClick={() => this.deleteAuthentification(payment.purchase_type)}>
											<IconDelete width="24" height="24"/>
										</Button>
									</div>
								</div>
							</div>
						</div>
					})}
				</div>
			</div>
		}

		return (
			<div>
				{this.renderAdd()}
				{content}
			</div>
		);
	}

	renderAdd() {
		let text = (this.state.addObject.form==='new') ? 'Add' : 'Update';

		return (
			<div className="user_new">
				<Button type="button" className="user_new_btn is-transparent"
								onClick={() => this.openAdd('new')}>
					<IconPlus width="24" height="24"/>
					<span>Add payment setting</span>
				</Button>

				<Modal
					isOpen={this.state.isOpened}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>{text} peyment setting</h2>
					</div>
					<Form submit={() => this.submitForm()} className="modal_form">
						<div className="modal_error">{this.state.addObject['message']}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Method"
									value={this.state.addObject['type'].value}
									notValid={!this.state.addObject['type'].valid}
									onChange={(e) => this.addHandler(e.target.value, 'type')}>
								</Input>
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="Settings"
									value={this.state.addObject['settings'].value}
									notValid={!this.state.addObject['settings'].valid}
									onChange={(e) => this.addHandler(e.target.value, 'settings')}>
								</Input>
							</FormRow>
						</div>
						<div className="modal_footer">
							<button className="modal_btn modal_btn-reset" type="button"
											onClick={() => this.setState({isOpened: false})}>Cancel
							</button>
							<button className="modal_btn modal_btn-submit" type="submit">{text}</button>
						</div>
					</Form>
					<Button type="button" className="modal_close" onClick={() => this.setState({isOpened: false})}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>
			</div>
		);
	}
}

export default Payments;