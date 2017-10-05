import * as React from 'react';
import Modal from 'react-modal';
import * as update from 'immutability-helper';
import {emailValidation} from '../../../utils';

import {
	IconClose,
	IconPen,
  IconPlus,
  Flags
} from '../../../components/icons';
import {
  Checkbox,
  Form,
  FormRow,
  Input,
  Textarea
} from '../../../components/form';
import {Button} from '../../../components/button';


interface Props {
  project: any
  selectedProject: any
  deleteProject: () => void
  addUserProject: (project: string, email: string)=>void
  delettUserProject: (project: string, email: string)=>void
  changeVisibility: (project: string, country: string, visibility: boolean)=>void
  editProject: (project: string, description: string)=>void
}

interface State {
	blockShow: number
	modalDeleteProject: boolean
  addUserModalState: boolean
  deleteUserModalState: boolean
  projectEditModalState: boolean
  addUserObject: object
	mailForDelete: string
	descritionEdit: string
}

class Body extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
      blockShow: 1,
      modalDeleteProject: false,
      addUserModalState: false,
      deleteUserModalState: false,
      projectEditModalState: false,
      mailForDelete: '',
      descritionEdit: this.props.project.description,
      addUserObject: {
        email: '',
        validationState: true,
        message: ''
      },
		}
	}

  handleShowBlock(num:number) {
		this.setState({
			blockShow: num
		})
  }
  addUserHandler(value: string, stateItem: string) {
    let newState = {};
    newState['addUserObject'] = {[stateItem]: {$set: value}};
    this.setState(update(this.state, newState));
  }
  handlerDescritionEdit(value: string){
		this.setState({descritionEdit: value})
	}
  toggleModal(type:string, data?:string) {
		let dataCheck = (data!='') ? data: '';

		switch (type) {
			case 'delete':
				this.setState({modalDeleteProject: !this.state.modalDeleteProject})
				break;
      case 'addUser':
        this.setState({addUserModalState: !this.state.addUserModalState})
        break;
      case 'editProject':
        this.setState({projectEditModalState: !this.state.projectEditModalState})
        break;
      case 'deleteUser':
        this.setState({
					deleteUserModalState: !this.state.deleteUserModalState,
          mailForDelete: dataCheck
        });
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

    this.props.addUserProject(this.props.project.publickey, $state.addUserObject['email']);
    this.toggleModal('addUser');
	}
	deleteUser() {
		this.props.delettUserProject(this.props.project.publickey, this.state.mailForDelete);
    this.toggleModal('deleteUser');
	}
  setVisibility(project: string, country: string, visibility: boolean) {
		this.props.changeVisibility(project, country, visibility);
  }

  editproject() {
  	this.props.editProject(this.props.project.publickey, this.state.descritionEdit);
    this.toggleModal('editProject');
	}
	render() {
		const {
      blockShow,
      modalDeleteProject,
      addUserModalState,
      deleteUserModalState,
      addUserObject,
      projectEditModalState,
      descritionEdit
		} = this.state;
		const {
			project,
      selectedProject
		} = this.props;

		let listCountries = (<div></div>);
    let listAccess = (<div></div>);

    if (selectedProject.countries) {
    	listCountries = selectedProject.countries.countries.map((e:any, t:any)=>{
        return (
						<div className="item cell-blocks" key={t}>
							<div>
								<div className="item-country">
									<Flags type={e.country} />
									<p>{e.country}</p>
								</div>
							</div>
							<div>
								<p>{e.protocols.join(', ')}</p>
							</div>
							<div>
								<Checkbox
										className="project_edit_checkbox"
										checked={e.visibility}
										onChange={() => this.setVisibility(project.publickey, e.country, !e.visibility)}>&nbsp;</Checkbox>
							</div>
						</div>
				);
			});
      listAccess = selectedProject.emails.usersMail.map((e:any, t:any)=>{
      	return (
						<div className="item cell-blocks" key={t}>
							<div>
								<p>{e}</p>
							</div>
							<div>

							</div>
							<div>
								<p className="user-delete" onClick={()=>this.toggleModal('deleteUser', e)}>
									<IconClose width="24px" height="24px" fill="#ef6359" />
								</p>
							</div>
						</div>
				);
			});
    }

		let content = (<h1 className="layout_h1">Project not found</h1>);
		if (project.publickey) {
      content=(
      		<div className="project-info">

						<div className="top">
							<div className="left">
								<div className="img">
									<img src={require('../../../static/media/def-icon.png')} alt="def" />
								</div>
								<h1 className="layout_h1">{project.publickey}</h1>
							</div>
							<div className="right">
								<div onClick={()=>this.toggleModal('editProject')}>
									<IconPen width="24px" height="24px" fill="#f5f4f2" />
									<p>Edit project</p>
								</div>
								<div onClick={()=>this.toggleModal('delete')}>
									<IconClose width="24px" height="24px" fill="#ef6359" />
									<p>Delete project</p>
								</div>
							</div>
						</div>

						<div className="details">
							<div className="description">
                <p>{project.description}</p>
							</div>
							<div className="private-key">
								<p className="name">Private Key</p>
                <p>{project.privatekey}</p>
							</div>
							<div className="url">
								<p className="name">URL</p>
								<p>https://backend.northghost.com</p>
							</div>
						</div>

						<div className="settings-project">
							<div className="top-settings-project">
								<div className="left">
									<div className={(blockShow == 1) ? "active" : ""} onClick={()=>{this.handleShowBlock(1)}}>
										VPN Servers
									</div>
									<div className={(blockShow == 2) ? "active" : ""} onClick={()=>{this.handleShowBlock(2)}}>
										Access
									</div>
								</div>
								<div className="right" onClick={()=>this.toggleModal('addUser')}>
									<IconPlus width="24px" height="24px" fill="#3f9beb" />
									<p>Add access email</p>
								</div>
							</div>

							<div className={(blockShow == 1) ? "info-settings-project" : "info-settings-project hidden"}>
								<header className="cell-blocks">
									<div>
										Country
									</div>
									<div>
										Protocols
									</div>
									<div>
										Visibility
									</div>
								</header>
								{listCountries}
							</div>

							<div className={(blockShow == 2) ? "info-settings-project" : "info-settings-project hidden"}>
								<header className="cell-blocks">
									<div>
										User
									</div>
									<div></div>
									<div></div>
								</header>
								{listAccess}
							</div>
						</div>

					</div>
			);
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
						<button className="modal_btn modal_btn-reset" type="button"
										onClick={()=>this.toggleModal('delete')}>Cancel
						</button>
						<button className="modal_btn modal_btn-submit action-button" type="button"
										onClick={() => {this.props.deleteProject()}}>Delete project
						</button>
					</div>
					<Button type="button" className="modal_close"
									onClick={()=>this.toggleModal('delete')}>
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
										onChange={(e) => this.addUserHandler(e.target.value, 'email')}>
								</Input>
							</FormRow>
						</div>
						<div className="modal_footer">
							<button className="modal_btn modal_btn-reset" type="button"
											onClick={()=>this.toggleModal('addUser')}>Cancel
							</button>
							<button className="modal_btn modal_btn-submit  action-button" type="submit">Create user</button>
						</div>
					</Form>
					<Button type="button" className="modal_close" onClick={()=>this.toggleModal('addUser')}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>

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
										onClick={()=>this.toggleModal('deleteUser')}>Cancel
						</button>
						<button className="modal_btn modal_btn-submit action-button" type="button"
										onClick={() => {this.deleteUser()}}>
							Delete user
						</button>
					</div>
					<Button type="button" className="modal_close"
									onClick={()=>this.toggleModal('deleteUser')}>
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

					<div className="modal_content_edit_project">
						<div className="img-change-project">
							<img src={require('../../../static/media/def-icon.png')} alt="def" />
							<div>
								<p>App icon</p>
								<p className="upload-icon-project">Upload app icon</p>
							</div>
						</div>
						<div className="description-change-project">
							<Textarea
									label="Description"
									value={descritionEdit}
									onChange={(e)=>{this.handlerDescritionEdit(e.target.value)}}
							/>
						</div>
					</div>

					<div className="modal_footer">
						<button className="modal_btn modal_btn-reset" type="button"
										onClick={()=>this.toggleModal('editProject')}>Cancel
						</button>
						<button className="modal_btn modal_btn-submit action-button" type="button"
										onClick={() => {this.editproject()}}>
							Save changes
						</button>
					</div>
					<Button type="button" className="modal_close"
									onClick={()=>this.toggleModal('editProject')}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>

						{content}
			</section>
		);
	}
}

export default Body;