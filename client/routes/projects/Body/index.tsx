import * as React from 'react';

import ProjectItem from './ProjectItem';


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
			selectedProjectTab: 'vpn-servers'
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
								<div className="table_cell" style={{width: '100%'}}>
									<div className="table_cell_content">No result for your request.</div>
								</div>
							</div>}

							{projects.length > 0 && projects.map((project: any, index: number) => {
								return <ProjectItem key={index} project={project} onUpdate={this.props.onUpdate} />
							})}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Body;