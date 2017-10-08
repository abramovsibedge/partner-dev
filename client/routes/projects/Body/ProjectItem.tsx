import * as React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import * as classNames from 'classnames';

import * as actions from '../../../reducers/projects/actions';

import {
  Textarea
} from '../../../components/form';

import {
  Resume
} from '../../../components/icons/resume'
import {
	Button
} from '../../../components/button'

interface Props {
	project: any
  editProject: (project: string, description: string)=>any
	getProjects: any
}

interface State {
	statusEdit: boolean
  descritionEdit: string
}

class ProjectItem extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
      statusEdit: false,
      descritionEdit: this.props.project.description
		}
	}

	changeStatusEdit() {
		this.setState({
      statusEdit: !this.state.statusEdit
		})
	}

  handlerDescritionEdit(value: string){
    this.setState({descritionEdit: value})
  }

  editProject() {
  	this.props.editProject(this.props.project.publickey, this.state.descritionEdit).then(() => {
			this.props.getProjects();
		});
	}

	render() {
		const{
      statusEdit,
      descritionEdit
		} = this.state;
		const { project } = this.props;

		return (
			<div className="projects_item item-block">
				{!statusEdit && !project.deleteTaskCode && <button type="button" className="projects_item_edit" onClick={() => this.changeStatusEdit()}>Edit</button>}
				<div className="projects_item_top">
					<div className="projects_item_logo">
						<img src={require('../../../static/media/def-icon.png')} width="60" height="60" alt="def" />
					</div>
					<p className="projects_item_title">{project.publickey}</p>
					{!statusEdit && <div className="projects_item_description">
						{project.description}
					</div>}
				</div>
				<div className={classNames('projects_item_info', statusEdit && 'projects_item_info-edit')}>
					{statusEdit
						? <Textarea
								label="Description"
								value={descritionEdit}
								className="projects_item_textarea"
								onChange={(e) => this.handlerDescritionEdit(e.target.value)}
						/>
						: <div className="projects_item_private">
								<p className="projects_item_private_label">Private Key</p>
								<p className="projects_item_private_text">{project.privatekey}</p>
						</div>}
				</div>

        {statusEdit
					? <div className="projects_item_more projects_item_more-edit">
						<Button
							type="button"
							className="projects_item_cancel"
							onClick={() => this.changeStatusEdit()}>Cancel</Button>
						<Button
							onClick={() => this.editProject()}
							type="button"
							className="projects_item_save">Save edits</Button>
					</div>
					: !project.deleteTaskCode && <div className="projects_item_more">
						<Link to={"project/" + project.publickey} className="button">
							<Resume width="20" height="20" />
							View project
						</Link>
					</div>
        }

				{project.deleteTaskCode && <div className="projects_item_more projects_item_more-deleted">Deleted</div>}
			</div>
		);
	}
}

export default connect<any, any, any>(
	state => ({
		reload_project: state.projects.reload_project,
	}),
	({
		editProject: actions.editProject,
		getProjects: actions.getProjects
	})
)(ProjectItem);
