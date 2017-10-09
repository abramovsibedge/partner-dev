import * as React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';

import * as actions from '../../../../reducers/subscriber/actions';
import { getSubscribers } from '../../../../reducers/subscribers/actions';

import {
	IconClose,
	IconDelete,
	IconPlay
} from '../../../../components/icons'
import {Button} from '../../../../components/button';

interface Props {
	data: any
	projectsList?: any
	activeProject?: any
	modifySubscriber?: any
	getTraffic?: (data: any) => void
	getSubscribers?: any
}

interface State {
	showModal: boolean
	condition: number
}

class SubscriberChangeStatus extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			showModal: false,
			condition: props.data.condition
		};
	}

	showModal(state: boolean) {
		this.setState({
			showModal: state
		});
	}

	changeStatus(status: number) {
		this.setState(update(this.state, {
			showModal: {$set: false},
			condition: {$set: status}
		}));

		this.props.modifySubscriber(this.props.data.id, { condition: status })
			.then(() => {
				this.props.getSubscribers(this.props.projectsList[this.props.activeProject]);
			})
	}

	render() {
		const {
			condition,
			showModal
		} = this.state;

		let action = condition === 0 ? ['Disable', 'disable', 1] : ['Enable', 'enable', 0];

		return (
			<div className="subscriber_manage-button">
				{action[2] === 1
					? <Button type="button" className="subscriber_manage_item subscriber_manage_item-disable" onClick={() => this.showModal(true)}>
							<IconDelete width="24" height="24"/>
							<span>{action[0]} subscriber</span>
						</Button>
					: <Button type="button" className="subscriber_manage_item subscriber_manage_item-enable" onClick={() => this.showModal(true)}>
							<IconPlay width="24" height="24"/>
							<span>{action[0]} subscriber</span>
						</Button>}
				<Modal
					isOpen={showModal}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>{action[0]} subscriber</h2>
					</div>
					<div className="modal_content is-text-center">Do you really want to {action[1]} subscriber?</div>
					<div className="modal_footer">
						<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showModal(false)}>
							Cancel
						</button>
						<button className="modal_btn modal_btn-submit" type="button" onClick={() => this.changeStatus(Number(action[2]))}>
							{action[0]} subscriber
						</button>
					</div>
					<Button type="button" className="modal_close" onClick={() => this.showModal(false)}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>
			</div>
		);
	}
}

export default connect<any, any, Props>(
	state => ({
		projectsList: state.projects.list,
		activeProject: state.subscribers.activeProject,
	}),
	({
		modifySubscriber: actions.modifySubscriber,
		getTraffic: actions.getTraffic,
		getSubscribers: getSubscribers
	})
)(SubscriberChangeStatus);