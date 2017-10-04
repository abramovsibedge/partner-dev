import * as React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import {
  Resume
} from '../../../components/icons/resume'
import {
	Button
} from '../../../components/button'

import UsersAuthentication from './UsersAuthentication';
import Payments from './Payments';

interface Props {
	project: any
}

interface State {
	statusEdit: boolean
}

class ProjectItem extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
      statusEdit: false
		}
	}
	changeStatusEdit() {
		this.setState({
      statusEdit: !this.state.statusEdit
		})
	}
	componentWillReceiveProps(nextProps: any) {

	}

	render() {
		const{
      statusEdit
		} = this.state;
		const {
      project,
    } = this.props;

		return (
			<div className="item-block">
				<div className="content">
          {
            (statusEdit) ?
								<div></div>
								:
								<div className="link-edit" onClick={() => {this.changeStatusEdit()}}>Edit</div>
          }
					<div className="top-info">
						<div className="avatar">
							<div className="img">
								<img src={require('../../../static/media/def-icon.png')} alt="def" />
							</div>
							{
								(statusEdit) ?
										<div className="action-img">
											<p className="name-action-img">App icon</p>
											<p>Upload app icon</p>
										</div>
										:
										<div></div>
							}
						</div>
						<p className="name">
              {project.publickey}
						</p>
            {
              (statusEdit) ?
									<div></div>
                  :
									<div className="description">
                    {project.description}
									</div>
            }
					</div>
					<div className={(statusEdit) ? "block-item-info edit" : "block-item-info"}>
            {
              (statusEdit) ?
									<div className="description-change">
										<p className="name-description-change">Description</p>
										<textarea>
											{project.description}
										</textarea>
									</div>
                  :
									<div className="item-info">
										<div className="item-private">
											<p className="item-label">Private Key</p>
											<p className="item-text">{project.privatekey}</p>
										</div>
									</div>
            }
					</div>

				</div>
        {
          (statusEdit) ?
							<div className="more-info edit">
								<div className="close" onClick={() => {this.changeStatusEdit()}}>Cancel</div>
								<Button
										type="button"
										className="save-button"
										children="Save edits"
								/>
							</div>
              :
							<div className="more-info">
								<Link to={"project/"+project.publickey}>
									<Resume width="25px" height="25px"/>
									<p>View project</p>
								</Link>
							</div>
        }
			</div>
		);
	}
}

export default connect<any, any, any>(
    state => ({
    }),
    ({
    })
)(ProjectItem);
