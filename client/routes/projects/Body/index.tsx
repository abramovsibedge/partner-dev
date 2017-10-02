import * as React from 'react';
import * as update from 'immutability-helper';
import * as classNames from 'classnames';

import ProjectItem from './ProjectItem';
import '../../../static/scss/routes/list-block.scss';

interface Props {
	onUpdate: () => void
	projects: any
}

interface State {
	deleteProjectModalState: boolean
	addUserModalState: boolean
	addUserObject: object
	deleteUserModalState: boolean
	loading: boolean
	selectedProjectId: string
	selectedProject: object
	selectedProjectTab: string
}

class Body extends React.Component<Props, State> {
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
			loading: true,
			selectedProjectId: '',
			selectedProject: {},
			selectedProjectTab: 'vpn-servers',
		}
	}

	render() {
		const {
			projects
		} = this.props;


		return (
			<section className="layout">
				<header className="layout_head">
					<div className="layout_head_content">
						<h1 className="layout_h1">Projects</h1>
					</div>
				</header>

				<div className="items-block-content">

					{projects.length === 0 && <div className="center-item-block">No result for your request.</div>}

					{projects.length > 0 && projects.map((project: any, index: number) => {
						return <ProjectItem key={index} project={project} onUpdate={this.props.onUpdate} />
					})}
				</div>

			</section>
		);
	}
}

export default Body;