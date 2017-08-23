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
import fetchProjects from '../../functions/fetchProjects'
import {
	Form,
	FormRow,
	Input } from '../../components/form';
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
			loading: true
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

	render() {
		const {
			addProjectModalState,
			addProjectObject,
			loading,
			projects
		} = this.state;

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
										<button className="modal_close" type="button" onClick={() => this.showAddProject(false)}>
											<IconClose width="24" height="24" />
										</button>
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
									return <div key={index} className="table_row js-project-item">
											<div className="table_cell" style={{width: '30%'}}>
												<div className="table_cell_content">{item.publickey}</div>
											</div>
											<div className="table_cell" style={{width: '50%'}}>
												<div className="table_cell_content">{item.description}</div>
											</div>
											<div className="table_cell" style={{width: '20%'}}>
												<button className="project_close js-project-close">
													<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.243 17.657L12 13.414l-4.243 4.243-1.414-1.414L10.586 12 6.343 7.757l1.414-1.414L12 10.586l4.243-4.243 1.414 1.414L13.414 12l4.243 4.243"/></svg>
												</button>
											</div>
											<div className="table_row_content project_pane"></div>
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