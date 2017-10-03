import * as React from 'react';

import {
	IconClose,
	IconPen,
  IconPlus
} from '../../../components/icons';


interface Props {
  project: any
}

interface State {
}

class Body extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
		}
	}

	render() {
		const {
			project
		} = this.props;
		console.log('project', project);

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
								<div>
									<IconPen width="24px" height="24px" fill="#f5f4f2" />
									<p>Edit project</p>
								</div>
								<div>
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
									<div className="active">
										VPN Servers
									</div>
									<div>
										Access
									</div>
								</div>
								<div className="right">
									<IconPlus width="24px" height="24px" fill="#36c75a" />
									<p>Add access email</p>
								</div>
							</div>

							<div className="info-settings-project">
								<header>
									<div>

									</div>
									<div>

									</div>
									<div>

									</div>
								</header>
								<div className="item">

								</div>
							</div>

						</div>

					</div>
			);
		}

		return (
			<section className="layout">
				<header className="layout_head">
					<div className="layout_head_content">
						{content}
					</div>
				</header>

			</section>
		);
	}
}

export default Body;