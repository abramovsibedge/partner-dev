import * as React from 'react';
import * as update from 'immutability-helper';

import {signIn} from '../../functions/auth';

import {
	Form,
	FormRow,
	Input
} from '../../components/form';
import {Button} from '../../components/button';
import {
	IconPerson,
	IconLock
} from '../../components/icons';

interface State {
	inProgress: boolean
	login: string
	password: string
	validationState: boolean,
	formMessage: string
}

export default class Signin extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			inProgress: false,
			login: "",
			password: "",
			validationState: true,
			formMessage: ''
		}
	}

	private submitHandler() {
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		$t.setState(update($state, {
			inProgress: {$set: true}
		}), () => {
			if (!$state.login || !$state.password) {
				state = false;
				message += 'Fill in the highlighted fields.';
			}

			$t.setState(update($state, {
				formMessage: {$set: message},
				validationState: {$set: state},
				inProgress: {$set: false}
			}));

			if (!state && message) return false;

			signIn($state.login, $state.password)
				.then((e) => {
					if (e.type == 'error') {
						throw {message: e.error.message}
					} else {
						window.location.replace("/projects");
					}
				})
				.catch((e) => {
					$t.setState(update($state, {
						formMessage: {$set: e.message},
						inProgress: {$set: false}
					}));
				})

		});
	}

	private changeHandler(value: string, stateItem: string) {
		let newState = {};
		newState[stateItem] = {$set: value};
		this.setState(update(this.state, newState));
	}

	render() {
		const {
			inProgress,
			login,
			password,
			validationState,
			formMessage
		} = this.state;

		return (
			<div className="register_content register_signip">
				<div className="register_logo">
					<img className="register_logo_img" src={require('../../static/media/poweredbyhss_light.svg')}
							 alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				<Form submit={() => this.submitHandler()}>
					<div className="register_error-message">{formMessage}</div>

					<div className="register_header">
						<a className="register_header_link" href="/auth/signup">I don`t have an account</a>
					</div>

					<FormRow>
						<Input
							type="text"
							label="Login"
							value={login}
							notValid={!validationState && !login}
							onChange={(e) => this.changeHandler(e.target.value, 'login')}>
							<IconPerson width="24" height="24"/>
						</Input>
					</FormRow>

					<FormRow>
						<Input
							type="text"
							label="Password"
							value={password}
							notValid={!validationState && !password}
							onChange={(e) => this.changeHandler(e.target.value, 'password')}>
							<IconLock width="24" height="24"/>
						</Input>
					</FormRow>

					<div className="register_footer">
						<a className="register_footer_reset" href="/auth/reset">Forgot password</a>
					</div>

					<div className="form_row register_actions">
						<Button loading={inProgress} type="submit" className="register_submit">Sign Up</Button>
					</div>
				</Form>
			</div>
		);
	}
}