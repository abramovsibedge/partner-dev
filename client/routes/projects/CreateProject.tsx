import * as React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actions from '../../reducers/projects/actions';

import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Create from '../projects/Body/Create';
import Header from './Header';

import '../../static/scss/routes/projects.scss';

interface Props {
  createProjectResult: boolean
  createProject: (data: object)=> void
}

class CreateProjects extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.createProjectResult && nextProps.createProjectResult != this.props.createProjectResult) {
      hashHistory.push('/projects');
    }
  }

	render() {
		return (
				<Dashboard current="createProject">
					<DashboardHeader>
						<Header />
					</DashboardHeader>
         	<Create
							createProject={(e:object)=>this.props.createProject(e)}
					/>
				</Dashboard>
		);
	}
}

export default connect(
    state => ({
      createProjectResult: state.projects.createProjectResult
		}),
    ({
      createProject: actions.createProject
    })
)(CreateProjects);