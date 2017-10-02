import * as React from 'react';
import { connect } from 'react-redux';

import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
// import Create from '../projects/Body/Create';
import Header from './Header';

import '../../static/scss/routes/projects.scss';

interface Props {}

class CreateProject extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {

		return (
				<Dashboard current="projects">
					<DashboardHeader>
						<Header />
					</DashboardHeader>
         	{/*<Create  />*/}
				</Dashboard>
		);
	}
}

export default connect(
    state => ({
		}),
    ({
    })
)(CreateProject);