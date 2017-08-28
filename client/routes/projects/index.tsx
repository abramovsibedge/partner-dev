import * as React from 'react';
import * as update from 'immutability-helper';

import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Loading from './Loading';
import Header from './Header';
import Body from './Body';

import {loadProjects} from '../../functions/projects';
import {check} from '../../functions/auth';

import '../../static/scss/routes/projects.scss';

interface State {
	isSigned: boolean
	loading: boolean,
	projects: any
}

export class Projects extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			isSigned: check(),
			loading: true,
			projects: []
		}
	}

	componentWillMount() {
		!this.state.isSigned && window.location.replace("/");
	}

	componentDidMount() {
		loadProjects().then((result) => {
			this.setState(update(this.state, {
				projects: {$set: result.projects},
				loading: {$set: false},
			}));
		})
	}

	reloadProjects() {
		this.setState(update(this.state, {
			loading: {$set: true},
		}), () => this.componentDidMount());
	}

	render() {
		const {
			loading,
			projects
		} = this.state;

		return (
			<Dashboard current="projects">
				<DashboardHeader>
					<Header onUpdate={this.reloadProjects} />
				</DashboardHeader>
				{loading && <Loading />}
				{!loading && <Body projects={projects} onUpdate={this.reloadProjects} />}
			</Dashboard>
		);
	}
}