import * as React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Loading from './Loading';
import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Header from './Header';
import Body from './Body';

import { getProjects } from '../../reducers/projects/actions';
import * as actions from '../../reducers/subscribers/actions';
import { checkAuth } from '../../utils'

import '../../static/scss/routes/subscribers.scss';

interface Props {
	projectsLoading: boolean;
	loadProjects: () => void;
	getLicenses: () => void;
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
			this.props.getLicenses();
		}
	}

	render() {
		const { projectsLoading } = this.props;

		return (
			<Dashboard current="subscribers">
				<DashboardHeader>
					<Header />
				</DashboardHeader>
				{projectsLoading ? <Loading /> : <Body />}
			</Dashboard>
		);
	}
}

export default connect(
	state => ({
		projectsLoading: state.projects.loading
	}),
	({
		loadProjects: getProjects,
		getLicenses: actions.getLicenses
	})
)(Subscribers);