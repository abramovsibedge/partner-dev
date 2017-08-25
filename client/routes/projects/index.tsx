import * as React from 'react';
import * as update from 'immutability-helper';
import Modal from 'react-modal';
import * as classNames from 'classnames';

import {
	IconHTMLTag,
	IconQuestion,
	IconPlus,
	IconClose,
	IconDelete
} from '../../components/icons'
import Spinner from '../../components/spinner';
import Switcher from '../../components/switcher';
import {
	Form,
	FormRow,
	Input,
	Checkbox,
	Select
} from '../../components/form';
import {Button} from '../../components/button';
import {emailValidation} from '../../utils';


import {
	loadProjects,
	loadProjectItem,
	addProject,
	deleteProject,
	addUser,
	deleteUser,
	setVisibility
} from '../../functions/projects';

import {
	logOut
} from '../../functions/auth';

import '../../static/scss/routes/dashboard.scss';
import '../../static/scss/routes/projects.scss';
import '../../static/scss/components/modal.scss';
import '../../static/scss/components/table.scss';

interface State {
	logoutModalState: boolean
	addProjectModalState: boolean,
	addProjectObject: object
	deleteProjectModalState: boolean
	addUserModalState: boolean
	addUserObject: object
	deleteUserModalState: boolean
	projects: any
	loading: boolean
	selectedProjectId: string
	selectedProject: object
	selectedProjectTab: string
	productTypes: any
}

