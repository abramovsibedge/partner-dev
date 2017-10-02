import * as React from 'react';
import * as update from 'immutability-helper';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as classNames from 'classnames';

import '../../../static/scss/components/modal.scss';
import '../../../static/scss/components/table.scss';

import Spinner from '../../../components/spinner';

import {emailValidation} from '../../../utils';


import * as actions from '../../../reducers/projects/actions';

interface Props {
	onUpdate: () => void
  deleteProject: (item: object) => void
  getProject: (id: string) => void
  changeVisibility: (project: string, country: string, visibility: boolean) => void
  addUserProject: (project: string, email: string) => void
  delettUserProject: (project: string, email: string) => void
	project: any
  selectedProject: {}
  update_project: boolean
}

interface State {
	deleteProjectModalState: boolean
	addUserModalState: boolean
	addUserObject: object
	deleteUserModalState: boolean
	selectedProjectId: string,
  selectedProjectForUpdate: string,
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
			selectedProjectId: '',
      selectedProjectForUpdate: '',
			selectedProject: {},
			selectedProjectTab: 'vpn-servers',
		}
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.update_project &&
				this.state.selectedProjectId &&
				this.state.selectedProjectId==this.state.selectedProjectForUpdate)
		{
			this.setState({
				selectedProjectForUpdate: '',
        addUserObject: {validationState: true, message: ''}
			});

      this.props.getProject(this.state.selectedProjectId);
		}
    if (nextProps.selectedProject
      && nextProps.selectedProject["countries"]
      && nextProps.selectedProject["emails"]
      && nextProps.selectedProject["id"] == this.props.project.publickey
    ) {
      this.setState({selectedProject: nextProps.selectedProject});
    }
  }

	showDeleteProject(value: boolean) {
		this.setState(update(this.state, {
			deleteProjectModalState: {$set: value},
		}));
	}

	deleteProjectConfirm(project: any) {
    this.setState({selectedProjectForUpdate: this.state.selectedProjectId});
		this.props.deleteProject(project);
	}

	openProject(id: string) {
    this.setState(update(this.state, {
			selectedProjectId: {$set: id}
		}));
    this.props.getProject(id);
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
		this.setState({selectedProjectForUpdate: this.state.selectedProjectId});
	  this.props.changeVisibility(project, country, visibility);
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

    this.setState({selectedProjectForUpdate: this.state.selectedProjectId});
		this.props.addUserProject(project, $state.addUserObject['email']);
	}

	showDeleteUser(value: boolean) {
		this.setState(update(this.state, {
			deleteUserModalState: {$set: value},
		}));
	}

	deleteUserConfirm(project: string, email: string) {
    this.setState({selectedProjectForUpdate: this.state.selectedProjectId});
		this.props.delettUserProject(project, email);
	}


	render() {
		const {
			selectedProjectId,
			deleteProjectModalState,
			selectedProjectTab,
			addUserObject,
			addUserModalState,
			deleteUserModalState,
      selectedProject
		} = this.state;
		const {
      project,
    } = this.props;

		console.log(project);

		return (
			<div className="item-block">
				<div className="content">
					<div className="link-edit">Edit</div>

					<div className="top-info">
						<div className="img">
							<img src={require('../../../static/media/def-icon.png')} alt="def" />
						</div>
						<p className="name">
              {project.publickey}
						</p>
						<div className="description">
              {project.description}
						</div>
					</div>
					<div className="block-item-info">
						<div className="item-info">
							<p className="name-item-info">Private key</p>
							<div className="description-item-info">
                {project.publickey}
							</div>
						</div>
						<div className="item-info">
							<p className="name-item-info">URL</p>
							<p>https://backend.northghost.com</p>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

export default connect<any, any, any>(
    state => ({
      selectedProject: state.projects.selectedProject,
      update_project: state.projects.update_project
    }),
    ({
      getProject: actions.getProject,
      changeVisibility: actions.changeVisibility,
      deleteProject: actions.deleteProject,
      addUserProject: actions.addUserProject,
      delettUserProject: actions.delettUserProject,
    })
)(ProjectItem);
