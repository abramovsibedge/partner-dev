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
import * as firebase from 'firebase';

import {reset} from '../../functions/auth';

interface State {
	inProgress: boolean
	email: string
	validationState: boolean
	formMessage: string,
	success: boolean
}

export class Reset extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			inProgress: false,
			email: "",
			validationState: true,
			formMessage: '',
			success: false
		}
	}

	private submitHandler() {
		const $t = this;
		const $state = $t.state;
		const $email = $state.email;
		let state: boolean = true;
		let message: string = '';

		$t.setState(update($state, {
			inProgress: { $set: true }
		}), () => {
			if (!$email || !emailValidation($email)) {
				state = false;
				message += 'Email not valid.';
			}

			$t.setState(update($state, {
				formMessage: { $set: message },
				validationState: { $set: state },
				inProgress: { $set: false }
			}));

			if (!state && message) return false;


            reset($email)
                .then((e) => {
            		if (e.error) {
                        throw e.message;
					}
					else {
                        $t.setState(update($state, {
                            success: { $set: true },
                            inProgress: { $set: false }
                        }));
					}
                })
                .catch((e)=> {
                    $t.setState(update($state, {
                        formMessage: { $set: e },
                        inProgress: { $set: false }
                    }));
                })

		});
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
			formMessage,
			success
		} = this.state;

		return (
			<div className="register_content register_signip">
				<div className="register_logo">
					<img className="register_logo_img" src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				{success && <div className="register_success">
					<p>Reset link sended to your email.</p>
					<div className="register_success_actions">
						<a href="/auth/signin">Sign in</a>
						<a href="/">Main page</a>
					</div>
				</div>}
				{!success && <Form submit={() => this.submitHandler()}>
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
				</Form>}
			</div>
		);
	}
}