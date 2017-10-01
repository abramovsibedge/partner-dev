import * as React from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import * as actions from '../../../../reducers/subscriber/actions';

import {
	IconLock
} from '../../../../components/icons'
import {Button} from '../../../../components/button';

import {
	Form,
	FormRow,
	Input,
	Select
} from '../../../../components/form';

interface Props {
	data: any
	modifySubscriber?: (id: any, data: any) => void
	loadingState?: any
	getTraffic?: (data: any) => void
}

interface State {
	subscriber: any,
	showModal: boolean,
	modalObject: object,
	licencesList: any,
}

class SubscriberModify extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.data,
			showModal: false,
			licencesList: [],
			modalObject: {
				extref: {
					value: props.data.extref,
					valid: true,
					check: new RegExp('^\\w+$')
				},
				licence: {
					value: props.data.bundle.id,
					valid: true,
					check: new RegExp('^[0-9]+$')
				},
				name: {
					value: props.data.name,
					valid: true,
					check: new RegExp('^\\w+$')
				},
				message: ''
			}
		};
	}

	componentWillReceiveProps(props: any) {
		this.fetchLicence(props.subscribers.licenses);
	}

	fetchLicence(licenses: any) {
		let licenceList = [];
		for(let k in licenses) {
			licenceList.push({
				value: licenses[k].id,
				label: licenses[k].name
			});
		}

		this.setState({licencesList: licenceList});
	}

	showModal(state: boolean) {
		this.setState({showModal: state});
	}

	submitForm() {
		let object = this.state.modalObject;

		let valid = true;
		for(let k in object) {
			if(!object[k] || typeof (object[k]) !== 'object' || !object[k].check) continue;

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

		let subscriber = {
			extref: object['extref'].value,
			name: object['name'].value,
			license_id: object['licence'].value,
		};

		this.props.loadingState(true)
			.then(() => {
				this.props.modifySubscriber(this.state.subscriber.id, subscriber);
			})
			.then(() => {
				this.props.getTraffic(this.state.subscriber.id)
			});
	}

	inputHandler(value: string, stateItem: string) {
		let newState = this.state.modalObject;
		newState[stateItem].value = value;

		this.setState({modalObject: newState});
	}

	render() {
		const {
			showModal,
			modalObject
		} = this.state;

		return (
			<div className="subscriber_manage-button">
				<Button type="button" className="subscriber_manage_item subscriber_manage_item-enable" onClick={() => this.showModal(true)}>
					<IconLock width="24" height="24"/>
					<span>Modify subscriber</span>
				</Button>
				<Modal
					isOpen={showModal}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Modify subscriber</h2>
					</div>
					<Form submit={() => this.submitForm()} className="modal_form">
						<div className="modal_error">{modalObject['message']}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Username"
									value={modalObject['name'].value}
									notValid={!modalObject['name'].valid}
									onChange={(e) => this.inputHandler(e.target.value, 'name')}>
								</Input>
							</FormRow>
							<FormRow>
								<Select
									value={modalObject['licence'].value}
									notValid={!modalObject['licence'].valid}
									options={this.state.licencesList}
									onChange={(e) => this.inputHandler(e.target.value, 'licence')}>
									Licence
								</Select>
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="Extref"
									value={modalObject['extref'].value}
									notValid={!modalObject['extref'].valid}
									onChange={(e) => this.inputHandler(e.target.value, 'extref')}>
								</Input>
							</FormRow>
						</div>
						<div className="modal_footer">
							<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showModal(false)}>Cancel</button>
							<button className="modal_btn modal_btn-submit" type="submit">Modify subscriber</button>
						</div>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect<any, any, Props>(
	state => ({
		subscribers: state.subscribers,
		subscriber: state.subscriber
	}),
	({
		modifySubscriber: actions.modifySubscriber,
		loadingState: actions.loadingState,
		getTraffic: actions.getTraffic
	})
)(SubscriberModify);