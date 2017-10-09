import * as React from 'react';
import * as classNames from 'classnames';
import Modal from 'react-modal';
import * as update from 'immutability-helper';

import { IconClose, IconPlus } from '../../../components/icons';
import {Button} from '../../../components/button';

import {
	Form,
	FormRow,
	Input
} from '../../../components/form';

interface Props {
	auth: any
	deleteAuthMethod: (auth: string) => void
	addAuthMethod: (auth: any) => void
}

interface State {
	stickedTableHead: boolean
	deleteAuthMethodModalState: boolean
	authForDelete: string
	addAuthMethodModalState: boolean
	addAuthMethodObject: any
}

class ProjectAuth extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			stickedTableHead: false,
			deleteAuthMethodModalState: false,
			authForDelete: '',
			addAuthMethodModalState: false,
			addAuthMethodObject: {
				name: '',
				settings: '',
				validationState: true,
				message: ''
			}
		}
	}

	componentDidMount() {
		window && window.addEventListener('scroll', this.stickTableHead);
	}

	componentWillUnmount() {
		window && window.removeEventListener('scroll', this.stickTableHead);
	}

	stickTableHead = () => {
		let {stickedTableHead} = this.state;

		window && window.scrollY > 240 ?
			!stickedTableHead && this.setState({stickedTableHead: true})
			:
			stickedTableHead && this.setState({stickedTableHead: false});
	};

	toggleModalDelete(state: boolean, auth: string) {
		this.setState({
			deleteAuthMethodModalState: state,
			authForDelete: auth
		});
	}

	deleteAuthMethod(auth: string) {
		this.props.deleteAuthMethod(auth);
		this.toggleModalDelete(false, '');
	}

	toggleModalAdd(state: boolean) {
		this.setState({
			addAuthMethodModalState: state
		});
	}

	addAuthMethodHandler(value: string, type: string) {
		this.setState(update(this.state, {
			addAuthMethodObject: {
				[type]: { $set: value }
			}
		}))
	}

	addAuthMethod() {
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		if (!$state.addAuthMethodObject['name']
			|| !$state.addAuthMethodObject['settings']) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		if ($state.addAuthMethodObject['settings'].match(/^[0-9]+$/)) {
			state = false;
			message += 'Settings field has wrong format';
		}

		try {
			JSON.parse($state.addAuthMethodObject['settings']);
		} catch(e) {
			state = false;
			message += 'Settings field has wrong format';
		}

		$t.setState(update($state, {
			addAuthMethodObject: {
				validationState: {$set: false},
				message: {$set: message}
			}
		}));

		if (!state && message) return false;

		this.props.addAuthMethod(this.state.addAuthMethodObject);
		this.toggleModalAdd(false);
	}

	render() {
		const { auth } = this.props;
		const {
			stickedTableHead,
			deleteAuthMethodModalState,
			authForDelete,
			addAuthMethodModalState,
			addAuthMethodObject
		} = this.state;

		return (<div>
			<div className="table_prefix">
				<Button type="button" className="project_add-auth" onClick={() => this.toggleModalAdd(true)}>
					<IconPlus width="24" height="24" />
					Add authentication
				</Button>
			</div>
			<div className="table main_table">
				<div className={classNames("table_head", stickedTableHead && "table_head_sticked")}>
					<table>
						<tbody>
						<tr>
							<td style={{width: '90%'}}>Auth method</td>
							<td style={{width: '10%'}}>&nbsp;</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div className="table_body">
					{auth.map((item: any, index: any) => {
						return (<div className={classNames('table_row')} key={index}>
							<div className="table_row_wrapper">
								<div className="table_cell" style={{width: '90%'}}>
									<div className="table_cell_content">{item.auth_method}</div>
								</div>
								<div className="table_cell" style={{width: '10%'}}>
									<div className="table_cell_content">
										<button className="project_user-delete" onClick={() => this.toggleModalDelete(true, item.auth_method)}>
											<IconClose width="24" height="24" />
										</button>
									</div>
								</div>
							</div>
						</div>);
					})}
				</div>

				<Modal
					isOpen={deleteAuthMethodModalState}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Delete auth method</h2>
					</div>
					<div className="modal_content is-text-center">Do you really want to auth method?</div>
					<div className="modal_footer">
						<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.toggleModalDelete(false, '')}>
							Cancel
						</button>
						<button className="modal_btn modal_btn-submit action-button" type="button" onClick={() => this.deleteAuthMethod(authForDelete)}>
							Delete method
						</button>
					</div>
					<Button type="button" className="modal_close" onClick={() => this.toggleModalDelete(false, '')}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>

				<Modal
					isOpen={addAuthMethodModalState}
					className={{base: 'modal_inner'}}
					overlayClassName={{base: 'modal_outer'}}
					contentLabel="test">
					<div className="modal_header">
						<h2>Auth method</h2>
					</div>
					<Form submit={() => this.addAuthMethod()} className="modal_form">
						<div className="modal_error">{addAuthMethodObject['message']}</div>
						<div className="modal_content">
							<FormRow>
								<Input
									type="text"
									label="Method"
									notValid={!addAuthMethodObject['validationState'] && !addAuthMethodObject['name']}
									value={addAuthMethodObject.name}
									onChange={(e)=>{this.addAuthMethodHandler(e.target.value, 'name')}} />
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="Settings"
									notValid={!addAuthMethodObject['validationState'] && !addAuthMethodObject['settings']}
									value={addAuthMethodObject.settings}
									onChange={(e)=>{this.addAuthMethodHandler(e.target.value, 'settings')}}/>
							</FormRow>
						</div>
						<div className="modal_footer">
							<button type="button" className="modal_btn modal_btn-reset" onClick={() => this.toggleModalAdd(false)}>
								Cancel
							</button>
							<button type="submit" className="modal_btn modal_btn-submit" >
								Add method
							</button>
						</div>
					</Form>
					<Button
						type="button"
						className="modal_close"
						onClick={() => this.toggleModalAdd(false)}>
						<IconClose width="24" height="24"/>
					</Button>
				</Modal>
			</div>
		</div>);
	}
}

export default ProjectAuth;