import * as React from 'react';

import AddSubscriber from './AddSubscriber';
import SearchSubscriber from './Search';
import DashboardHeader from '../../../components/dashboard/dashboardHeader';

import Signal from '../../../functions/Signal';

interface Parent {
	loaded: boolean
}

interface State {
	loaded: boolean,
}

export default class Header extends React.Component <Parent, State>{
	signal: any;

	constructor(props: any) {
		super(props);

		this.state = {
			loaded: props.loaded,
		};
	}

	componentDidMount() {
		Signal.attach('loaded', (loaded: boolean) => {
			this.setState({loaded: loaded});
		});
	}

	render() {
		return (
			<DashboardHeader>
				{this.state.loaded && <div className="subscriber_filter">
					<SearchSubscriber />
					<AddSubscriber />
				</div>}
			</DashboardHeader>
		);
	}
}