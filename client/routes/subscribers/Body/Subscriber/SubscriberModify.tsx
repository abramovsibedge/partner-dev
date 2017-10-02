import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as actions from '../../../../reducers/subscriber/actions';
import { getSubscribers } from '../../../../reducers/subscribers/actions';

import {
	Form,
	FormRow,
	Input,
	Select
} from '../../../../components/form';
import { IconLock } from '../../../../components/icons'
import { Button } from '../../../../components/button';

interface Props {
	data: any
	projectsList?: any
	activeProject?: any
	modifySubscriber?: any
	loadingState?: any
	getTraffic?: (data: any) => void
	getSubscribers?: any
}

interface State {
	showModal: boolean,
	modalObject: object,
	licencesList: any,
}

class SubscriberModify extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
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
				this.props.modifySubscriber(this.props.data.id, subscriber)
					.then(() => {
						this.props.getSubscribers(this.props.projectsList[this.props.activeProject]);
						this.props.getTraffic(this.props.data.id);
					})
			})
	}

	inputHandler(value: string, stateItem: string) {
		let newState = this.state.modalObject;
		newState[stateItem].value = value;

		this.setState({modalObject: newState});
	}

	render() {
		const {
			showModal,
			modalObject,
			licencesList
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
									options={licencesList}
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
		projectsList: state.projects.list,
		activeProject: state.subscribers.activeProject,
	}),
	({
		modifySubscriber: actions.modifySubscriber,
		loadingState: actions.loadingState,
		getTraffic: actions.getTraffic,
		getSubscribers: getSubscribers
	})
)(SubscriberModify);