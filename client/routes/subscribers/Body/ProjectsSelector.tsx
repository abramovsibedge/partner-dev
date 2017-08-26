import * as React from 'react';

import Signal from '../../../functions/Signal';

import {
	Select
} from '../../../components/form';

interface Parent {
	projectsList: any,
	activeProject: string
};

interface State {
	activeProject: number
}

class ProjectsSelector extends React.Component<Parent, State> {
	projectsList: any;

	constructor(props: any) {
		super();

		this.projectsList  = this.getProjectsList(props.projectsList);

		this.state = {
			activeProject: this.getRowId(props.activeProject)
		};
	}

	getProjectsList(projectList: any) {
		let list = [];

		for(let k in projectList) {
			list.push(
				{
					value: projectList[k].publickey,
					label: projectList[k].description
				}
			);
		}

		return list;
	}

	changeProjectHandler(value: string) {
		this.setState({activeProject: this.getRowId(value)});
		Signal.dispatch('changeProject', value);
	}

	getRowId(activeProject: string) {
		let active:number = 0;
		for(let k in this.projectsList) {
			if(this.projectsList[k].value === activeProject) {
				active = Number(k);
				break;
			}
		};

		return active;
	}

	render() {
		return (
			<header className="layout_head">
				<div className="layout_head_content">
					<h1 className="layout_h1">
						Subscribers
						<Select
							value={this.projectsList[this.state.activeProject].value}
							options={this.projectsList}
							onChange={(e) => this.changeProjectHandler(e.target.value)}>
							Projects
						</Select>
					</h1>
				</div>
			</header>
		);
	}
}

export default ProjectsSelector;