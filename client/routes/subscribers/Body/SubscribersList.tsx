import * as React from 'react';

import Signal from '../../../functions/Signal';
import Loader from '../Loading';

import {
	getSubscribersList
} from '../../../functions/subscribers';

interface State {
	loaded: boolean,
	subscribers: any
};

class SubscribersList extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			loaded: false,
			subscribers: []
		};
	}

	componentDidMount() {
		this.getSubscribers();

		Signal.attach('projectChanged', () => {
			this.getSubscribers();
		});

		Signal.attach('subscriberAdded', () => {
			this.getSubscribers();
		});
	}

	getSubscribers() {
		this.setState({loaded: false});
		getSubscribersList().then((subscribers) => {
			this.setState({
				loaded: true,
				subscribers: subscribers.result==='OK' ? subscribers.subscribers : []
			})
		});
	}

	render() {
		let content;

		if(!this.state.loaded) {
			content = <Loader key="loader"/>;
		}
		else {
			content = <div className="table main_table">
				{this.tableHader()}
				{this.tableBody()}
			</div>;
		}

		return (
			<div className="layout_content">
				{content}
			</div>
		);
	}

	tableHader() {
		return (
			<div className="table_head">
				<table>
					<tbody>
					<tr>
						<td style={{width: '8.15%'}}>ID</td>
						<td style={{width: '25%'}}>Name</td>
						<td style={{width: '8.55%'}}>Licence</td>
						<td style={{width: '11.05%'}}>Activated devices</td>
						<td style={{width: '9.9%'}}>Active sessions</td>
						<td style={{width: '8.5%'}}>Condition</td>
						<td style={{width: '10.9%'}}>Registration time</td>
						<td style={{width: '10.45%'}}>Last connection</td>
						<td style={{width: '7.5%'}}>Purchases</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}

	tableBody() {
		let content = [];

		let monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];

		for(let k in this.state.subscribers) {
			let subscriber = this.state.subscribers[k];

			let ct   = new Date(subscriber.connection_time);
			let rt = new Date(subscriber.registration_time);

			content.push(
				<div key={k} className="table_row user_item">
					<div className="table_row_wrapper">
						<div className="table_cell" style={{width: '8.15%'}}>
							<div className="table_cell_content">{subscriber.id}</div>
						</div>
						<div className="table_cell" style={{width: '25%'}}>
							<div className="table_cell_content">{subscriber.name}</div>
						</div>
						<div className="table_cell" style={{width: '8.55%'}}>
							<div className="table_cell_content">{subscriber.bundle.name}</div>
						</div>
						<div className="table_cell" style={{width: '11.05%'}}>
							<div className="table_cell_content">{subscriber.activated_devices}</div>
						</div>
						<div className="table_cell" style={{width: '9.9%'}}>
							<div className="table_cell_content">{subscriber.active_sessions}</div>
						</div>
						<div className="table_cell" style={{width: '8.5%'}}>
							<div className="table_cell_content">{subscriber.condition}</div>
						</div>
						<div className="table_cell" style={{width: '10.9%'}}>
							<div className="table_cell_content">{rt.getDate() + ' ' + monthNames[rt.getMonth()] + ' ' + rt.getFullYear() + ' ' + rt.getHours() + ':' + rt.getMinutes()}</div>
						</div>
						<div className="table_cell" style={{width: '10.45%'}}>
							<div className="table_cell_content">{ct.getDate() + ' ' + monthNames[ct.getMonth()] + ' ' + ct.getFullYear() + ' ' + ct.getHours() + ':' + ct.getMinutes()}</div>
						</div>
						<div className="table_cell" style={{width: '7.5%'}}>
							<div className="table_cell_content">{subscriber.purchases.length}</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="table_body">
				{content}
			</div>
		);
	}
}

export default SubscribersList;