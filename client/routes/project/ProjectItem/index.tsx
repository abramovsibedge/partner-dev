import * as React from 'react';
import Modal from 'react-modal';
import * as update from 'immutability-helper';
import * as classNames from 'classnames';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import {Link} from 'react-router';

import {emailValidation} from '../../../utils';

import ProjectCountries from './ProjectCountries';
import ProjectUsers from './ProjectUsers';
import ProjectAuth from './ProjectAuth';
import ProjectPayments from './ProjectPayments';

import * as actions from '../../../reducers/project/actions';
import {changeVisibility} from '../../../reducers/projects/actions';
import {
	editProject,
	getProjects,
	deleteAuth,
	addAuth,
	deletePayment,
	addPayment
} from '../../../reducers/projects/actions';

import {
	IconClose,
	IconPen,
	IconPlus,
	IconPlay
} from '../../../components/icons';
import {
	Form,
	FormRow,
	Input,
	Textarea
} from '../../../components/form';
import {Button} from '../../../components/button';

interface Props {
	project: any
	data: any
	loadProjects?: () => any
	deleteProject?: (item: object) => any
	editProject?: (project: string, description: string) => any
	addUser?: (project: string, email: string) => void
	deleteUser?: (project: string, email: string) => void
	deleteAuth?: (project: string, auth: string) => void
	addAuth?: (project: string, auth: any) => void
	deletePayment?: (project: string, payment: string) => void
	addPayment?: (project: string, payment: any) => void
	changeVisibility?: (project: string, country: string, visibility: boolean) => void
	projectList?: any
}

interface State {
	blockShow: number
	modalDeleteProject: boolean
	addUserModalState: boolean
	projectEditModalState: boolean
	addUserObject: object
	mailForDelete: string
	descritionEdit: string
	projectSelectorVisibility: boolean
}

