import * as React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import * as actions from '../../../../reducers/subscriber/actions';
import { dateString } from '../../../../utils';
import { Button } from '../../../../components/button';

import {
	IconClose,
	IconDelete,
} from '../../../../components/icons'

interface Props {
	data: any,
	subscriber?: any
	deleteDevice?: (id: any, params: any) => void
	setLoadingState?: any
	getDevices?: (data: any) => void
}

interface State {
	showModal: boolean
}

class SubscriberDevices extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			showModal: false
		};
	}

	showModal(state: boolean) {
		this.setState({
			showModal: state
		});
	}

	deleteDevice(id: number) {
		this.props.setLoadingState(true)
			.then(() => this.props.deleteDevice(this.props.data.id, id))
			.then(() => this.props.getDevices(id));
	}

	render() {
		const { subscriber } = this.props;

		let content = [];

		for(let k in subscriber.devices) {
			if (subscriber.devices.hasOwnProperty(k)) {
				let device = subscriber.devices[k];

				content.push(<div className="table_row" key={k}>
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
								<Button type="button" className="subscriber_manage_item subscriber_manage_item-disable" onClick={() => this.showModal(true)}>
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
										<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showModal(false)}>
											Cancel
										</button>
										<button className="modal_btn modal_btn-submit" type="button" onClick={() => this.deleteDevice(device.device_id)}>
											Delete device
										</button>
									</div>
									<Button type="button" className="modal_close" onClick={() => this.showModal(false)}>
										<IconClose width="24" height="24"/>
									</Button>
								</Modal>
							</div>
						</div>
					</div>
				</div>)
			}
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
								<td style={{width: '6.5%'}}>&nbsp;</td>
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

export default connect<any, any, Props>(
	state => ({
		subscriber: state.subscriber
	}),
	({
		deleteDevice: actions.deleteDevice,
		setLoadingState: actions.loadingState,
		getDevices: actions.getDevices
	})
)(SubscriberDevices);