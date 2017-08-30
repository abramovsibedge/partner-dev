import * as React from 'react';

import Spinner from '../../../../components/spinner';

import {
	getTraffic,
} from '../../../../functions/subscribers';

import SubscriberModify       from './SubscriberModify';
import SubscriberSocial       from './SubscriberSocial';
import SubscriberDevices      from './SubscriberDevices';
import SubscriberSetLimit     from './SubscriberSetLimit';
import SubscriberSessions     from './SubscriberSessions';
import SubscriberPurchases    from './SubscriberPurchases';
import SubscriberChangeStatus from './SubscriberChangeStatus';


interface Parent {
	isOpened: boolean,
	subscriber: any
}

interface State {
	tab: string,
	trafic: any,
	isLoaded: boolean,
	subscriber: any,
	isOpened: boolean
};

class SubscriberRowOpened extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			tab: 'sessions',
			trafic: {},
			isLoaded: false,
			subscriber: props.subscriber,
			isOpened: props.isOpened
		};

		if(props.isOpened) this.loadInfo(props.subscriber.id);
	}

	componentWillReceiveProps(props: any) {
		this.setState({
			isOpened: props.isOpened,
			subscriber: props.subscriber,
		});

		if(props.isOpened) this.loadInfo(props.subscriber.id);
	}

	loadInfo(id: number) {
		getTraffic(id).then(trafic => {
			trafic = {
				used:      trafic['traffic_used']      ? trafic['traffic_used']     :0,
				start:     trafic['traffic_start']     ? trafic['traffic_start']    :0,
				limit:     trafic['traffic_limit']     ? trafic['traffic_limit']    :0,
				remaining: trafic['traffic_remaining'] ? trafic['traffic_remaining']:0,
				unlimited: trafic['traffic_unlimited']
			};

			this.setState({
				isLoaded: true,
				trafic: trafic
			});
		});
	}

	tabSwitcher(tab: string) {
		this.setState({tab: tab});
	}

	render() {
		if(!this.state.isOpened) return <div className="table_row_content is-loading" />;
		if(!this.state.isLoaded) return <div className="table_row_content is-loading"><Spinner width="65" height="65" strokeWidth="6" /></div>;

		return (
			<div className="table_row_content">
				<div className="subscriber_pane_content">
					{this.renderTrafic()}
					{this.renderButtons()}
					{this.renderContent()}
				</div>
			</div>
		);
	}

	renderContent() {
		let content;

		switch (this.state.tab) {
			case 'sessions':
				content =  <SubscriberSessions />;
				break;
			case 'devices':
				content =  <SubscriberDevices />;
				break;
			case 'purchases':
				content =  <SubscriberPurchases subscriber={this.state.subscriber}/>;
				break;
			case 'social':
				content =  <SubscriberSocial />;
				break;
		}

		return (
			<div className="subscriber_content">
				{content}
			</div>
		);
	}

	renderButtons() {
		let buttons = {
			sessions: 'Sessions',
			devices: 'Devices',
			purchases: 'Purchases',
			social: 'Social'
		}, contentButtons = [];

		for(let k in buttons) {
			contentButtons.push(
				<button key={k}
								className={'subscriber_tabs_item' + (this.state.tab===k?' subscriber_tabs_item-active':'')}
								onClick={() => this.tabSwitcher(k)} type="button">
					{buttons[k]}
				</button>
			);
		}

		return (
			<div className="subscriber_buttons">
				<div>
					{contentButtons}
				</div>
				<div className="subscriber_manage">
					<SubscriberModify subscriber={this.state.subscriber} />
					<SubscriberSetLimit subscriber={this.state.subscriber} />
					<SubscriberChangeStatus subscriber={this.state.subscriber} />
				</div>
			</div>
		);
	}

	renderTrafic() {
		let free = (this.state.subscriber.purchases.length===0);

		if(this.state.trafic.unlimited) {
			return (
				<div className="subscriber_traffic">
					<table>
						<thead>
						<tr>
							<th>Traffic unlimited</th>
							<th>Purchases</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>true</td>
							<td>
								<span className={(free ? 'table_disable' : 'table_enable')}>{(free ? 'Free' : 'Not free')}</span>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			);
		}

		let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
		let ct = new Date(this.state.trafic.start);

		return (
			<div className="subscriber_traffic">
				<table>
					<thead>
					<tr>
						<th>Traffic unlimited</th>
						<th>Traffic start</th>
						<th>Traffic used</th>
						<th>Traffix remaining</th>
						<th>Traffic limit</th>
						<th>Purchases</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>false</td>
						<td>{ct.getDate() + ' ' + monthNames[ct.getMonth()] + ' ' + ct.getFullYear() + ' ' + ct.getHours() + ':' + ((ct.getMinutes()>10)?ct.getMinutes():('0'+ct.getMinutes().toString()))} </td>
						<td>{this.countTrafic(this.state.trafic.used)}</td>
						<td>{this.countTrafic(this.state.trafic.remaining)}</td>
						<td>{this.countTrafic(this.state.trafic.limit)}</td>
						<td><span className={(free ? 'table_disable' : 'table_enable')}>{(free ? 'Free' : 'Not free')}</span></td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}

	countTrafic(size: number) {
		if((size / (1024*1024*1024)) > 1) return ((size / (1024*1024*1024)).toFixed(2) + ' gigabytes');
		else if((size / (1024*1024)) > 1) return ((size / (1024*1024)).toFixed(2) + ' magebytes');
		else if((size / (1024)) > 1) return ((size / (1024)).toFixed(2) + ' kilobytes');

		return (size.toString() + ' bytes');
	}
}

export default SubscriberRowOpened;