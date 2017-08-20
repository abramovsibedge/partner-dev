import * as React from 'react';
import * as update from 'immutability-helper';

import {
	Form,
	FormRow,
	Input } from '../../components/form';
import { Button } from '../../components/button';
import {
	IconPerson
} from '../../components/icons';
import { emailValidation } from '../../utils';

interface State {
	inProgress: boolean
	email: string
	validationState: boolean
	formMessage: string
}

export class Reset extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			inProgress: false,
			email: "",
			validationState: true,
			formMessage: ''
		}
	}

	private submitHandler() {
		this.setState(update(this.state, {
			inProgress: { $set: true }
		}));

		let state: boolean = true;
		let message: string = '';

		if (!this.state.email || !emailValidation(this.state.email)) {
			state = false;
			message += 'Email not valid.';
		}

		this.setState(update(this.state, {
			formMessage: { $set: message },
			validationState: { $set: state }
		}));

		if (!state && message) return false;

		this.setState(update(this.state, {
			inProgress: { $set: false }
		}));

		console.log( 123 );
	}

	private changeHandler(value: string, stateItem: string) {
		let newState = {};
		newState[stateItem] = { $set: value } ;
		this.setState(update(this.state, newState));
	}

	render() {
		const {
			inProgress,
			email,
			validationState,
			formMessage
		} = this.state;

		return (
			<div className="register_content register_signip">
				<div className="register_logo">
					<img className="register_logo_img" src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				<Form submit={() => this.submitHandler()}>
					<div className="register_error-message">{formMessage}</div>

					<div className="register_header">
						<a className="register_header_link" href="/auth/signup">I don`t have an account</a>
					</div>

					<FormRow>
						<Input
							type="email"
							label="Email"
							value={email}
							notValid={!validationState && (!email || !emailValidation(email))}
							onChange={(e) => this.changeHandler(e.target.value, 'email')}>
							<IconPerson width="24" height="24" />
						</Input>
					</FormRow>

					<div className="form_row register_actions">
						<Button loading={inProgress} type="submit" className="register_submit">Reset password</Button>
					</div>
				</Form>
			</div>
		);
	}
}