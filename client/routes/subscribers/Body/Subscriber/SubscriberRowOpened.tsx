import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import * as actions from '../../../../reducers/subscriber/actions';

import Spinner from '../../../../components/spinner';

import {
	dateString,
	byteConvert
} from '../../../../utils';

import SubscriberModify       from './SubscriberModify';
import SubscriberSocial       from './SubscriberSocial';
import SubscriberDevices      from './SubscriberDevices';
import SubscriberSetLimit     from './SubscriberSetLimit';
import SubscriberSessions     from './SubscriberSessions';
import SubscriberPurchases    from './SubscriberPurchases';
import SubscriberChangeStatus from './SubscriberChangeStatus';


interface Props {
	loading?: boolean
	subscriber?: any
	loadingState?: any
	getTraffic?: (data: any) => void
	getDevices?: (data: any) => void
	data: any
}

interface State {
	tab: string
}

class SubscriberRowOpened extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			tab: 'sessions'
		};
	}

	componentWillMount() {
		this.loadInfo(this.props.data.id);
	}

	loadInfo(id: number) {
		this.props.loadingState(true)
			.then(() => {
				this.props.getDevices(id)
			})
			.then(() => {
				this.props.getTraffic(id)
			});
	}

	tabSwitcher(tab: string) {
		this.setState({tab: tab});
	}

	render() {
		const { loading } = this.props;

		return (
			<div className={classNames('table_row_content', loading && 'is-loading')}>
				{loading && <Spinner width="65" height="65" strokeWidth="6" />}
				{!loading && <div className="subscriber_pane_content">
					{this.renderTrafic()}
					{this.renderButtons()}
					{this.renderContent()}
				</div>}
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
		const {
			data,
			subscriber
		} = this.props;

		let free = (data.purchases.length === 0);

		if(subscriber.traffic.traffic_unlimited) {
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
							<td>{dateString(subscriber.traffic.start)} </td>
							<td>{byteConvert(subscriber.traffic.used)}</td>
							<td>{byteConvert(subscriber.traffic.remaining)}</td>
							<td>{byteConvert(subscriber.traffic.limit)}</td>
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
		loading: state.subscriber.subscriberLoading,
		subscriber: state.subscriber
	}),
	({
		loadingState: actions.loadingState,
		getTraffic: actions.getTraffic,
		getDevices: actions.getDevices
	})
)(SubscriberRowOpened);