export class Projects extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			logoutModalState: false,
			addProjectModalState: false,
			addProjectObject: {
				public_key: '',
				private_key: '',
				description: '',
				project_type: '',
				validationState: true,
				message: ''
			},
			deleteProjectModalState: false,
			addUserModalState: false,
			addUserObject: {
				email: '',
				validationState: true,
				message: ''
			},
			deleteUserModalState: false,
			projects: [],
			loading: true,
			selectedProjectId: '',
			selectedProject: {},
			productTypes: [{
				value: "proxy",
				label: "Proxy"
			}, {
				value: "public_vpn",
				label: "Public VPN"
			}, {
				value: "private_vpn",
				label: "Private VPN"
			}],
			selectedProjectTab: 'vpn-servers'
		}
	}

	componentDidMount() {
		loadProjects().then((result) => {
			this.setState(update(this.state, {
				projects: {$set: result.projects},
				loading: {$set: false},
			}));
		})
	}

	showLogout(value: boolean) {
		const $t = this;
		const $state = $t.state;

		$t.setState(update($state, {
			logoutModalState: {$set: value},
		}));
	}

	logoutConfirm() {
		logOut();
	}

	showAddProject(value: boolean) {
		const $t = this;
		const $state = $t.state;

		$t.setState(update($state, {
			addProjectModalState: {$set: value},
		}));
	}

	showDeleteProject(value: boolean) {
		const $t = this;
		const $state = $t.state;

		$t.setState(update($state, {
			deleteProjectModalState: {$set: value},
		}));
	}

	addProjectHandler(value: string, stateItem: string) {
		let newState = {};
		newState['addProjectObject'] = {[stateItem]: {$set: value}};
		this.setState(update(this.state, newState));
	}

	addProjectSubmit() {
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		if (!$state.addProjectObject['public_key'] || !$state.addProjectObject['project_type']) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		$t.setState(update($state, {
			addProjectObject: {
				validationState: {$set: false},
				message: {$set: message}
			}
		}));

		if (!state && message) return false;

		addProject($state.addProjectObject)
			.then((response) => {
				if (response.result !== "OK") {
					throw response.error;
				}

				$t.setState(update($state, {
					addProjectObject: {
						public_key: {$set: ''},
						private_key: {$set: ''},
						project_type: {$set: ''},
						description: {$set: ''},
						validationState: {$set: true},
						message: {$set: ''}
					},
					addProjectModalState: {$set: false},
					loading: {$set: true},
				}), () => {
					loadProjects().then((result) => {
						this.setState(update(this.state, {
							projects: {$set: result.projects},
							loading: {$set: false},
						}));
					})
				});
			})
			.catch((error) => {
				$t.setState(update($state, {
					addProjectObject: {
						message: {$set: error.toString()}
					}
				}));
			});
	}

	deleteProjectConfirm(project: any) {
		const $t = this;
		const $state = $t.state;

		deleteProject(project).then((result) => {
			console.log('result', result);
			$t.setState(update($state, {
				deleteProjectModalState: {$set: false},
				loading: {$set: true},
			}), () => {
				loadProjects().then((result) => {
					this.setState(update(this.state, {
						projects: {$set: result.projects},
						loading: {$set: false},
					}));
				})
			});
		});
	}

	openProject(id: string) {
		const $t = this;
		const $state = $t.state;

		this.setState(update($state, {
			selectedProjectId: {$set: id}
		}));

		loadProjectItem(id).then(result => {
			this.setState(update($state, {
				selectedProjectId: {$set: id},
				selectedProject: {$set: result}
			}));
		})
	}

	closeProject() {
		const $t = this;
		const $state = $t.state;

		this.setState(update($state, {
			selectedProject: {$set: {}},
			selectedProjectId: {$set: ''}
		}));
	}

	tabSwitcher(tab: string) {
		const $t = this;
		const $state = $t.state;

		this.setState(update($state, {
			selectedProjectTab: {$set: tab}
		}));
	}

	setVisibility(project: string, country: string, visibility: boolean) {
		const $t = this;
		const $state = $t.state;

		setVisibility(project, country, visibility).then(() => {
			loadProjectItem(project).then(result => {
				this.setState(update($state, {
					selectedProjectId: {$set: project},
					selectedProject: {$set: result}
				}));
			})
		});
	}

	showAddUser(value: boolean) {
		const $t = this;
		const $state = $t.state;

		$t.setState(update($state, {
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
		const $t = this;
		const $state = $t.state;

		$t.setState(update($state, {
			deleteUserModalState: {$set: value},
		}));
	}

	deleteUserConfirm(project: string, email: string) {
		const $t = this;
		const $state = $t.state;

		deleteUser(project, email).then(() => {
			loadProjectItem(project).then(result => {
				this.setState(update($state, {
					selectedProjectId: {$set: project},
					selectedProject: {$set: result},
					deleteUserModalState: {$set: false}
				}));
			})
		});
	}

	render() {
		const {
			addProjectModalState,
			addProjectObject,
			loading,
			selectedProjectId,
			selectedProject,
			projects,
			productTypes,
			deleteProjectModalState,
			selectedProjectTab,
			addUserObject,
			addUserModalState,
			deleteUserModalState,
			logoutModalState
		} = this.state;


		return (
			<div className="dashboard">
				<header className='header'>
					<div className="header_content">
						<div className="header_user">
							<div className="header_logo">
								<a href="/">
									<img className="header_logo_img" src={require('../../static/media/poweredbyhss_light.svg')}
											 alt="Partners Portal Logo" width="auto" height="24"/>
								</a>
							</div>
							<div className="header_logout">
								Hello test! <a href="#" className="header_logout_link" onClick={() => this.showLogout(true)}>Logout</a>
								<Modal
									isOpen={logoutModalState}
									className={{base: 'modal_inner'}}
									overlayClassName={{base: 'modal_outer'}}
									contentLabel="test">
									<div className="modal_header">
										<h2>Logout</h2>
									</div>
									<div className="modal_content is-text-center">Do you really want to logout?</div>
									<div className="modal_footer">
										<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showLogout(false)}>
											Cancel
										</button>
										<button className="modal_btn modal_btn-submit" type="button" onClick={() => this.logoutConfirm()}>
											Logout
										</button>
									</div>
									<Button type="button" className="modal_close" onClick={() => this.showLogout(false)}>
										<IconClose width="24" height="24"/>
									</Button>
								</Modal>
							</div>
							<div className="header_links">
								<div className="header_links_content">
                    <span className="header_links_link">
											<IconHTMLTag width="24" height="24"/>
											<span>Docs</span>
                    </span>
									<div className="header_links_drop">
										<ul className="header_links_list">
											<li className="header_links_list_item"><a className="header_links_list_link"
																																href="/docs/proxy_sdk_android.html" target="_blank">Proxy
												SDK for Android</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link"
																																href="/docs/proxy_sdk_ios.html" target="_blank">Proxy
												SDK for iOS</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link"
																																href="/docs/vpn_sdk_android_openvpn.html"
																																target="_blank">VPN SDK for Android (OpenVPN)</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link"
																																href="/docs/vpn_sdk_ios_ipsec.html" target="_blank">VPN
												SDK for iOS (IPsec)</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link"
																																href="http://backend.northghost.com/doc/partner/index.html"
																																target="_blank">Partner API</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link"
																																href="https://backend.northghost.com/doc/user/index.html"
																																target="_blank">User API</a></li>
										</ul>
									</div>
								</div>
								<div className="header_links_content">
									<a className="header_links_link" href="mailto:platformpartners@anchorfree.com">
										<IconQuestion width="17" height="17"/>
										<span>Help</span>
									</a>
								</div>
							</div>
						</div>
						<div className="header_toolbar">
							<div className="header_toolbar_content">
								<div className="project_filter">
									<Button type="submit" className="is-transparent" onClick={() => this.showAddProject(true)}>
										<IconPlus width="24" height="24"/>
										<span>Add project</span>
									</Button>
									<Modal
										isOpen={addProjectModalState}
										className={{base: 'modal_inner'}}
										overlayClassName={{base: 'modal_outer'}}
										contentLabel="test">
										<div className="modal_header">
											<h2>Create project</h2>
										</div>
										<Form submit={() => this.addProjectSubmit()} className="modal_form">
											<div className="modal_error">{addProjectObject['message']}</div>
											<div className="modal_content">
												<FormRow>
													<Input
														type="text"
														label="Public Key"
														value={addProjectObject['public_key']}
														notValid={!addProjectObject['validationState'] && !addProjectObject['public_key']}
														onChange={(e) => this.addProjectHandler(e.target.value, 'public_key')}>
													</Input>
												</FormRow>
												<FormRow>
													<Input
														type="text"
														label="Private Key"
														value={addProjectObject['private_key']}
														onChange={(e) => this.addProjectHandler(e.target.value, 'private_key')}>
													</Input>
												</FormRow>
												<FormRow>
													<Input
														type="text"
														label="Description"
														value={addProjectObject['description']}
														onChange={(e) => this.addProjectHandler(e.target.value, 'description')}>
													</Input>
												</FormRow>
												<FormRow>
													<Select
														notValid={!addProjectObject['validationState'] && !addProjectObject['project_type']}
														value={addProjectObject['project_type']}
														options={productTypes}
														onChange={(e) => this.addProjectHandler(e.target.value, 'project_type')}>
														Project type
													</Select>
												</FormRow>
											</div>
											<div className="modal_footer">
												<button className="modal_btn modal_btn-reset" type="button"
																onClick={() => this.showAddProject(false)}>Cancel
												</button>
												<button className="modal_btn modal_btn-submit" type="submit">Create project</button>
											</div>
										</Form>
										<Button type="button" className="modal_close" onClick={() => this.showAddProject(false)}>
											<IconClose width="24" height="24"/>
										</Button>
									</Modal>
								</div>
							</div>
						</div>
					</div>
				</header>
				{loading && <section className="layout is-loading">
					<Spinner width="65" height="65" strokeWidth="6"/>
				</section>}

				{!loading && <section className="layout">
					<header className="layout_head">
						<div className="layout_head_content">
							<h1 className="layout_h1">Projects</h1>
						</div>
					</header>
					<div className="layout_content">
						<div className="table main_table">
							<div className="table_head">
								<table>
									<tbody>
									<tr>
										<td style={{width: '30%'}}>Public Key</td>
										<td style={{width: '50%'}}>Description</td>
										<td style={{width: '20%'}}>&nbsp;</td>
									</tr>
									</tbody>
								</table>
							</div>
							<div className="table_body">
								{projects.length === 0 && <div className="table_row table_row_empty">
									<div className="table_cell">
										<div className="table_cell_content">No result for your request.</div>
									</div>
								</div>}
								{projects.length > 0 && projects.map((project: any, index: number) => {
									return <div key={index}
															className={classNames("table_row", selectedProjectId === project.publickey && "table_row_open")}>
										<div onClick={() => this.openProject(project.publickey)}>
											<div className="table_cell" style={{width: '30%'}}>
												<div className="table_cell_content">{project.publickey}</div>
											</div>
											<div className="table_cell" style={{width: '50%'}}>
												<div className="table_cell_content">{project.description}</div>
											</div>
											<div className="table_cell" style={{width: '20%'}}>&nbsp;</div>
										</div>
										<Button type="button" className="project_close" onClick={() => this.closeProject()}>
											<IconClose width="24" height="24"/>
										</Button>
										<div
											className={classNames("table_row_content", Object.keys(selectedProject).length === 0 && "is-loading")}>
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
													<div className="project_tabs">
														{/*<!-- <button className="project_tabs_item project_tabs_item-active" data-type="settings" type="button">Settings</button> -->*/}
														<button
															className={classNames("project_tabs_item", selectedProjectTab === "vpn-servers" && "project_tabs_item-active")}
															onClick={() => this.tabSwitcher("vpn-servers")} type="button">VPN Servers
														</button>
														<button
															className={classNames("project_tabs_item", selectedProjectTab === "access" && "project_tabs_item-active")}
															onClick={() => this.tabSwitcher("access")} type="button">Access
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
													{/*<!-- <div id="settings" className="project_tab project_tab-active">*/}
													{/*settings*/}
													{/*</div> -->*/}
													{selectedProjectTab === "vpn-servers" &&
													<div id="vpn-servers" className="project_tab project_tab-active">
														<div className="project_tab_content">
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
																	})}
																</div>
															</div>}
														</div>
													</div>}
													{selectedProjectTab === "access" && <div id="access" className="project_tab user">
														<div className="project_tab_content">
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
																		return <div key={index} className="table_row user_item">
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
																	})}
																</div>
															</div>}
														</div>
													</div>}
												</div>
											</div>}
										</div>
									</div>
								})}
							</div>
						</div>
					</div>
				</section>}

				<Switcher current="projects"/>
			</div>
		);
	}
}