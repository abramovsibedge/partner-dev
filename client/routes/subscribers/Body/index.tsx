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
		return (
			<section className="layout">
				<ProjectsSelector projectsList={this.projectsList} activeProject={this.activeProject} />
				<SubscribersList />
			</section>
		);
	}
}