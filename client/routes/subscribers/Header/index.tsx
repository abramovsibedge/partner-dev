import * as React from 'react';

import AddSubscriber from './AddSubscriber';
import SearchSubscriber from './Search';
import DashboardHeader from '../../../components/dashboard/dashboardHeader';

export default class Header extends React.Component <{}, {}> {
	render() {
		return (
			<DashboardHeader>
				<div className="subscriber_filter">
					<SearchSubscriber />
					<AddSubscriber />
				</div>
			</DashboardHeader>
		);
	}
}