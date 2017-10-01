import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';
import { hashHistory } from 'react-router';

import Loading from './Loading';
import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Header from './Header';
import Body from './Body';

import * as actions from '../../reducers/projects/actions';
import { checkAuth } from '../../utils';

import '../../static/scss/routes/projects.scss';

interface Props {
	loading: boolean;

  projects: any;
  loadProjects: () => void;
}

class Projects extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
    if (!checkAuth()) {
      hashHistory.push('/auth/signin');
      return false;
    } else {
      this.props.loadProjects();
    }
	}

	reloadProjects = () => {
		this.setState(update(this.state, {
			loading: {$set: true},
		}), () => this.componentDidMount());
	};

	render() {
		const {
      loading,
      projects,
		} = this.props;

		return (
			<Dashboard current="projects">
				<DashboardHeader>
					<Header onUpdate={() => this.reloadProjects()} />
				</DashboardHeader>
				{loading ? <Loading /> : <Body projects={projects} onUpdate={() => this.reloadProjects()} />}
			</Dashboard>
		);
	}
}

export default connect(
    state => ({
      projects: state.projects.list,
      loading: state.projects.loading,
    }),
    ({
      loadProjects: actions.getProjects,
    })
)(Projects);