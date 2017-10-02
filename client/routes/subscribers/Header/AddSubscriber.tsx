import * as React from 'react';
import * as update from 'immutability-helper';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as actions from '../../../reducers/subscribers/actions';
import * as model from '../../../reducers/subscribers/model';

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

interface Props {
	projectsList: any
	activeProject: any
	loadingState: any
	getLicenses: () => void
	addSubscriber: any
	subscribers: model.subscribersModel
	getSubscribers: (data: any) => void
}

interface State {
	showModal: boolean
	addObject: object
	message: string
	licencesList: any
}

class AddSubscriber extends React.Component<Props, State>{
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
				}
			},
			message: null
		};
	}

	componentWillReceiveProps(nextprops: any) {
		if (nextprops.subscribers.licenses.length === 0) {
			this.props.getLicenses();
		}

		this.fetchLicence(nextprops.subscribers.licenses);
	}

	fetchLicence(list: any) {
		let licenceList = [];

		for(let k in list) {
			licenceList.push({
				value: list[k].id,
				label: list[k].name
			});
		}

		this.setState(update(this.state, {
			licencesList: {$set: licenceList}
		}));
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

		this.props.addSubscriber(subscriber)
			.then((result: any) => {
				if (result.result.type === 'error') {
					this.setState(update(this.state, {
						message: {$set: result.result.reason}
					}));

					return false;
				}

				this.props.loadingState(true)
					.then(() => {
						this.setState(update(this.state, {
							showModal: { $set: false }
						}),() => {
							this.props.getSubscribers(this.props.projectsList[this.props.activeProject]);
						});
					})
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
		const {
			showModal,
			message,
			addObject,
			licencesList
		} = this.state;

		return (
			<div>
				<Button type="submit" className="is-transparent" onClick={() => this.showAddSubscriber(true)}>
					<IconPlus width="24" height="24" />
					<span>Add subscriber</span>
				</Button>
				<Modal
					isOpen={showModal}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Create subscriber</h2>
					</div>
					<Form submit={() => this.addSubscriberSubmit()} className="modal_form">
						<div className="modal_error">{message}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Username"
									value={addObject['username'].value}
									notValid={!addObject['username'].valid}
									onChange={(e) => this.addSubscriberHandler(e.target.value, 'username')}>
								</Input>
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="OAuth token"
									value={addObject['oauth_token'].value}
									notValid={!addObject['oauth_token'].valid}
									onChange={(e) => this.addSubscriberHandler(e.target.value, 'oauth_token')}>
								</Input>
							</FormRow>
							<FormRow>
								<Select
									value={addObject['licence'].value}
									notValid={!addObject['licence'].valid}
									options={licencesList}
									onChange={(e) => this.addSubscriberHandler(e.target.value, 'licence')}>
									Licence
								</Select>
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="Extref"
									value={addObject['extref'].value}
									notValid={!addObject['extref'].valid}
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
		);
	}
}

export default connect(
	state => ({
		projectsList: state.projects.list,
		activeProject: state.subscribers.activeProject,
		subscribers: state.subscribers
	}),
	({
		loadingState: actions.loadingState,
		getLicenses: actions.getLicenses,
		addSubscriber: actions.addSubscriber,
		getSubscribers: actions.getSubscribers
	})
)(AddSubscriber);