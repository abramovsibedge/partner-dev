import * as React from 'react';

interface State {
	projectsList: any,
	activeProject: string,
}

interface Parent {
	projectsList: any,
	activeProject: string
};

import ProjectsSelector from './ProjectsSelector';
import SubscribersList from './SubscribersList';

export default class Body extends React.Component<Parent, {}> {
	projectsList: any;
	activeProject: string;

	constructor(props: any) {
		super(props);

		this.projectsList  = props.projectsList;
		this.activeProject = props.activeProject;
	}

	render() {
		let content =(
			<section className="layout">
				<div className="table_cell" style={{width: '100%'}}>
					<div className="table_cell_content">No result for your request.</div>
				</div>
			</section>
		)
		if (this.projectsList.length >0) {
            content =(
				<section className="layout">
					<ProjectsSelector projectsList={this.projectsList} activeProject={this.activeProject} />
					<SubscribersList />
				</section>
            )
		}
		return content;
	}
}