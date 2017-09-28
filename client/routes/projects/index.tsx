import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';
import { hashHistory } from 'react-router';

import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Loading from './Loading';
import Header from './Header';
import Body from './Body';
import {AuthMessage} from '../auth/messages';

import { getProjects } from '../../reducers/projects/actions';
import {
  checkAuth
} from '../../utils';

import '../../static/scss/routes/projects.scss';

interface Props {
  projects: any;
  loadProjects: () => void;
  loading: boolean;
  status_set_visibility: boolean;
}
interface State {}

class Projects extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {}
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
      projects
		} = this.props;
		return (
			<Dashboard current="projects">
				<DashboardHeader>
					<Header onUpdate={() => this.reloadProjects()} />
				</DashboardHeader>
				{loading && <Loading />}
				{!loading && <Body projects={projects} onUpdate={() => this.reloadProjects()} />}
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
      loadProjects: getProjects,
    })
)(Projects);