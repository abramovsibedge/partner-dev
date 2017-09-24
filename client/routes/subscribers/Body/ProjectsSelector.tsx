import * as React from 'react';
import * as update from 'immutability-helper';
import { connect } from 'react-redux';

import * as model from '../../../reducers/subscribers/model';
import * as actions from '../../../reducers/subscribers/actions';

import {
	Select
} from '../../../components/form';

interface Props {
	projects: any,
	subscribers: model.subscribersModel,
	setActiveProject: (data: any) => void
}

interface State {
	projectsList: any
	activeProject: number
	loaded: boolean
}

class ProjectsSelector extends React.Component<Props, State> {
	constructor(props: any) {
		super();

		this.state = {
			projectsList: null,
			activeProject: null,
			loaded: false
		};
	}

	componentWillReceiveProps(nextProps: any) {
		this.setState(update(this.state, {
			projectsList: {$set: this.getProjectsList(nextProps.projects['list'])},
			activeProject: {$set: nextProps.subscribers['activeProject']},
			loaded: {$set: true}
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

	render() {
		return (
			<header className="layout_head">
				<div className="layout_head_content">
					<h1 className="layout_h1">
						Subscribers
						{this.state.loaded &&
							<Select
								value={this.state.projectsList[this.state.activeProject].value}
								options={this.state.projectsList}
								onChange={(e) => this.props.setActiveProject(this.getRowId(this.props.projects['list'], e.target.value))} >
								Projects
							</Select>}
					</h1>
				</div>
			</header>
		);
	}
}

export default connect(
	state => ({
		projects: state.projects,
		subscribers: state.subscribers
	}),
	({
		setActiveProject: actions.setActiveProject
	})
)(ProjectsSelector);