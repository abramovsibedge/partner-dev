import * as React from 'react';
import Modal from 'react-modal';
import * as update from 'immutability-helper';

import Signal from '../../../functions/Signal';

import {
	IconPlus,
	IconClose,
} from '../../../components/icons';

import {
	Form,
	FormRow,
	Input,
	Select
} from '../../../components/form';
import { Button } from '../../../components/button';

import {
	addSubscriber,
	getLicences
} from '../../../functions/subscribers';

interface State {
	showModal: boolean,
	addObject: object,
	licencesList: any
};

class AddSubscriber extends React.Component<{}, State>{
	constructor(props: any) {
		super(props);

		this.state = {
			showModal: false,
			licencesList: [],
			addObject: {
				extref: {
					value: '',
					valid: true,
					check: new RegExp('^\\w+$')
				},
				licence: {
					value: '',
					valid: true,
					check: new RegExp('^[0-9]+$')
				},
				username: {
					value: '',
					valid: true,
					check: new RegExp('^\\w+$')
				},
				oauth_token: {
					value: '',
					valid: true,
					check: new RegExp('^\\w+$')
				},
				message: ''
			}
		};

		Signal.attach('projectChanged', () => {this.fetchLicence()})
	}

	componentDidMount() {
		this.fetchLicence();
	}

	fetchLicence() {
		getLicences().then((result) => {
			if(!result || !result.result || result.result !== 'OK' || !result.licenses) {
				return;
			}

			let licenceList = [];
			for(let k in result.licenses) {
				licenceList.push(
					{
						value: result.licenses[k].id,
						label: result.licenses[k].name
					}
				);
			}

			this.setState(update(
				this.state, {
					licencesList: {$set: licenceList}
				}
			));
		});
	}

	showAddSubscriber(value: boolean) {
		this.setState(update(this.state, {
			showModal: { $set: value },
		}));
	}

	addSubscriberSubmit() {
		let object = this.state.addObject;

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
			return this.setState(update(this.state, {
				addObject: {$set: object}
			}));
		}

		let subscriber = {
			extref: object['extref'].value,
			username: object['username'].value,
			license_id: object['licence'].value,
			oauth_token: object['oauth_token'].value
		};

		addSubscriber(subscriber).then((response) => {
			if(response.result !== 'OK') {
				// @todo handle error
				return;
			}

			this.showAddSubscriber(false);
		});
	}

	addSubscriberHandler(value: string, stateItem: string) {
		let newState = {};
		newState['addObject'] = {
			[stateItem]: {
				'value': {
					$set: value
				}
			}
		};
		this.setState(update(this.state, newState));
	}

	render() {
		return (
			<div className="header_toolbar">
				<div className="header_toolbar_content">
					<div className="project_filter">
						<Button type="submit" className="is-transparent" onClick={() => this.showAddSubscriber(true)}>
							<IconPlus width="24" height="24" />
							<span>Add subscriber</span>
						</Button>
						<Modal
							isOpen={this.state.showModal}
							className={{base: 'modal_inner'}}
							overlayClassName={{base: 'modal_outer'}}
							contentLabel="test">
							<div className="modal_header">
								<h2>Create subscriber</h2>
							</div>
							<Form submit={() => this.addSubscriberSubmit()} className="modal_form">
								<div className="modal_error">{this.state.addObject['message']}</div>
								<div className="modal_content">
									<FormRow>
										<Input
											type="text"
											label="Username"
											value={this.state.addObject['username'].value}
											notValid={!this.state.addObject['username'].valid}
											onChange={(e) => this.addSubscriberHandler(e.target.value, 'username')}>
										</Input>
									</FormRow>
									<FormRow>
										<Input
											type="text"
											label="OAuth token"
											value={this.state.addObject['oauth_token'].value}
											notValid={!this.state.addObject['oauth_token'].valid}
											onChange={(e) => this.addSubscriberHandler(e.target.value, 'oauth_token')}>
										</Input>
									</FormRow>
									<FormRow>
										<Select
											value={this.state.addObject['licence'].value}
											notValid={!this.state.addObject['licence'].valid}
											options={this.state.licencesList}
											onChange={(e) => this.addSubscriberHandler(e.target.value, 'licence')}>
											Licence
										</Select>
									</FormRow>
									<FormRow>
										<Input
											type="text"
											label="Extref"
											value={this.state.addObject['extref'].value}
											notValid={!this.state.addObject['extref'].valid}
											onChange={(e) => this.addSubscriberHandler(e.target.value, 'extref')}>
										</Input>
									</FormRow>
								</div>
								<div className="modal_footer">
									<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showAddSubscriber(false)}>Cancel</button>
									<button className="modal_btn modal_btn-submit" type="submit">Create subscriber</button>
								</div>
							</Form>
							<Button type="button" className="modal_close" onClick={() => this.showAddSubscriber(false)}>
								<IconClose width="24" height="24" />
							</Button>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

export default AddSubscriber;