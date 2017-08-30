import * as React from 'react';
import Signal from '../../functions/Signal';

import Body   from './Body';
import Header from './Header';

import Loading from './Loading';

import '../../static/scss/components/modal.scss';
import '../../static/scss/components/table.scss';
import '../../static/scss/routes/subscribers.scss';

import Switcher from '../../components/switcher';
import Dashboard from '../../components/dashboard';

import {
	check as checkAuth
} from '../../functions/auth';

import {
	loadProjects
} from '../../functions/projects';

import {
	logIn,
	checkLogin,
	getActiveProject
} from '../../functions/subscribers';

interface State {
	isSigned: boolean,
	projectsList: any,
	loaded: boolean
};

export class Subscribers extends React.Component<{}, State> {
	activeProject: string;

	constructor(props: any) {
		super(props);

		this.state = {
			isSigned: checkAuth(),
			projectsList: [],
			loaded: false
		};

		this.signals();
	}

	signals() {
		new Signal('loaded');
		new Signal('changeProject');
		new Signal('projectChanged');
		new Signal('subscriberAdded');

		Signal.attach('changeProject', (newProject: string) => {
			for(let k in this.state.projectsList) {
				if(this.state.projectsList[k].publickey === newProject) {
					return this.logIn(this.state.projectsList[k]).then((activeProject: string) => {
						this.activeProject = activeProject;
						Signal.dispatch('projectChanged', this.activeProject);
					});
				}
			}
		});
	}

	componentWillMount() {
		!this.state.isSigned && window.location.replace('/');
	}

	componentDidMount() {
		this.getData();
	}

	getData() {
		let state = {};

		loadProjects().then((response) => {
			state['projectsList'] = response.projects;

			let id = 0;

			if(getActiveProject() !== '') {
				let active = getActiveProject();
				for(let k in state['projectsList']) {
					if(state['projectsList'][k].publickey === active) {
						id = Number(k);
						break;
					}
				}
			}

			this.logIn(state['projectsList'][id]).then((activeProject: string) => {
				state['loaded']    = true;
				this.activeProject = activeProject;

				Signal.dispatch('loaded', true);

				this.setState(state);
			});
		});
	}

	logIn(project: object) {
		return new Promise((resolve) => {
			if(checkLogin() && getActiveProject() === project['publickey']) return resolve(project['publickey']);

			logIn(project['publickey'], project['privatekey']).then((result: boolean) => {
				if(result) return resolve(getActiveProject());
			});
		});
	}

	render() {
		return (
			<Dashboard current="subscribers">
				<Header loaded={this.state.loaded} />,
				{this.state.loaded
					?<Body projectsList={this.state.projectsList} activeProject={this.activeProject} />
					:<Loading />}
			</Dashboard>
		);
	}
}