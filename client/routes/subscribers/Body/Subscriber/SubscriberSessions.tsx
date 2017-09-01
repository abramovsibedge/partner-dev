import * as React from 'react';
import Loading from '../../Loading';
import {Button} from "../../../../components/button/index";
import Calendar from "./Calendar";

import {
	IconPhone,
	IconPlay
} from '../../../../components/icons'

import {
	getSessions,
	dateString,
	byteConvert,
	getDevices
} from '../../../../functions/subscribers';

interface Parent {
	subscriber: any
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

class SubscriberSessions extends React.Component<Parent, State> {
	time: any;
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.subscriber,
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

	componentDidMount() {
		getDevices(this.state.subscriber.id).then((response) => {
			/*response.devices = [
				{
					type: "Mobile",
					device_id: 1359,
					name: "Test mobile 1",
					registration_time: 1504011677525,
					connection_time: 1504111677525
				},
				{
					type: "Mobile 2",
					device_id: 18654,
					name: "Test mobile 2",
					registration_time: 1503011677525,
					connection_time: 1503111677525
				},
				{
					type: "Mobile",
					device_id: 135987,
					name: "Test mobile 3",
					registration_time: 1502011677525,
					connection_time: 1502111677525
				}
			];*/

			this.setState({
				devices: response.devices
			});
		});
	}

	updateSearch(time: any) {
		this.time = time;

		this.setState({loaded: false});
		getSessions(this.state.subscriber.id, {start_time: this.time.from[0], end_time: this.time.till[0]}).then(response => {
			/*response.sessions = [
				{
					"user_id": 123,
					"device_id": "123213",
					"server": "asdkasd",
					"start_time": 123761723123,
					"end_time": 123762723123,
					"client_address": "asdasdasljdk",
					"internal_address": "lakidssa;ld;s'ad",
					"tx": 12323388,
					"rx": 6863513
				},
				{
					"user_id": 123,
					"device_id": "123213",
					"server": "asdkasd",
					"start_time": 123761723123,
					"end_time": 123762723123,
					"client_address": "asdasdasljdk",
					"internal_address": "lakidssa;ld;s'ad",
					"tx": 867432,
					"rx": 16565232
				},
				{
					"user_id": 123,
					"device_id": "123213",
					"server": "asdkasd",
					"start_time": 123761723123,
					"end_time": 123762723123,
					"client_address": "asdasdasljdk",
					"internal_address": "lakidssa;ld;s'ad",
					"tx": 1561321321,
					"rx": 6874321
				}
			];*/

			let tx = 0, rx = 0;

			for(let k in response.sessions) {
				tx += response.sessions[k].tx;
				rx += response.sessions[k].rx;
			}

			this.setState({
				loaded: true,
				sessions: response.sessions,
				tx: tx,
				rx: rx,
				size: response.sessions.length
			});
		});
	}

	render() {
		return (
			<div className="subscriber_body_content">
				<div className="session_filter">
					<Calendar
						updateSearch={this.updateSearch.bind(this)}
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
						<p>Subscriber has no sessions from <span>All Devices</span> between<br /><span>{this.time.from[1]} - {this.time.till[1]}<span></span></span></p>
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
					<p>Subscriber has {this.state.size} sessions from <span>{this.state.activeDevice===0?'All Devices':this.state.activeDevice.name}</span> between<br /><span>{this.time.from[1]} - {this.time.till[1]}<span></span></span></p>
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

		this.setState({activeDevice: newDevice, tx: tx, rx: rx, size: size, showDevicesDropdown: false});
	}

	renderDeviceSelector() {
		let devices = [
			<div className="device" key="all" onClick={() => this.changeDevice(0)}>All Devices</div>
		];
		for(let k in this.state.devices) {
			devices.push(<div key={this.state.devices[k].device_id} className="device" onClick={() => this.changeDevice(this.state.devices[k])}>{this.state.devices[k].name}</div>);
		}

		return (
			<div className="session_button_container devices">
				<Button type="button" className={'calendar_button'} onClick={() => this.setState({showDevicesDropdown: !this.state.showDevicesDropdown})}>
					<IconPhone width="24" height="24" />
					<span>All Devices</span>
					<div className="arrow"><IconPlay width="24" height="24" /></div>
				</Button>
				<div className={'sessions_devices_drop' + (this.state.showDevicesDropdown?' opened':'')}>
					{devices}
				</div>
			</div>
		);
	}
}

export default SubscriberSessions;