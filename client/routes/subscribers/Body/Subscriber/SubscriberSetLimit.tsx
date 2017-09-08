import * as React from 'react';
import Modal from 'react-modal';
import Signal from '../../../../functions/Signal';

import {
	IconPen
} from '../../../../components/icons'
import {Button} from '../../../../components/button';

import {
	Form,
	FormRow,
	Input,
	Checkbox2 as Checkbox
} from '../../../../components/form';

import {
	deleteTraffic,
	modifyTraffic
} from '../../../../functions/subscribers';

interface Parent {
	subscriber: any
}

interface State {
	subscriber: any,
	showModal: boolean,
	modalObject: object,
};

class SubscriberSetLimit extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.subscriber,
			showModal: false,
			modalObject: {
				limit: {
					value: '',
					valid: true,
					check: new RegExp('^[0-9]+$'),
					canBeEmpty: true
				},
				reset: true,
				unlimited: false,
				message: ''
			}
		};
	}

	showModal(state: boolean) {
		this.setState({showModal: state});
	}

	submitForm() {
		let object = this.state.modalObject;

		let valid = true;
		for(let k in object) {
			if(
				!object[k]
				|| typeof (object[k]) !== 'object'
				|| !object[k].check
				|| (object[k].value === '' && object[k].canBeEmpty)) continue;

			if(!object[k].value || !object[k].value.toString().match(object[k].check)) {
				object[k].valid = false;
				valid = false;
			}
			else {
				object[k].valid = true;
			}
		}

		if(!valid) {
			object['message'] = 'Fill in the highlighted fields.';
			return this.setState({modalObject: object});
		}

		if(this.state.modalObject['unlimited']) {
			return deleteTraffic(this.state.subscriber.id).then((response) => {
				if(response.result !== 'OK') {
					// @todo handle error
					return;
				}

				this.showModal(false);
				Signal.dispatch('subscriberModified', {id: this.state.subscriber.id});
			});
		}

		this.showModal(false);
		modifyTraffic(this.state.subscriber.id, {traffic_limit: this.state.modalObject['limit'].value, reset: (this.state.modalObject['reset']?true:false)}).then((response) => {
			if(response.result !== 'OK') {
				// @todo handle error
				return;
			}

			this.setState({
				modalObject: {
					limit: {
						value: '',
						valid: true
					},
					message: ''
				}
			});

			Signal.dispatch('subscriberModified', {id: this.state.subscriber.id});
		});
	}

	inputHandler(value: string, stateItem: string) {
		let newState = this.state.modalObject;
		newState[stateItem].value = value;

		this.setState({modalObject: newState});
	}

	setVisibility(key: string) {
		let newState  = this.state.modalObject;
		newState[key] = !newState[key];
		this.setState({
			modalObject: newState
		});
	}

	render() {
		return (
			<div className="subscriber_manage-button">
				<Button type="button" className="subscriber_manage_item subscriber_manage_item-enable"
								onClick={() => this.showModal(true)}>
					<IconPen width="24" height="24"/>
					<span>Set limit</span>
				</Button>
				<Modal
					isOpen={this.state.showModal}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Set limit</h2>
					</div>
					<Form submit={() => this.submitForm()} className="modal_form">
						<div className="modal_error">{this.state.modalObject['message']}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Limit"
									value={this.state.modalObject['limit'].value}
									notValid={!this.state.modalObject['limit'].valid}
									onChange={(e) => this.inputHandler(e.target.value, 'limit')}>
								</Input>
							</FormRow>
							<FormRow>
								<Checkbox
									className="subscriber_edit_checkbox"
									checked={this.state.modalObject['reset']}
									label="Trafic reset"
									onChange={() => this.setVisibility('reset')}>&nbsp;</Checkbox>
							</FormRow>
							<FormRow>
								<Checkbox
									className="subscriber_edit_checkbox"
									checked={this.state.modalObject['unlimited']}
									label="Set traffic unlimited"
									onChange={(a) => this.setVisibility('unlimited')}>&nbsp;</Checkbox>
							</FormRow>
						</div>
						<div className="modal_footer">
							<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showModal(false)}>Cancel</button>
							<button className="modal_btn modal_btn-submit" type="submit">Set limit</button>
						</div>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default SubscriberSetLimit;