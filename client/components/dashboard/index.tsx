import * as React from 'react';
import Switcher from '../../components/switcher';

import '../../static/scss/routes/dashboard.scss';

interface Props {
	current: string
}

class Dashboard extends React.Component<Props, {}> {
	render() {
		return (
			<div className="dashboard">
				{this.props.children}
				<Switcher current={this.props.current} />
			</div>
		);
	}
}

export default Dashboard;