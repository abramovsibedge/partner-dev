import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import * as update from 'immutability-helper';

import * as actions from '../../../../reducers/subscriber/actions';

import {
	Form,
	FormRow,
	Input,
	Checkbox
} from '../../../../components/form';
import { IconPen } from '../../../../components/icons'
import { Button } from '../../../../components/button';

interface Props {
	data: any
	setLimit?: any
	setLoadingState?: any
	getTraffic?: (data: any) => void
}

interface State {
	showModal: boolean,
	modalObject: object,
}

class SubscriberSetLimit extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
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
		this.setState(update(this.state, {showModal: {$set: state}}));
	}

	submitForm() {
		let object = this.state.modalObject;

		let valid = true;
		for (let k in object) {
			if (object.hasOwnProperty(k)) {
				if(!object[k]
					|| typeof (object[k]) !== 'object'
					|| !object[k].check
					|| (object[k].value === '' && object[k].canBeEmpty)) continue;

				if(!object[k].value
					|| !object[k].value.toString().match(object[k].check)) {
					object[k].valid = false;
					valid = false;
				} else {
					object[k].valid = true;
				}
			}
		}

		if (!valid) {
			object['message'] = 'Fill in the highlighted fields.';
			return this.setState(update(this.state, {
				modalObject: {$set: object}
			}));
		}

		let type: string = this.state.modalObject['unlimited'] ? 'delete' : 'update';

		this.props.setLoadingState(true)
			.then(() => {
				this.props.setLimit(type, this.props.data.id, {
					traffic_limit: this.state.modalObject['limit'].value,
					reset: !!this.state.modalObject['reset']
				}).then(() => this.props.getTraffic(this.props.data.id));
			})
			.then(() => {
				this.setState(update(this.state, {
					modalObject: {
						limit: {
							value: '',
							valid: true
						},
						message: ''
					},
					showModal: {$set: false}
				}));
			});
	}

	inputHandler(value: string, stateItem: string) {
		let newState = this.state.modalObject;
		newState[stateItem].value = value;

		this.setState(update(this.state, {
			modalObject: {$set: newState}
		}));
	}

	setVisibility(key: string) {
		let newState  = this.state.modalObject;
		newState[key] = !newState[key];

		this.setState(update(this.state, {
			modalObject: {$set: newState}
		}));
	}

	render() {
		const {
			showModal,
			modalObject
		} = this.state;

		return (
			<div className="subscriber_manage-button">
				<Button type="button" className="subscriber_manage_item" onClick={() => this.showModal(true)}>
					<IconPen width="24" height="24"/>
					<span>Set limit</span>
				</Button>
				<Modal
					isOpen={showModal}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Set limit</h2>
					</div>
					<Form submit={() => this.submitForm()} className="modal_form">
						<div className="modal_error">{modalObject['message']}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Limit"
									value={modalObject['limit'].value}
									notValid={!modalObject['limit'].valid}
									onChange={(e) => this.inputHandler(e.target.value, 'limit')} />
							</FormRow>
							<FormRow>
								<Checkbox
									className="subscriber_edit_checkbox"
									checked={modalObject['reset']}
									onChange={() => this.setVisibility('reset')}>Trafic reset</Checkbox>
							</FormRow>
							<FormRow>
								<Checkbox
									className="subscriber_edit_checkbox"
									checked={modalObject['unlimited']}
									onChange={(a) => this.setVisibility('unlimited')}>Set traffic unlimited</Checkbox>
							</FormRow>
						</div>
						<div className="modal_footer">
							<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showModal(false)}>
								Cancel
							</button>
							<button className="modal_btn modal_btn-submit" type="submit">
								Set limit
							</button>
						</div>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect<any, any, Props>(
	state => ({}),
	({
		setLimit: actions.setLimit,
		setLoadingState: actions.loadingState,
		getTraffic: actions.getTraffic
	})
)(SubscriberSetLimit);