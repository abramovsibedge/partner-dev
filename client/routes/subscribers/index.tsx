import * as React from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Header from './Header';
import Body from './Body';

import { getProjects } from '../../reducers/projects/actions';
import * as actions from '../../reducers/subscribers/actions';
import { checkAuth, logOut } from '../../utils'

import '../../static/scss/routes/subscribers.scss';

interface Props {
	loading: boolean;
	getProjects: () => void;
	getLicenses: () => void;
}

class Subscribers extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	componentWillMount() {
		if (!checkAuth()) {
			logOut();
		} else {
			this.props.getProjects();
			this.props.getLicenses();
		}
	}

	render() {
		const { loading } = this.props;

		return (
			<Dashboard current="subscribers">
				<DashboardHeader>
					<Header />
				</DashboardHeader>
				{loading ? <Loading /> : <Body />}
			</Dashboard>
		);
	}
}

export default connect(
	state => ({
		loading: state.projects.loading
	}),
	({
		getProjects: getProjects,
		getLicenses: actions.getLicenses
	})
)(Subscribers);