class ProjectItem extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			blockShow: 1,
			modalDeleteProject: false,
			addUserModalState: false,
			projectEditModalState: false,
			mailForDelete: '',
			descritionEdit: this.props.project.description,
			addUserObject: {
				email: '',
				validationState: true,
				message: ''
			},
			projectSelectorVisibility: false
		}
	}

	handleShowBlock(num: number) {
		this.setState({
			blockShow: num
		})
	}

	addUserHandler(value: string, stateItem: string) {
		let newState = {};
		newState['addUserObject'] = {[stateItem]: {$set: value}};
		this.setState(update(this.state, newState));
	}

	handlerDescritionEdit(value: string) {
		this.setState({descritionEdit: value})
	}

	toggleModal(type: string, data?: string) {
		let dataCheck = (data != '') ? data : '';

		switch (type) {
			case 'delete':
				this.setState({modalDeleteProject: !this.state.modalDeleteProject});
				break;
			case 'addUser':
				this.setState({addUserModalState: !this.state.addUserModalState});
				break;
			case 'editProject':
				this.setState({projectEditModalState: !this.state.projectEditModalState});
				break;
		}
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

		this.props.addUser(this.props.project.publickey, $state.addUserObject['email']);
		this.toggleModal('addUser');
	}

	deleteUser(email: string) {
		this.props.deleteUser(this.props.project.publickey, email);
	}

	addAuth(value: any) {
		this.props.addAuth(this.props.project.publickey, value);
	}

	deleteAuth(auth: string) {
		this.props.deleteAuth(this.props.project.publickey, auth);
	}

	addPayment(value: any) {
		this.props.addPayment(this.props.project.publickey, value);
	}

	deletePayment(payment: string) {
		this.props.deletePayment(this.props.project.publickey, payment);
	}

	setVisibility(project: string, country: string, visibility: boolean) {
		this.props.changeVisibility(project, country, visibility);
	}

	editProject() {
		this.props.editProject(this.props.project.publickey, this.state.descritionEdit).then(() => {
			this.toggleModal('editProject');
			this.props.loadProjects();
		});
	}

	deleteProject() {
		this.props.deleteProject(this.props.project).then(() => hashHistory.push('/projects'))
	}

	toggleProjectSelector() {
		this.setState({
			projectSelectorVisibility: !this.state.projectSelectorVisibility
		})
	}

	render() {
		const {
			blockShow,
			modalDeleteProject,
			addUserModalState,
			addUserObject,
			projectEditModalState,
			descritionEdit,
			projectSelectorVisibility
		} = this.state;

		const {
			project,
			data,
			projectList
		} = this.props;

		let content: any = (<h1 className="layout_h1">Project not found</h1>);

		if (project.publickey) {
			content = (<div className="project">
				<div className="project_head">
					<h1 className="layout_h1">
						<img src={require('../../../static/media/def-icon.png')} className="project_logo" width="26" height="26" alt="def"/>
						{project.publickey}
					</h1>
					<div className="project_selector">
						<div
							className={classNames('project_selector_current', projectSelectorVisibility && 'project_selector_current-open')}
							onClick={() => this.toggleProjectSelector()}>
							<IconPlay width="24" height="24" />
						</div>
						{projectSelectorVisibility && <WrappedSelectList
							list={projectList}
							onStateChange={() => this.toggleProjectSelector()}/>}
					</div>
					<div className="project_actions">
						<Button
							type="button"
							className="project_actions-edit"
							onClick={() => this.toggleModal('editProject')}>
							<IconPen width="24px" height="24px"/>
							Edit project
						</Button>
						<Button
							type="button"
							className="project_actions-delete"
							onClick={() => this.toggleModal('delete')}>
							<IconClose width="24px" height="24px"/>
							Delete project
						</Button>
					</div>
				</div>

				<div className="project_top">
					{project.description && <div>
						<p>{project.description}</p>
					</div>}
					<div>
						<p className="project_top_label">Private Key</p>
						<p>{project.privatekey}</p>
					</div>
					<div>
						<p className="project_top_label">URL</p>
						<p>https://backend.northghost.com</p>
					</div>
				</div>

				<div className="project_settings">
					<div className="project_tabs">
						<button
							className={classNames('project_tabs_item', blockShow == 1 && 'project_tabs_item-active')}
							onClick={() => {
								this.handleShowBlock(1)
							}}>
							VPN Servers
						</button>
						<button
							className={classNames('project_tabs_item', blockShow == 2 && 'project_tabs_item-active')}
							onClick={() => {
								this.handleShowBlock(2)
							}}>
							Access
						</button>
						<button
							className={classNames('project_tabs_item', blockShow == 3 && 'project_tabs_item-active')}
							onClick={() => {
								this.handleShowBlock(3)
							}}>
							Users authentication
						</button>
						<button
							className={classNames('project_tabs_item', blockShow == 4 && 'project_tabs_item-active')}
							onClick={() => {
								this.handleShowBlock(4)
							}}>
							Payments settings
						</button>
					</div>
					<Button
						type="button"
						className="project_add-email"
						onClick={() => this.toggleModal('addUser')}>
						<IconPlus width="24" height="24"/>
						Add access email
					</Button>
				</div>

				<div className="settings-project">
					{blockShow === 1 && data.countries && <ProjectCountries
						countries={data.countries.countries}
						onChange={(country: any, state: boolean) => this.setVisibility(project.publickey, country, state)} />}

					{blockShow === 2 && data.emails && <ProjectUsers
						users={data.emails.usersMail}
						onChange={(email: string) => this.deleteUser(email)} />}

					{/*{blockShow === 3 && data.auth && <ProjectAuth*/}
						{/*auth={data.auth.all_auth_settings}*/}
						{/*addAuth={(value: any) => this.addAuth(value)}*/}
						{/*deleteAuth={(auth: string) => this.deleteAuth(auth)} />}*/}

					{/*{blockShow === 4 && data.payments && <ProjectPayments*/}
						{/*payments={data.payments.all_purchase_settings}*/}
						{/*addPayment={(value: any) => this.addPayment(value)}*/}
						{/*deletePayment={(auth: string) => this.deletePayment(auth)} />}*/}
				</div>
			</div>);
		}

		return (
			<section className="layout">

				<Modal
					isOpen={modalDeleteProject}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Delete project</h2>
					</div>
					<div className="modal_content is-text-center">Do you really want to delete project?</div>
					<div className="modal_footer">
						<button
							className="modal_btn modal_btn-reset"
							type="button"
							onClick={()=>this.toggleModal('delete')}>
							Cancel
						</button>
						<button
							className="modal_btn modal_btn-submit action-button"
							type="button"
							onClick={() => this.deleteProject()}>
							Delete project
						</button>
					</div>
					<Button
						type="button"
						className="modal_close"
						onClick={()=>this.toggleModal('delete')}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>

				<Modal
					isOpen={projectEditModalState}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>{project.publickey}</h2>
					</div>
					<Form submit={() => this.editProject()} className="modal_form">
						<div className="modal_content">
							<FormRow>
								<img src={require('../../../static/media/def-icon.png')} width="60" height="60" alt="def" />
							</FormRow>
							<FormRow>
								<Textarea
									className="project_edit_textarea"
									label="Description"
									value={descritionEdit}
									onChange={(e)=>{this.handlerDescritionEdit(e.target.value)}} />
							</FormRow>
						</div>
						<div className="modal_footer">
							<button type="button" className="modal_btn modal_btn-reset" onClick={() => this.toggleModal('editProject')}>
								Cancel
							</button>
							<button type="submit" className="modal_btn modal_btn-submit" >
								Save changes
							</button>
						</div>
					</Form>
					<Button
						type="button"
						className="modal_close"
						onClick={() => this.toggleModal('editProject')}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>

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
								onChange={(e) => this.addUserHandler(e.target.value, 'email')} />
							</FormRow>
						</div>
						<div className="modal_footer">
							<button type="button" className="modal_btn modal_btn-reset" onClick={()=>this.toggleModal('addUser')}>
								Cancel
							</button>
							<button type="submit" className="modal_btn modal_btn-submit">
								Create user
							</button>
						</div>
					</Form>
					<Button type="button" className="modal_close" onClick={()=>this.toggleModal('addUser')}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>

				{content}
			</section>
		);
	}
}

class SelectList extends React.Component<{
	disableOnClickOutside: () => void
	enableOnClickOutside: () => void
	list: any
	onStateChange: () => void
}, {}> {
	handleClickOutside = () => this.props.onStateChange();

	render() {
		return (
			<div className="project_selector_drop">
				{this.props.list.map((item: any, index: number) => {
					return <Link
						className={classNames('project_selector_item')}
						key={index}
						to={'/project/' + item.publickey}>{item.publickey}</Link>
				})}
			</div>
		);
	}
}

const WrappedSelectList = onClickOutside<{
	list: any
	onStateChange: () => void
}>(SelectList);

export default connect<any, any, Props>(
	state => ({
		projectList: state.projects.list
	}),
	({
		loadProjects: getProjects,
		deleteProject: actions.deleteProject,
		editProject: editProject,
		addUser: actions.addUser,
		deleteUser: actions.deleteUser,
		deleteAuth: deleteAuth,
		addAuth: addAuth,
		deletePayment: deletePayment,
		addPayment: addPayment,
		changeVisibility: changeVisibility
	})
)(ProjectItem);