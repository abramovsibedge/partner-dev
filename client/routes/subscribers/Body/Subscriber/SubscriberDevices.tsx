import * as React from 'react';
import Modal from 'react-modal';
import Loading from '../../Loading';
import { connect } from 'react-redux';
import * as actions from '../../../../reducers/subscriber/actions';

import {
	getDevices,
	deleteDevice,
	dateString
} from '../../../../functions/subscribers';

import {
	IconClose,
	IconDelete,
} from '../../../../components/icons'
import {Button} from '../../../../components/button';

interface Props {
	subscriber?: any
	data: any,
	deleteDevice?: (id: any, params: any) => void
}

interface State {
	subscriber: any,
	devices: any,
	showModal: boolean,
	loaded: boolean
}

class SubscriberDevices extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.data,
			loaded: false,
			devices: [],
			showModal: false
		};
	}

	componentDidMount() {
		this.getDevices();
	}

	// componentWillReceiveProps(props: any) {
	// 	this.setState({
	// 		subscriber: props.data,
	// 		loaded: false
	// 	});
	//
	// 	this.getDevices();
	// }

	getDevices() {
		this.setState({
			loaded: true,
			devices: this.props.subscriber.devices
		});

		// getDevices(this.state.subscriber.id).then((response) => {
		// 	/*response.devices = [
		// 		{
		// 			type: "Mobile",
		// 			device_id: 1359,
		// 			name: "Test mobile 1",
		// 			registration_time: 1504011677525,
		// 			connection_time: 1504111677525
		// 		},
		// 		{
		// 			type: "Mobile 2",
		// 			device_id: 18654,
		// 			name: "Test mobile 2",
		// 			registration_time: 1503011677525,
		// 			connection_time: 1503111677525
		// 		},
		// 		{
		// 			type: "Mobile",
		// 			device_id: 135987,
		// 			name: "Test mobile 3",
		// 			registration_time: 1502011677525,
		// 			connection_time: 1502111677525
		// 		}
		// 	]; */
		//
		// 	this.setState({
		// 		loaded: true,
		// 		devices: response.devices
		// 	});
		// });
	}

	showModal(state: boolean) {
		this.setState({
			showModal: state
		});
	}

	deletePurchase(id: number) {
		this.setState({
			loaded: false,
			showModal: false
		});

		this.props.deleteDevice(this.props.data.id, id);

		// deleteDevice(this.state.subscriber.id, id).then(() => {
		// 	this.getDevices();
		// });
	}

	render() {
		if(!this.state.loaded) {
			return (
				<div id="devices" className="subscriber_tab subscriber_tab-active">
					<div className="subscriber_tab_content">
						<div className="subscriber_tabs_empty"><Loading/></div>
					</div>
				</div>
			);
		}

		if(this.state.devices.length === 0) {
			return (
				<div id="devices" className="subscriber_tab subscriber_tab-active">
					<div className="subscriber_tab_content">
						<div className="subscriber_tabs_empty"><p>Subscriber has no devices.</p></div>
					</div>
				</div>
			);
		}

		let content = [];
		for(let k in this.state.devices) {
			let device = this.state.devices[k];

			content.push(
				<div className="table_row" key={k}>
					<div className="table_row_wrapper">
						<div className="table_cell" style={{width: '16.9%'}}>
							<div className="table_cell_content">{device.device_id}</div>
						</div>
						<div className="table_cell" style={{width: '13%'}}>
							<div className="table_cell_content">{device.name}</div>
						</div>
						<div className="table_cell" style={{width: '19.5%'}}>
							<div className="table_cell_content">{device.type}</div>
						</div>
						<div className="table_cell" style={{width: '22%'}}>
							<div className="table_cell_content">{dateString(device.registration_time)}</div>
						</div>
						<div className="table_cell" style={{width: '22%'}}>
							<div className="table_cell_content">{dateString(device.connection_time)}</div>
						</div>

						<div className="table_cell" style={{width: '6.5%'}}>
							<div className="table_cell_content">
								<Button type="button" className="subscriber_manage_item subscriber_manage_item-disable"
												onClick={() => this.showModal(true)}>
									<IconDelete width="24" height="24"/>
								</Button>
								<Modal
									isOpen={this.state.showModal}
									className={{base: 'modal_inner'}}
									overlayClassName={{base: 'modal_outer'}}
									contentLabel="test">
									<div className="modal_header">
										<h2>Delete device</h2>
									</div>
									<div className="modal_content is-text-center">Do you really want to delete device?</div>
									<div className="modal_footer">
										<button className="modal_btn modal_btn-reset" type="button"
														onClick={() => this.showModal(false)}>Cancel
										</button>
										<button className="modal_btn modal_btn-submit" type="button"
														onClick={() => this.deletePurchase(device.device_id)}>Delete device
										</button>
									</div>
									<Button type="button" className="modal_close"
													onClick={() => this.showModal(false)}>
										<IconClose width="24" height="24"/>
									</Button>
								</Modal>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div id="devices" className="subscriber_tab subscriber_tab-active">
				<div className="table inner_table">
					<div className="table_head">
						<table>
							<tbody>
							<tr>
								<td style={{width: '16.9%'}}>Device ID</td>
								<td style={{width: '13%'}}>Name</td>
								<td style={{width: '19.5%'}}>Device type</td>
								<td style={{width: '22%'}}>Registration time</td>
								<td style={{width: '22%'}}>Connection time</td>
								<td style={{width: '6.5%'}}></td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="table_body">
						{content}
					</div>
				</div>
			</div>
		);
	}
}

// export default SubscriberDevices;

export default connect<any, any, Props>(
	state => ({
		subscriber: state.subscriber
	}),
	({
		deleteDevice: actions.deleteDevice
	})
)(SubscriberDevices);