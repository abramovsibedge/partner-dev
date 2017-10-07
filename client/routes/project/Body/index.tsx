import * as React from 'react';
import Modal from 'react-modal';
import * as update from 'immutability-helper';
import * as classNames from 'classnames';

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
	stickedTableHead: boolean
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
			stickedTableHead: false
		}
	}

	componentDidMount(){
		window && window.addEventListener('scroll',this.stickTableHead);
	}

	componentWillUnmount(){
		window && window.removeEventListener('scroll',this.stickTableHead);
	}

	stickTableHead = () => {
		let {stickedTableHead} = this.state;

		window && window.scrollY > 240 ?
			!stickedTableHead && this.setState(update(this.state, {
				stickedTableHead: {$set: true}
			}))
			:
			stickedTableHead && this.setState(update(this.state, {
				stickedTableHead: {$set: false}
			}));
	};

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
					<div className={classNames('table_row')} key={t}>
						<div className="table_row_wrapper">
							<div className="table_cell" style={{width: '20%'}}>
								<div className="table_cell_content">
									<div className="project_country">
										<Flags type={e.country} />
										{e.country}
									</div>
								</div>
							</div>
							<div className="table_cell" style={{width: '70%'}}>
								<div className="table_cell_content">
									<p>{e.protocols.join(', ')}</p>
								</div>
							</div>
							<div className="table_cell" style={{width: '10%'}}>
								<div className="table_cell_content">
									<div className="project_accesibility">
										<Checkbox
											className="project_edit_checkbox"
											checked={e.visibility}
											onChange={() => this.setVisibility(project.publickey, e.country, !e.visibility)}>&nbsp;</Checkbox>
									</div>
								</div>
							</div>
						</div>
					</div>);
			});

      listAccess = selectedProject.emails.usersMail.map((e:any, t:any)=>{
      	return (
					<div className={classNames('table_row')} key={t}>
						<div className="table_row_wrapper">
							<div className="table_cell" style={{width: '90%'}}>
								<div className="table_cell_content">{e}</div>
							</div>
							<div className="table_cell" style={{width: '10%'}}>
								<div className="table_cell_content">
									<button className="project_user-delete" onClick={()=>this.toggleModal('deleteUser', e)}>
										<IconClose width="24" height="24" />
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			});
    }

		const { stickedTableHead } = this.state;

		let content: any = (<h1 className="layout_h1">Project not found</h1>);
		if (project.publickey) {

      content = (
				<div className="project">
					<div className="project_head">
						<h1 className="layout_h1">
							<img src={require('../../../static/media/def-icon.png')} className="project_logo" width="26" height="26" alt="def" />
							{project.publickey}
						</h1>
						<div className="project_actions">
							<Button
								type="button"
								className="project_actions-edit"
								onClick={()=>this.toggleModal('editProject')}>
								<IconPen width="24px" height="24px" />
								Edit project
							</Button>
							<Button
								type="button"
								className="project_actions-delete"
								onClick={()=>this.toggleModal('delete')}>
								<IconClose width="24px" height="24px" />
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
								onClick={()=>{this.handleShowBlock(1)}}>
								VPN Servers
							</button>
							<button
								className={classNames('project_tabs_item', blockShow == 2 && 'project_tabs_item-active')}
								onClick={()=>{this.handleShowBlock(2)}}>
								Access
							</button>
						</div>
						<Button
							type="button"
							className="project_add-email"
							onClick={()=>this.toggleModal('addUser')}>
							<IconPlus width="24" height="24" />
							Add access email
						</Button>
					</div>

					<div className="settings-project">

						{blockShow === 1 && <div className="table main_table">
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
								{listCountries}
							</div>
						</div>}

						{blockShow == 2 && <div className="table main_table">
							<div className={classNames("table_head", stickedTableHead && "table_head_sticked")}>
								<table>
									<tbody>
										<tr>
											<td style={{width: '90%'}}>User</td>
											<td style={{width: '10%'}}>&nbsp;</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="table_body">
								{listAccess}
							</div>
						</div>}
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