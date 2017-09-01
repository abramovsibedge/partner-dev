import * as React from 'react';

import Signal from '../../../functions/Signal';
import Loader from '../Loading';

import {
	getSubscribersList,
	searchSubscriber
} from '../../../functions/subscribers';

interface State {
	loaded: boolean,
	subscribers: any,
};

import SubscriberRow from './Subscriber/SubscriberRow';

class SubscribersList extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			loaded: false,
			subscribers: []
		};

		new Signal('openSubscriber');
		new Signal('closeSubscriber');
		new Signal('subscriberModified');
		new Signal('searchSubscriber');
		new Signal('loadSubscribers');
	}

	componentDidMount() {
		this.getSubscribers();

		Signal.attach('projectChanged', () => {
			this.getSubscribers();
		});

		Signal.attach('subscriberAdded', () => {
			this.getSubscribers();
		});

		Signal.attach('searchSubscriber', (params: any) => {
			this.searchSubscriber(params);
		});

		Signal.attach('loadSubscribers', () => {
			this.getSubscribers();
		});
	}

	searchSubscriber(params: any) {
		this.setState({loaded: true});

		console.log( params );

		searchSubscriber(params).then((subscribers) => {
			this.setState({
				loaded: true,
				subscribers: subscribers.result==='OK' ? subscribers.subscriber ? [subscribers.subscriber] : subscribers.subscribers : []
			});
		}).catch();
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

	openSubscriber(subscriberId: number) {
		Signal.dispatch('openSubscriber', subscriberId);
	}

	closeSubscriber(subscriberId: number) {
		Signal.dispatch('closeSubscriber', subscriberId);
	}

	render() {
		return (
			<div className="layout_content">
				{!this.state.loaded && <Loader />}
				{this.state.loaded &&
				<div className="table main_table">
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
					{this.tableBody()}
				</div>}
			</div>
		);
	}

	tableBody() {
		let content = [];

		for(let k in this.state.subscribers) {
			content.push(
				<SubscriberRow
					key={k}
					subscriber={this.state.subscribers[k]}
					openSubscriber ={() => {this.openSubscriber(this.state.subscribers[k].id)}}
					closeSubscriber={() => {this.closeSubscriber(this.state.subscribers[k].id)}}
				/>
			)
		}

		return (
			<div className="table_body">
				{content}
				{content.length === 0 && <div className="table_row table_row_empty">
					<div className="table_cell" style={{width: '100%'}}>
						<div className="table_cell_content">No result for your request.</div>
					</div>
				</div>}
			</div>
		);
	}
}

export default SubscribersList;