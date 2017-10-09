import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Loading from './Loading';
import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Body from './Body';

import * as actions from '../../reducers/projects/actions';
import { checkAuth, logOut } from '../../utils';
import { IconPlus } from '../../components/icons'

import '../../static/scss/routes/projects.scss';

interface Props {
	loading: boolean;
	projectsList: any;
  loadProjects: () => void;
}

class Projects extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		checkAuth() ? this.props.loadProjects() : logOut();
	}

	render() {
		const {
      loading,
			projectsList,
		} = this.props;

		return (
			<Dashboard current="projects">
				<DashboardHeader>
					<Link to="createproject" className="button is-transparent">
						<IconPlus width="24" height="24"/>
						<span>Add project</span>
					</Link>
				</DashboardHeader>
				{loading ? <Loading /> : <Body projects={projectsList} onUpdate={() => this.componentDidMount()} />}
			</Dashboard>
		);
	}
}

export default connect(
	state => ({
		loading: state.projects.loading,
		projectsList: state.projects.list,
	}),
	({
		loadProjects: actions.getProjects,
	})
)(Projects);