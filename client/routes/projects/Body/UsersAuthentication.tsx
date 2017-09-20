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
	addAuthentificationsSetting,
	updateAuthentificationsSetting,
	deleteAuthentificationsSetting,
} from '../../../functions/projects';

interface Parent {
	authentications: any,
	projectId: string,
	refreshPage: () => void
}

interface State {
	authentications: any,
	isOpened: boolean,
	addObject: any,
	projectId: string
}

class UsersAuthentication extends React.Component<Parent, State> {
	refreshPage: () => void;

	constructor(props: any) {
		super();

		this.state = {
			authentications: props.authentications,
			projectId: props.projectId,
			isOpened: false,
			addObject: {
				form: 'new',
				message: '',
				method: {
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
			authentications: props.authentications
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
		newState.method.value = newState.method.value.replace(/ /g, '');
		newState.settings.value = newState.settings.value.replace(/ /g, '');
		let valid = true;

		if(newState.method.value === '') {
			valid = false;
			newState.method.valid = false;
		} else {
			newState.method.valid = true;
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
			addAuthentificationsSetting(this.state.projectId, newState.method.value, newState.settings.value).then(() => {
				this.refreshPage();
			});
		}
		else {
			updateAuthentificationsSetting(this.state.projectId, newState.method.value, newState.settings.value).then(() => {
				this.refreshPage();
			})
		}
	}

	openAdd(sourece: any) {
		let addObject = {
			form: 'new',
			message: '',
			method: {
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
				method: {
					value: sourece.auth_method,
					valid: true
				},
				settings: {
					value: (sourece.auth_settings?JSON.stringify(sourece.auth_settings):''),
					valid: true
				}
			};
		}

		this.setState({
			isOpened: true,
			addObject: addObject
		});
	}

	deleteAuthentification(method: string) {
		this.setState({
			isOpened: false
		});
		deleteAuthentificationsSetting(this.state.projectId, method).then(() => {
			this.refreshPage();
		})
	}

	render() {
		let content;

		if(this.state.authentications.length === 0) {
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
							<td style={{width: '30%'}}>Method</td>
							<td style={{width: '60%'}}>Settings</td>
							<td style={{width: '5%'}} />
							<td style={{width: '5%'}} />
						</tr>
						</tbody>
					</table>
				</div>
				<div className="table_body">
					{this.state.authentications.map((authentification: any, index: number) => {
						return <div key={index} className="table_row">
							<div className="table_row_wrapper">
								<div className="table_cell" style={{width: '30%'}}>
									<div className="table_cell_content">{authentification.auth_method}</div>
								</div>
								<div className="table_cell" style={{width: '60%'}}>
									<div className="table_cell_content">{authentification.auth_settings?JSON.stringify(authentification.auth_settings):''}</div>
								</div>
								<div className="table_cell" style={{width: '5%'}}>
									<div className="table_cell_content">
										<Button type="button" className="user_new_btn is-transparent"
														onClick={() => this.openAdd(authentification)}>
											<IconPen width="24" height="24"/>
										</Button>
									</div>
								</div>
								<div className="table_cell" style={{width: '5%'}}>
									<div className="table_cell_content">
										<Button type="button" className="user_new_btn is-transparent"
														onClick={() => this.deleteAuthentification(authentification.auth_method)}>
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
					<span>Add authentication</span>
				</Button>

				<Modal
					isOpen={this.state.isOpened}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>{text} users authentication</h2>
					</div>
					<Form submit={() => this.submitForm()} className="modal_form">
						<div className="modal_error">{this.state.addObject['message']}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Method"
									value={this.state.addObject['method'].value}
									notValid={!this.state.addObject['method'].valid}
									onChange={(e) => this.addHandler(e.target.value, 'method')}>
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

export default UsersAuthentication;