import * as React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

// for redux
import * as model from '../../reducers/subscribers/model';
import * as actions from '../../reducers/subscribers/actions';
import { getProjects } from '../../reducers/projects/actions';

import Dashboard from '../../components/dashboard';
import Header from './Header';
import ProjectsSelector from './Body/ProjectsSelector';
import SubscribersList from './Body/SubscribersList';

import '../../static/scss/components/modal.scss';
import '../../static/scss/components/table.scss';
import '../../static/scss/routes/subscribers.scss';

import {
	checkAuth
} from '../../utils'

interface Props {
	projects: any;
	subscribers: model.subscribersModel;
	loadProjects: () => void;
	setActiveProject: (project: any) => void;
}

class Subscribers extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	componentWillMount() {
		if (!checkAuth()) {
			hashHistory.push('/auth/signin');
			return false;
		} else {
			this.props.loadProjects();
		}
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.subscribers['activeProject'] === null || typeof nextProps.subscribers['activeProject'] === 'undefined') {
			this.props.setActiveProject(0);
		}
	}

	render() {
		return (
			<Dashboard current="subscribers">
				<Header />
				<section className="layout">
					<ProjectsSelector />
					<SubscribersList />
				</section>
			</Dashboard>
		);
	}
}

export default connect(
	state => ({
		projects: state.projects,
		subscribers: state.subscribers
	}),
	({
		loadProjects: getProjects,
		setActiveProject: actions.setActiveProject
	})
)(Subscribers);