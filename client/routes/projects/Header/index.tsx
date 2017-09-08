import * as React from 'react';
import Modal from 'react-modal';
import * as update from 'immutability-helper';

import {
	IconPlus,
	IconClose
} from '../../../components/icons'

import {
	Form,
	FormRow,
	Input,
	Select
} from '../../../components/form';
import {Button} from '../../../components/button';

import {
	addProject
} from '../../../functions/projects';

interface Props {
	onUpdate: () => void
}

interface State {
	addProjectModalState: boolean
	addProjectObject: object
	productTypes: any
}

class Header extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			addProjectModalState: false,
			addProjectObject: {
				public_key: '',
				private_key: '',
				description: '',
				project_type: '',
				validationState: true,
				message: ''
			},
			productTypes: [{
				value: "proxy",
				label: "Proxy"
			}, {
				value: "public_vpn",
				label: "Public VPN"
			}, {
				value: "private_vpn",
				label: "Private VPN"
			}],
		}
	}

	showAddProject = (value: boolean) => {
		this.setState(update(this.state, {
			addProjectModalState: {$set: value},
		}));
	};

	addProjectHandler = (value: string, stateItem: string) => {
		let newState = {};
		newState['addProjectObject'] = {[stateItem]: {$set: value}};
		this.setState(update(this.state, newState));
	};

	addProjectSubmit = () => {
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		if (!$state.addProjectObject['public_key'] || !$state.addProjectObject['project_type']) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		$t.setState(update($state, {
			addProjectObject: {
				validationState: {$set: false},
				message: {$set: message}
			}
		}));

		if (!state && message) return false;

		addProject($state.addProjectObject)
			.then((response) => {
				if (response.result !== "OK") {
					throw response.error;
				}

				$t.setState(update($state, {
					addProjectObject: {
						public_key: {$set: ''},
						private_key: {$set: ''},
						project_type: {$set: ''},
						description: {$set: ''},
						validationState: {$set: true},
						message: {$set: ''}
					},
					addProjectModalState: {$set: false}
				}), () => this.props.onUpdate());
			})
			.catch((error) => {
				$t.setState(update($state, {
					addProjectObject: {
						message: {$set: error.toString()}
					}
				}));
			});
	};

	render() {
		const {
			addProjectModalState,
			addProjectObject,
			productTypes
		} = this.state;

		return (
			<div>
				<Button type="submit" className="is-transparent" onClick={() => this.showAddProject(true)}>
					<IconPlus width="24" height="24"/>
					<span>Add project</span>
				</Button>
				<Modal
					isOpen={addProjectModalState}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Create project</h2>
					</div>
					<Form submit={() => this.addProjectSubmit()} className="modal_form">
						<div className="modal_error">{addProjectObject['message']}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Public Key"
									value={addProjectObject['public_key']}
									notValid={!addProjectObject['validationState'] && !addProjectObject['public_key']}
									onChange={(e) => this.addProjectHandler(e.target.value, 'public_key')}>
								</Input>
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="Private Key"
									value={addProjectObject['private_key']}
									onChange={(e) => this.addProjectHandler(e.target.value, 'private_key')}>
								</Input>
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="Description"
									value={addProjectObject['description']}
									onChange={(e) => this.addProjectHandler(e.target.value, 'description')}>
								</Input>
							</FormRow>
							<FormRow>
								<Select
									notValid={!addProjectObject['validationState'] && !addProjectObject['project_type']}
									value={addProjectObject['project_type']}
									options={productTypes}
									onChange={(e) => this.addProjectHandler(e.target.value, 'project_type')}>
									Project type
								</Select>
							</FormRow>
						</div>
						<div className="modal_footer">
							<button className="modal_btn modal_btn-reset" type="button"
											onClick={() => this.showAddProject(false)}>Cancel
							</button>
							<button className="modal_btn modal_btn-submit" type="submit">Create project</button>
						</div>
					</Form>
					<Button type="button" className="modal_close" onClick={() => this.showAddProject(false)}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>
			</div>
		);
	}
}

export default Header;