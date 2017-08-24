import * as React from 'react';
import * as update from 'immutability-helper';
import Modal from 'react-modal';
import * as classNames from 'classnames';

import {
	IconHTMLTag,
	IconQuestion,
	IconPlus,
	IconClose
} from '../../components/icons'
import Spinner from '../../components/spinner';
import fetchProjects from '../../functions/fetchProjects';
import fetchProjectItem from '../../functions/fetchProjectItem';
import {
	Form,
	FormRow,
	Input,
	Checkbox
} from '../../components/form';
import { Button } from '../../components/button';

import '../../static/scss/routes/dashboard.scss';
import '../../static/scss/routes/projects.scss';
import '../../static/scss/components/modal.scss';
import '../../static/scss/components/table.scss';

interface State {
	addProjectModalState: boolean,
	addProjectObject: object
	projects: any
	loading: boolean
	selectedProjectId: string
	selectedProject: object
}

export default class Projects extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			addProjectModalState: false,
			addProjectObject: {
				public_key: '',
				private_key: '',
				description: '',
				validationState: true,
				message: ''
			},
			projects: [],
			loading: true,
			selectedProjectId: '',
			selectedProject: {}
		}
	}

	componentDidMount() {
		fetchProjects().then((result) => {
			this.setState(update(this.state, {
				projects: { $set: result.projects },
				loading: { $set: false },
			}));
		})
	}

	showAddProject(value: boolean) {
		const $t = this;
		const $state = $t.state;

		$t.setState(update($state, {
			addProjectModalState: { $set: value },
		}));
	}

	addProjectHandler(value: string, stateItem: string) {
		let newState = {};
		newState['addProjectObject'] = { [stateItem]: {
			$set: value }
		};
		this.setState(update(this.state, newState));
	}

	addProjectSubmit() {
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		if (!$state.addProjectObject['public_key']) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		$t.setState(update($state, {
			addProjectObject: {
				validationState: { $set: false },
				message: { $set: message }
			}
		}));

		if (!state && message) return false;

		// TODO save handler
	}

	openProject(id: string) {
		const $t = this;
		const $state = $t.state;

		this.setState(update($state, {
			selectedProjectId: { $set: id }
		}));

		fetchProjectItem(id).then(result => {
			this.setState(update($state, {
				selectedProjectId: { $set: id },
				selectedProject: { $set: result }
			}));
		})
	}

	closeProject() {
		const $t = this;
		const $state = $t.state;

		this.setState(update($state, {
			selectedProject: { $set: {} },
			selectedProjectId: { $set: '' }
		}));
	}

	render() {
		const {
			addProjectModalState,
			addProjectObject,
			loading,
			selectedProjectId,
			selectedProject,
			projects
		} = this.state;

		console.log( selectedProjectId );
		console.log( selectedProject );

		return (
			<div className="dashboard">
				<header className='header'>
					<div className="header_content">
						<div className="header_user">
							<div className="header_logo">
								<a href="/">
									<img className="header_logo_img" src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="24" />
								</a>
							</div>
							<div className="header_logout">
								Hello test! <a href="#" className="header_logout_link js-logout">Logout</a>
							</div>
							<div className="header_links">
								<div className="header_links_content">
                    <span className="header_links_link">
											<IconHTMLTag width="24" height="24"/>
											<span>Docs</span>
                    </span>
									<div className="header_links_drop">
										<ul className="header_links_list">
											<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/proxy_sdk_android.html" target="_blank">Proxy SDK for Android</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/proxy_sdk_ios.html" target="_blank">Proxy SDK for iOS</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/vpn_sdk_android_openvpn.html" target="_blank">VPN SDK for Android (OpenVPN)</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/vpn_sdk_ios_ipsec.html" target="_blank">VPN SDK for iOS (IPsec)</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link" href="http://backend.northghost.com/doc/partner/index.html" target="_blank">Partner API</a></li>
											<li className="header_links_list_item"><a className="header_links_list_link" href="https://backend.northghost.com/doc/user/index.html" target="_blank">User API</a></li>
										</ul>
									</div>
								</div>
								<div className="header_links_content">
									<a className="header_links_link" href="mailto:platformpartners@anchorfree.com">
										<IconQuestion width="17" height="17" />
										<span>Help</span>
									</a>
								</div>
							</div>
						</div>
						<div className="header_toolbar">
							<div className="header_toolbar_content">
								<div className="project_filter">
									<Button type="submit" className="is-transparent" onClick={() => this.showAddProject(true)}>
										<IconPlus width="24" height="24" />
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
											</div>
											<div className="modal_footer">
												<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showAddProject(false)}>Cancel</button>
												<button className="modal_btn modal_btn-submit" type="submit">Create project</button>
											</div>
										</Form>
										<Button type="button" className="modal_close" onClick={() => this.showAddProject(false)}>
											<IconClose width="24" height="24" />
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
								{projects.length > 0 && projects.map((item: any, index: number) => {
									return <div key={index} className={classNames("table_row", selectedProjectId === item.publickey && "table_row_open")} onClick={() => this.openProject(item.publickey)}>
											<div className="table_cell" style={{width: '30%'}}>
												<div className="table_cell_content">{item.publickey}</div>
											</div>
											<div className="table_cell" style={{width: '50%'}}>
												<div className="table_cell_content">{item.description}</div>
											</div>
											<div className="table_cell" style={{width: '20%'}}>
												<Button type="button" className="project_close" onClick={() => this.closeProject()}>
													<IconClose width="24" height="24" />
												</Button>
											</div>
											<div className={classNames("table_row_content", Object.keys(selectedProject).length === 0 && "is-loading")}>
												{ selectedProjectId === item.publickey && Object.keys(selectedProject).length === 0
													&& <Spinner width="65" height="65" strokeWidth="6"/> }

												{ selectedProjectId === item.publickey && Object.keys(selectedProject).length > 0
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
																<td>{item.privatekey}</td>
																<td>https://backend.northghost.com</td>
															</tr>
															</tbody>
														</table>
													</div>
													<div className="project_buttons">
														<div className="project_tabs">
															{/*<!-- <button className="project_tabs_item project_tabs_item-active" data-type="settings" type="button">Settings</button> -->*/}
															<button className="project_tabs_item project_tabs_item-active" data-type="vpn-servers" type="button">VPN Servers</button>
															<button className="project_tabs_item" data-type="access" type="button">Access</button>
														</div>
														<div className="project_manage">
															<button className="project_manage_item project_manage_item-disable js-project-disable" type="button">
																<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/></svg>
																<span>Delete project</span>
															</button>
														</div>
													</div>
													<div className="project_content">
														{/*<!-- <div id="settings" className="project_tab project_tab-active">*/}
																{/*settings*/}
														{/*</div> -->*/}
														<div id="vpn-servers" className="project_tab project_tab-active">
															<div className="project_tab_content">
																{selectedProject['countries'].countries.length === 0 && <div className="project_tabs_empty">
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
																		{selectedProject['countries'].countries.map((item: any, index: number) => {
																			return <div key={index} className="table_row">
																				<div className="table_cell" style={{width: '25%'}}>
																					<div className="table_cell_content">{item.country}</div>
																				</div>
																				<div className="table_cell" style={{width: '65%'}}>
																					<div className="table_cell_content">{item.protocols}</div>
																				</div>
																				<div className="table_cell" style={{width: '10%'}}>
																					<div className="table_cell_content country_visibility">
																						<Checkbox
																							className="project_edit_checkbox"
																							checked={item.visibility}
																							onChange={(e) => console.log(123)}>&nbsp;</Checkbox>
																					</div>
																				</div>
																			</div>
																		})}
																	</div>
																</div>}
															</div>
														</div>
														<div id="access" className="project_tab user">
															<div className="project_tab_content">
																<div className="user_new">
																	<button className="btn user_new_btn js-user-create" type="button">
																		<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
																		<span>Add access email</span>
																	</button>
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
																		{selectedProject['emails'].usersMail.map((item: any, index: number) => {
																			return <div key={index} className="table_row user_item">
																				<div className="table_cell" style={{width: '50%'}}>
																					<div className="table_cell_content">{item}</div>
																				</div>
																				<div className="table_cell" style={{width: '50%'}}>
																					<div className="table_cell_content user_delete">
																						<button className="user_delete_btn js-user-delete">
																							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.243 17.657L12 13.414l-4.243 4.243-1.414-1.414L10.586 12 6.343 7.757l1.414-1.414L12 10.586l4.243-4.243 1.414 1.414L13.414 12l4.243 4.243"></path></svg>
																						</button>
																					</div>
																				</div>
																			</div>
																		})}
																	</div>
																</div>}
															</div>
														</div>
													</div>
												</div>}
											</div>
										</div>
								})}
							</div>
						</div>
					</div>
				</section>}
			</div>
		);
	}
}