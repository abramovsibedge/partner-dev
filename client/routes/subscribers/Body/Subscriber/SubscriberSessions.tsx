import * as React from 'react';
import Loading from '../../Loading';
import {Button} from "../../../../components/button/index";
import Calendar from "./Calendar";
import { connect } from 'react-redux';
import * as actions from '../../../../reducers/subscriber/actions';

import {
	IconPhone,
	IconPlay
} from '../../../../components/icons'

import {
	dateString,
	byteConvert
} from '../../../../utils';

interface Props {
	data: any
	subscriber?: any
	getSessions?: (id: any, data: any) => void
	getDevices?: (data: any) => void
}

interface State {
	subscriber: any,
	sessions: any,
	loaded: boolean,
	tx: number,
	rx: number,
	size: number,
	devices: any,
	activeDevice: any,
	showDevicesDropdown: boolean
}

class SubscriberSessions extends React.Component<Props, State> {
	time: any;
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.data,
			sessions: [],
			loaded: false,
			tx: 0,
			rx: 0,
			size: 0,
			devices: [],
			activeDevice: 0,
			showDevicesDropdown: false
		};
	}

	componentWillReceiveProps(nextprop: any) {
		this.setState({
			devices: nextprop.subscriber.devices,
			sessions: nextprop.subscriber.sessions,
			loaded: true
		});
	}

	updateSearch(time: any) {
		this.time = time;

		this.setState({loaded: false});

		this.props.getSessions(this.props.data.id, {start_time: this.time.from[0], end_time: this.time.till[0]});
	}

	render() {
		return (
			<div className="subscriber_body_content">
				<div className="session_filter">
					<Calendar
						updateSearch={(time: any) => this.updateSearch(time)}
						calendarOpened={() => {
							if(this.state.showDevicesDropdown) this.setState({showDevicesDropdown: false});
						}}
						devicesDropdown={this.state.showDevicesDropdown}/>
					{this.renderDeviceSelector()}
					<div className="sessions_traffic js-sessions-traffic">
						<div className="sessions_traffic_item">
							<div className="sessions_traffic_label">Total sessions</div>
							<div className="sessions_traffic_value js-sessions-total">{this.state.size}</div>
						</div>
						<div className="sessions_traffic_item">
							<div className="sessions_traffic_label">Total TX</div>
							<div className="sessions_traffic_value js-sessions-total-tx">{byteConvert(this.state.tx)}</div>
						</div>
						<div className="sessions_traffic_item">
							<div className="sessions_traffic_label">Total RX</div>
							<div className="sessions_traffic_value js-sessions-total-rx">{byteConvert(this.state.rx)}</div>
						</div>
					</div>
				</div>
				{this.renderContent()}
			</div>
		);
	}

	renderContent() {
		if(!this.state.loaded) {
			return (
				<div className="subscriber_tabs_content sessions_content">
					<div className="subscriber_tabs_empty sessions_empty"><Loading/></div>
				</div>
			);
		}

		if(this.state.sessions.length === 0) {
			return (
				<div className="subscriber_tabs_content sessions_content">
					<div className="subscriber_tabs_empty sessions_empty">
						<p>
							Subscriber has no sessions from <span>{this.state.activeDevice===0?'All Devices':this.state.activeDevice.device_id}</span> between<br />
							<span>{this.time.from[1]} - {this.time.till[1]}</span>
						</p>
					</div>
				</div>
			);
		}
		
		let content = [];
		
		for(let k in this.state.sessions) {
			let session = this.state.sessions[k];
			if(this.state.activeDevice !== 0 && session.device_id !== this.state.activeDevice.device_id) continue;

			content.push(
				<div className="table_row" key={k}>
					<div className="table_row_wrapper">
						<div className="table_cell" style={{width: "16.4%"}}>
							<div className="table_cell_content">{session.device_id}</div>
						</div>
						<div className="table_cell" style={{width: "16.7%"}}>
							<div className="table_cell_content">{session.server}}</div>
						</div>
						<div className="table_cell" style={{width: "11.25%"}}>
							<div className="table_cell_content">
								<div className="table_date">{dateString(session.start_time)}</div>
							</div>
						</div>
						<div className="table_cell" style={{width: "11.25%"}}>
							<div className="table_cell_content">
								<div className="table_date">{dateString(session.end_time)}</div>
							</div>
						</div>
						<div className="table_cell" style={{width: "13.7%"}}>
							<div className="table_cell_content">{session.client_address}</div>
						</div>
						<div className="table_cell" style={{width: "13.02%"}}>
							<div className="table_cell_content">{session.internal_address}</div>
						</div>
						<div className="table_cell a-right" style={{width: "9.25%"}}>
							<div className="table_cell_content">{byteConvert(session.tx)}</div>
						</div>
						<div className="table_cell a-right" style={{width: "8%"}}>
							<div className="table_cell_content">{byteConvert(session.rx)}</div>
						</div>
					</div>
				</div>
			)
		}
		
		return (
			<div className="table inner_table">
				<div className="table_head">
					<table>
						<tbody>
						<tr>
							<td style={{width: "16.4%"}}>Device ID</td>
							<td style={{width: "16.7%"}}>Server</td>
							<td style={{width: "11.25%"}}>Start time</td>
							<td style={{width: "11.25%"}}>End time</td>
							<td style={{width: "13.7%"}}>Client address</td>
							<td style={{width: "13.02%"}}>Internal address</td>
							<td style={{width: "9.25%"}}>Incoming</td>
							<td style={{width: "8.4%"}}>Outcoming</td>
						</tr>
						</tbody>
					</table>
				</div>

				<div className="table_body">
					{content}
				</div>
				<div className="subscriber_tabs_empty sessions_empty">
					<p>
						Subscriber has {this.state.size} sessions from <span>{this.state.activeDevice===0?'All Devices':this.state.activeDevice.device_id}</span> between<br />
						<span>{this.time.from[1]} - {this.time.till[1]}</span>
					</p>
					<p><a href="#" className="js-sessions-other-range">Try different time range</a></p>
				</div>
			</div>
		)
	}

	changeDevice(newDevice: any) {
		this.setState({activeDevice: newDevice});

		let tx = 0, rx = 0, size = 0;

		for(let k in this.state.sessions) {
			if(newDevice !== 0 && this.state.sessions[k].device_id !== newDevice.device_id) continue
			tx += this.state.sessions[k].tx;
			rx += this.state.sessions[k].rx;
			size ++;
		}

		this.setState({
			activeDevice: newDevice,
			tx: tx,
			rx: rx,
			size: size,
			showDevicesDropdown: false}, () => this.updateSearch(this.time));
	}

	renderDeviceSelector() {
		let devices = [
			<div className="device" key="all" onClick={() => this.changeDevice(0)}>All Devices</div>
		];

		for(let k in this.state.devices) {
			devices.push(<div key={this.state.devices[k].device_id} className="device" onClick={() => this.changeDevice(this.state.devices[k])}>
				{this.state.devices[k].device_id}
			</div>);
		}

		return (
			<div className="session_button_container devices">
				<Button type="button" className={'calendar_button'} onClick={() => this.setState({showDevicesDropdown: !this.state.showDevicesDropdown})}>
					<IconPhone width="24" height="24" />
					<span>{this.state.activeDevice.device_id || 'All devices'}</span>
					<div className="arrow"><IconPlay width="24" height="24" /></div>
				</Button>
				<div className={'sessions_devices_drop' + (this.state.showDevicesDropdown?' opened':'')}>
					{devices}
				</div>
			</div>
		);
	}
}

export default connect<any, any, Props>(
	state => ({
		subscriber: state.subscriber
	}),
	({
		getSessions: actions.getSessions
	})
)(SubscriberSessions);