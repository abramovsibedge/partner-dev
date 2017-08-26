import * as React from 'react';

import Header from './Header';
import Body   from './Body';
import Loader from './loader';

import '../../static/scss/routes/subscribers.scss';
import '../../static/scss/components/modal.scss';
import '../../static/scss/components/table.scss';

import Switcher from '../../components/switcher';

import {
	loadProjects
} from '../../functions/projects';

import {
	check as checkAuth
} from '../../functions/auth';

import {
	logIn,
	checkLogin,
	getActiveProject
} from '../../functions/subscribers';

import Signal from '../../functions/Signal';

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
		!this.state.isSigned && window.location.replace("/");
	}

	componentDidMount() {
		this.updateProjectData();
	}

	updateProjectData() {
		let state = {};

		loadProjects().then((response) => {
			state['projectsList'] = response.projects ? response.projects : []; // @todo empty projects handler

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
				if(result) return resolve(getActiveProject()); // @todo Error fallback
			});
		});
	}

	render() {
		let content = [];

		if(!this.state.loaded) {
			content.push(
				<Loader key="loader" />
			)
		}
		else {
			content.push(
				<Body	key="Body" activeProject={this.activeProject} projectsList={this.state.projectsList} />
			)
		}

		return (
			<div className="dashboard">
				<Header key="Header" loaded={this.state.loaded} />,
				{content}
				<Switcher current="subscribers"/>
			</div>
		);
	}
}