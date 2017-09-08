import * as React from 'react';
import Modal from 'react-modal';
import Signal from '../../../../functions/Signal';

import {
	IconClose,
	IconDelete,
	IconPlay
} from '../../../../components/icons'
import {Button} from '../../../../components/button';

import {
	modifySubscriber
} from '../../../../functions/subscribers';

interface Parent {
	subscriber: any
};

interface State {
	showModal: boolean,
	subscriber: any
};

class SubscriberChangeStatus extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			showModal: false,
			subscriber: props.subscriber
		};
	}

	componentWillReceiveProps(props: any) {
		this.setState({subscriber: props.subscriber});
	}

	showModal(state: boolean) {
		this.setState({showModal: state});
	}

	changeStatus(status: number) {
		this.setState({showModal: false});
		modifySubscriber(this.state.subscriber.id, {condition: status}).then(response => {
			if(response.result === 'OK') {
				Signal.dispatch('subscriberModified', {id: this.state.subscriber.id});
			}
		});
	}

	render() {
		let action = (this.state.subscriber.condition===0)?['Disable', 'disable', 1]:['Enable', 'enable', 0];

		return (
			<div className="subscriber_manage-button">
				{(action[2]===1)?
					<Button type="button" className="subscriber_manage_item subscriber_manage_item-disable"
									onClick={() => this.showModal(true)}>
						<IconDelete width="24" height="24"/>
						<span>{action[0]} subscriber</span>
					</Button>:
					<Button type="button" className="subscriber_manage_item subscriber_manage_item-enable"
									onClick={() => this.showModal(true)}>
						<IconPlay width="24" height="24"/>
						<span>{action[0]} subscriber</span>
					</Button>}
				<Modal
					isOpen={this.state.showModal}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>{action[0]} subscriber</h2>
					</div>
					<div className="modal_content is-text-center">Do you really want to {action[1]} subscriber?</div>
					<div className="modal_footer">
						<button className="modal_btn modal_btn-reset" type="button"
										onClick={() => this.showModal(false)}>Cancel
						</button>
						<button className="modal_btn modal_btn-submit" type="button"
										onClick={() => this.changeStatus(Number(action[2]))}>{action[0]} subscriber
						</button>
					</div>
					<Button type="button" className="modal_close"
									onClick={() => this.showModal(false)}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>
			</div>
		);
	}
}

export default SubscriberChangeStatus;