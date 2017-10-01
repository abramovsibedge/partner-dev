import * as React from 'react';
import * as update from 'immutability-helper';
import { connect } from 'react-redux';

import * as actions from '../../../reducers/subscribers/actions';

import { Select } from '../../../components/form';

interface Props {
	activeProject: any;
	projects: any;
	loadingState: any
	setActiveProject: any
	getSubscribers: (data: any) => void
}

interface State {
	projectsList: any
}

class ProjectsSelector extends React.Component<Props, State> {
	constructor() {
		super();

		this.state = {
			projectsList: null
		};
	}

	componentWillMount() {
		if (!this.props.activeProject) {
			this.setActiveProject(0);
		}

		this.setState(update(this.state, {
			projectsList: {$set: this.getProjectsList(this.props.projects['list'])}
		}));
	}

	getProjectsList = (projects: any) => {
		let list: any = [];

		projects.map((item: any) => {
			list.push({
				value: item.publickey,
				label: item.description
			});
		});

		return list;
	};

	getRowId = (projects: any, activeProject: string) => {
		let active: number = 0;

		for (let k in projects) {
			if(projects[k].publickey === activeProject) {
				active = Number(k);
				break;
			}
		}

		return active;
	};

	setActiveProject = (value: any) => {
		this.props.loadingState(true)
			.then(() => this.props.setActiveProject(value))
			.then(() => this.props.getSubscribers(this.props.projects['list'][this.props.activeProject]));

	};

	render() {
		const { projectsList } = this.state;
		const { activeProject } = this.props;

		return (
			<div>
				{projectsList[activeProject] && <Select
					value={projectsList[activeProject].value}
					options={projectsList}
					onChange={(e) => this.setActiveProject(this.getRowId(this.props.projects['list'], e.target.value))} >
					Projects
				</Select>}
			</div>
		);
	}
}

export default connect(
	state => ({
		activeProject: state.subscribers.activeProject,
		projects: state.projects
	}),
	({
		loadingState: actions.loadingState,
		setActiveProject: actions.setActiveProject,
		getSubscribers:  actions.getSubscribers
	})
)(ProjectsSelector);


