import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../reducers/projects/actions';

import {
  Resume
} from '../../../components/icons'
import {
	Button
} from '../../../components/button'




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
										<p className="name-item-info">URL</p>
										<p>https://backend.northghost.com</p>
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
										className="green-button"
										children="Save edits"
								/>
							</div>
              :
							<div className="more-info">
								<Resume width="25px" height="25px" fill="#36c75a"/>
								<p>View project</p>
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
