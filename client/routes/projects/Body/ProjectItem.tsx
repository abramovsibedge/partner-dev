import * as React from 'react';
import * as update from 'immutability-helper';
import Modal from 'react-modal';
import * as classNames from 'classnames';

import '../../../static/scss/components/modal.scss';
import '../../../static/scss/components/table.scss';

import {
	loadProjectItem,
	deleteProject,
	addUser,
	deleteUser,
	setVisibility
} from '../../../functions/projects';

import {
	IconPlus,
	IconClose,
	IconDelete
} from '../../../components/icons'
import Spinner from '../../../components/spinner';

import {
	Form,
	FormRow,
	Input,
	Checkbox
} from '../../../components/form';
import {Button} from '../../../components/button';
import {emailValidation} from '../../../utils';

import UsersAuthentication from './UsersAuthentication';
import Payments from './Payments';

interface Props {
	onUpdate: () => void
	project: any
}

interface State {
	deleteProjectModalState: boolean
	addUserModalState: boolean
	addUserObject: object
	deleteUserModalState: boolean
	loading: boolean
	selectedProjectId: string
	selectedProject: object
	selectedProjectTab: string
}

class ProjectItem extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			deleteProjectModalState: false,
			addUserModalState: false,
			addUserObject: {
				email: '',
				validationState: true,
				message: ''
			},
			deleteUserModalState: false,
			loading: true,
			selectedProjectId: '',
			selectedProject: {},
			selectedProjectTab: 'vpn-servers'
		}
	}

	showDeleteProject(value: boolean) {
		this.setState(update(this.state, {
			deleteProjectModalState: {$set: value},
		}));
	}

	deleteProjectConfirm(project: any) {
		deleteProject(project).then((result) => {
			this.setState(update(this.state, {
				deleteProjectModalState: {$set: false},
				loading: {$set: true},
			}), () => this.props.onUpdate());
		});
	}

	openProject(id: string) {
		this.setState(update(this.state, {
			selectedProjectId: {$set: id}
		}));

		loadProjectItem(id).then(result => {
			console.log(result)
			this.setState(update(this.state, {
				selectedProjectId: {$set: id},
				selectedProject: {$set: result}
			}));
		})
	}

	closeProject() {
		this.setState(update(this.state, {
			selectedProject: {$set: {}},
			selectedProjectId: {$set: ''}
		}));
	}

	tabSwitcher(tab: string) {
		this.setState(update(this.state, {
			selectedProjectTab: {$set: tab}
		}));
	}

	setVisibility(project: string, country: string, visibility: boolean) {
		setVisibility(project, country, visibility).then(() => {
			loadProjectItem(project).then(result => {
				this.setState(update(this.state, {
					selectedProjectId: {$set: project},
					selectedProject: {$set: result}
				}));
			})
		});
	}

	showAddUser(value: boolean) {
		this.setState(update(this.state, {
			addUserModalState: {$set: value},
		}));
	}

	addUserHandler(value: string, stateItem: string) {
		let newState = {};
		newState['addUserObject'] = {[stateItem]: {$set: value}};
		this.setState(update(this.state, newState));
	}

	addUserSubmit(project: string) {
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		if (!$state.addUserObject['email']) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		if (!emailValidation($state.addUserObject['email'])) {
			state = false;
			message += 'Email not valid.'
		}

		$t.setState(update($state, {
			addUserObject: {
				validationState: {$set: false},
				message: {$set: message}
			}
		}));

		if (!state && message) return false;

		addUser(project, $state.addUserObject['email']).then(() => {
			$t.setState(update($state, {
				addUserObject: {
					validationState: {$set: true},
					message: {$set: ''}
				}
			}), () => {
				loadProjectItem(project).then(result => {
					this.setState(update($state, {
						selectedProjectId: {$set: project},
						selectedProject: {$set: result},
						addUserModalState: {$set: false}
					}));
				})
			});
		});
	}

	showDeleteUser(value: boolean) {
		this.setState(update(this.state, {
			deleteUserModalState: {$set: value},
		}));
	}

	deleteUserConfirm(project: string, email: string) {
		deleteUser(project, email).then(() => {
			loadProjectItem(project).then(result => {
				this.setState(update(this.state, {
					selectedProjectId: {$set: project},
					selectedProject: {$set: result},
					deleteUserModalState: {$set: false}
				}));
			})
		});
	}

	refreshPage() {
		loadProjectItem(this.state.selectedProjectId).then((response) => {
			this.setState({
				selectedProject: response
			});
		});
	}


	render() {
		const {
			selectedProjectId,
			selectedProject,
			deleteProjectModalState,
			selectedProjectTab,
			addUserObject,
			addUserModalState,
			deleteUserModalState
		} = this.state;

		const {
			project
		} = this.props;

		return (
			<div className={classNames("table_row", selectedProjectId === project.publickey && "table_row_open")}>
				<div className="table_row_wrapper" onClick={() => !project.deleteTaskCode && this.openProject(project.publickey)}>
					<div className="table_cell" style={{width: '30%'}}>
						<div className="table_cell_content">{project.publickey}</div>
					</div>
					<div className="table_cell" style={{width: '50%'}}>
						<div className="table_cell_content">{project.description}</div>
					</div>
					<div className="table_cell" style={{width: '20%'}}>
						<div className="table_cell_content">{project.deleteTaskCode && <span className="table_label table_label-red">Deleted</span>}</div>
					</div>
				</div>
				<Button type="button" className="project_close" onClick={() => this.closeProject()}>
					<IconClose width="24" height="24"/>
				</Button>
				<div className={classNames("table_row_content", Object.keys(selectedProject).length === 0 && "is-loading")}>
					{selectedProjectId === project.publickey && Object.keys(selectedProject).length === 0
					&& <Spinner width="65" height="65" strokeWidth="6"/>}

					{selectedProjectId === project.publickey && Object.keys(selectedProject).length > 0
					&& <div className="project_pane_content">
						<div className="project_traffic">
							<table>
								<thead>
								<tr>
									<th>Private Key</th>
									<th>URL</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>{project.privatekey}</td>
									<td>https://backend.northghost.com</td>
								</tr>
								</tbody>
							</table>
						</div>
						<div className="project_buttons">
							<div>
								<button
									className={classNames("project_tabs_item", selectedProjectTab === "vpn-servers" && "project_tabs_item-active")}
									onClick={() => this.tabSwitcher("vpn-servers")} type="button">VPN Servers
								</button>
								<button
									className={classNames("project_tabs_item", selectedProjectTab === "access" && "project_tabs_item-active")}
									onClick={() => this.tabSwitcher("access")} type="button">Access
								</button>
								<button
									className={classNames("project_tabs_item", selectedProjectTab === "users-authentication" && "project_tabs_item-active")}
									onClick={() => this.tabSwitcher("users-authentication")} type="button">Users authentication
								</button>
								<button
									className={classNames("project_tabs_item", selectedProjectTab === "payments-settings" && "project_tabs_item-active")}
									onClick={() => this.tabSwitcher("payments-settings")} type="button">Payments settings
								</button>
							</div>
							<div className="project_manage">
								<Button type="button" className="project_manage_item project_manage_item-disable"
												onClick={() => this.showDeleteProject(true)}>
									<IconDelete width="24" height="24"/>
									<span>Delete project</span>
								</Button>
								<Modal
									isOpen={deleteProjectModalState}
									className={{base: 'modal_inner'}}
									overlayClassName={{base: 'modal_outer'}}
									contentLabel="test">
									<div className="modal_header">
										<h2>Delete project</h2>
									</div>
									<div className="modal_content is-text-center">Do you really want to delete project?</div>
									<div className="modal_footer">
										<button className="modal_btn modal_btn-reset" type="button"
														onClick={() => this.showDeleteProject(false)}>Cancel
										</button>
										<button className="modal_btn modal_btn-submit" type="button"
														onClick={() => this.deleteProjectConfirm(project)}>Delete project
										</button>
									</div>
									<Button type="button" className="modal_close"
													onClick={() => this.showDeleteProject(false)}>
										<IconClose width="24" height="24"/>
									</Button>
								</Modal>
							</div>
						</div>
						<div className="project_content">
							{selectedProjectTab === "users-authentication" &&
								<UsersAuthentication refreshPage={this.refreshPage.bind(this)} projectId={selectedProjectId} authentications={this.state.selectedProject['authentifications'].all_auth_settings} />}

							{selectedProjectTab === "payments-settings" &&
								<Payments refreshPage={this.refreshPage.bind(this)} projectId={selectedProjectId} payments={this.state.selectedProject['payments'].all_purchase_settings} />}

							{selectedProjectTab === "vpn-servers" && <div>
								{selectedProject['countries'].countries.length === 0 &&
								<div className="project_tabs_empty">
									<p>Project has no countries.</p>
								</div>}

								{selectedProject['countries'].countries.length > 0 && <div className="table inner_table">
									<div className="table_head">
										<table>
											<tbody>
											<tr>
												<td style={{width: '25%'}}>Country</td>
												<td style={{width: '65%'}}>Protocols</td>
												<td style={{width: '10%'}}>Visibility</td>
											</tr>
											</tbody>
										</table>
									</div>
									<div className="table_body">
										{selectedProject['countries'].countries.map((country: any, index: number) => {
											return <div key={index} className="table_row">
												<div className="table_row_wrapper">
													<div className="table_cell" style={{width: '25%'}}>
														<div className="table_cell_content">{country.country}</div>
													</div>
													<div className="table_cell" style={{width: '65%'}}>
														<div className="table_cell_content">{country.protocols}</div>
													</div>
													<div className="table_cell" style={{width: '10%'}}>
														<div className="table_cell_content country_visibility">
															<Checkbox
																className="project_edit_checkbox"
																checked={country.visibility}
																onChange={() => this.setVisibility(project.publickey, country.country, !country.visibility)}>&nbsp;</Checkbox>
														</div>
													</div>
												</div>
											</div>
										})}
									</div>
								</div>}
							</div>}

							{selectedProjectTab === "access" && <div>
								<div className="user_new">
									<Button type="button" className="user_new_btn is-transparent"
													onClick={() => this.showAddUser(true)}>
										<IconPlus width="24" height="24"/>
										<span>Add access email</span>
									</Button>
									<Modal
										isOpen={addUserModalState}
										className={{base: 'modal_inner'}}
										overlayClassName={{base: 'modal_outer'}}
										contentLabel="test">
										<div className="modal_header">
											<h2>Create user</h2>
										</div>
										<Form submit={() => this.addUserSubmit(project.publickey)} className="modal_form">
											<div className="modal_error">{addUserObject['message']}</div>
											<div className="modal_content">
												<FormRow>
													<Input
														type="email"
														label="User email"
														value={addUserObject['email']}
														notValid={!addUserObject['validationState'] && !addUserObject['email']}
														onChange={(e) => this.addUserHandler(e.target.value, 'email')}>
													</Input>
												</FormRow>
											</div>
											<div className="modal_footer">
												<button className="modal_btn modal_btn-reset" type="button"
																onClick={() => this.showAddUser(false)}>Cancel
												</button>
												<button className="modal_btn modal_btn-submit" type="submit">Create user</button>
											</div>
										</Form>
										<Button type="button" className="modal_close" onClick={() => this.showAddUser(false)}>
											<IconClose width="24" height="24"/>
										</Button>
									</Modal>
								</div>
								{selectedProject['emails'].usersMail.length === 0 && <div className="project_tabs_empty">
									<p>Project has no users.</p>
								</div>}

								{selectedProject['emails'].usersMail.length > 0 && <div className="table inner_table">
									<div className="table_head">
										<table>
											<tbody>
											<tr>
												<td style={{width: '50%'}}>User</td>
												<td style={{width: '50%'}}>&nbsp;</td>
											</tr>
											</tbody>
										</table>
									</div>
									<div className="table_body">
										{selectedProject['emails'].usersMail.map((email: any, index: number) => {
											return <div key={index} className="table_row">
												<div className="table_row_wrapper">
													<div className="table_cell" style={{width: '50%'}}>
														<div className="table_cell_content">{email}</div>
													</div>
													<div className="table_cell" style={{width: '50%'}}>
														<div className="table_cell_content user_delete">
															<Button type="button" className="user_delete_btn is-transparent"
																			onClick={() => this.showDeleteUser(true)}>
																<IconClose width="24" height="24"/>
															</Button>
															<Modal
																isOpen={deleteUserModalState}
																className={{base: 'modal_inner'}}
																overlayClassName={{base: 'modal_outer'}}
																contentLabel="test">
																<div className="modal_header">
																	<h2>Delete user</h2>
																</div>
																<div className="modal_content is-text-center">Do you really want to delete
																	user?
																</div>
																<div className="modal_footer">
																	<button className="modal_btn modal_btn-reset" type="button"
																					onClick={() => this.showDeleteUser(false)}>Cancel
																	</button>
																	<button className="modal_btn modal_btn-submit" type="button"
																					onClick={() => this.deleteUserConfirm(project.publickey, email)}>
																		Delete user
																	</button>
																</div>
																<Button type="button" className="modal_close"
																				onClick={() => this.showDeleteUser(false)}>
																	<IconClose width="24" height="24"/>
																</Button>
															</Modal>
														</div>
													</div>
												</div>
											</div>
										})}
									</div>
								</div>}
							</div>}
						</div>
					</div>}
				</div>
			</div>
		);
	}
}

export default ProjectItem;