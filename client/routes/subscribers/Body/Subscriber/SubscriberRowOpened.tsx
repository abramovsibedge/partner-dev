import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';

import * as model from '../../../../reducers/subscriber/model';
import * as actions from '../../../../reducers/subscriber/actions';

import Spinner from '../../../../components/spinner';

import {
	getTraffic,
	dateString,
	byteConvert
} from '../../../../functions/subscribers';

import SubscriberModify       from './SubscriberModify';
import SubscriberSocial       from './SubscriberSocial';
import SubscriberDevices      from './SubscriberDevices';
import SubscriberSetLimit     from './SubscriberSetLimit';
import SubscriberSessions     from './SubscriberSessions';
import SubscriberPurchases    from './SubscriberPurchases';
import SubscriberChangeStatus from './SubscriberChangeStatus';


interface Props {
	getTraffic?: (data: any) => void
	data: any
	subscriber?: any
}

interface State {
	tab: string,
	trafic: any,
	isLoaded: boolean,
	subscriber: any
}

class SubscriberRowOpened extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			tab: 'sessions',
			trafic: {},
			isLoaded: false,
			subscriber: {}
		};

		// if(props.isOpened) this.loadInfo(props.subscriber.id);
	}

	componentWillMount() {
		this.loadInfo(this.props.data.id);
	}

	componentWillReceiveProps(nextprops: any) {
		if (Object.keys(this.state.trafic).length === 0) {
			this.loadInfo(this.props.data.id)
		}

		if (nextprops.subscriber.data) {
			this.setState(update(this.state, {
				trafic: {$set: nextprops.subscriber.data}
			}));
		}

		// console.log( nextprops );
		// this.setState({
		// 	isOpened: nextprops.isOpened
		// });
		//
		// if(props.isOpened) this.loadInfo(props.id);
	}

	loadInfo(id: number) {
		this.props.getTraffic(id);

		// getTraffic(id).then(trafic => {
		// 	trafic = {
		// 		used:      trafic['traffic_used']      ? trafic['traffic_used']     :0,
		// 		start:     trafic['traffic_start']     ? trafic['traffic_start']    :0,
		// 		limit:     trafic['traffic_limit']     ? trafic['traffic_limit']    :0,
		// 		remaining: trafic['traffic_remaining'] ? trafic['traffic_remaining']:0,
		// 		unlimited: trafic['traffic_unlimited']
		// 	};
		//
		// 	this.setState({
		// 		isLoaded: true,
		// 		trafic: trafic
		// 	});
		// });
	}

	tabSwitcher(tab: string) {
		this.setState({tab: tab});
	}

	render() {
		if( Object.keys(this.state.trafic).length === 0) return (
			<div className="table_row_content is-loading"><Spinner width="65" height="65" strokeWidth="6" /></div>
		);

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
				content =  <SubscriberSessions data={this.props.data}/>;
				break;
			case 'devices':
				content =  <SubscriberDevices data={this.props.data}/>;
				break;
			case 'purchases':
				content =  <SubscriberPurchases data={this.props.data}/>;
				break;
			case 'social':
				content =  <SubscriberSocial data={this.props.data}/>;
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
					<SubscriberModify data={this.props.data} />
					<SubscriberSetLimit data={this.props.data} />
					<SubscriberChangeStatus data={this.props.data} />
				</div>
			</div>
		);
	}

	renderTrafic() {
		let free = (this.props.data.purchases.length===0);

		if(this.state.trafic.traffic_unlimited) {
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
							<td>{dateString(this.state.trafic.start)} </td>
							<td>{byteConvert(this.state.trafic.used)}</td>
							<td>{byteConvert(this.state.trafic.remaining)}</td>
							<td>{byteConvert(this.state.trafic.limit)}</td>
							<td><span className={(free ? 'table_disable' : 'table_enable')}>{(free ? 'Free' : 'Not free')}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default connect<any, any, Props>(
	state => ({
		subscriber: state.subscriber
	}),
	({
		getTraffic: actions.getTraffic
	})
)(SubscriberRowOpened);