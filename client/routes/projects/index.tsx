import * as React from 'react';
import * as update from 'immutability-helper';
import {storageHelper} from '../../utils';

const storage = new storageHelper;

import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Loading from './Loading';
import Header from './Header';
import Body from './Body';
import {AuthMessage} from '../auth/messages';

import {loadProjects} from '../../functions/projects';
import {check} from '../../functions/auth';

import '../../static/scss/routes/projects.scss';

interface State {
	loading: boolean,
	projects: any
}

export class Projects extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			loading: true,
			projects: []
		}
	}

	componentDidMount() {
		loadProjects()
			.then((result) => {
				if (result.result !== "OK") {
					if (result.result === "NOT_AUTHORIZED") {
						console.log( 123 );
						// storage.remove('tokens');
					}
				}

				this.setState(update(this.state, {
					projects: {$set: result.projects},
					loading: {$set: false},
				}));
			})
			.catch((error) => {
				console.log( error );
			})
	}

	reloadProjects = () => {
		this.setState(update(this.state, {
			loading: {$set: true},
		}), () => this.componentDidMount());
	};

	render() {
		const {
			loading,
			projects
		} = this.state;

		return (<div>
				{!check() ? <AuthMessage isSigned={!check()} /> : <Dashboard current="projects">
					<DashboardHeader>
						<Header onUpdate={() => this.reloadProjects()} />
					</DashboardHeader>
					{loading && <Loading />}
					{!loading && <Body projects={projects} onUpdate={() => this.reloadProjects()} />}
				</Dashboard>}
			</div>
		);
	}
}