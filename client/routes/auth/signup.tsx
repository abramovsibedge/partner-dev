import * as React from 'react';
import * as update from 'immutability-helper';

import {
	Form,
	FormRow,
	FormGroup,
	Input,
	Checkbox,
	Select
} from '../../components/form';
import {Button} from '../../components/button';
import {
	IconPerson,
	IconLock
} from '../../components/icons';
import {emailValidation} from '../../utils';

import {signUp} from '../../functions/auth';

interface Option {
	value: string
	label: string
}

interface State {
	firstName: string
	lastName: string
	companyName: string
	email: string
	password: string
	passwordAgain: string
	products: Option[]
	productsSelected: string
	numberOfUsers: Option[]
	numberOfUsersSelected: string
	tos: boolean
	valid: boolean,
	message: string,
	success: boolean
}

export class Signup extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			companyName: '',
			email: '',
			password: '',
			passwordAgain: '',
			products: [{
				value: 'explore',
				label: 'I am just exploring'
			}, {
				value: 'proxy',
				label: 'Proxy - protection for your app only'
			}, {
				value: 'vpn',
				label: 'VPN - protection for the whole OS'
			}, {
				value: 'other',
				label: 'Other'
			}],
			productsSelected: '',
			numberOfUsers: [{
				value: 'v1',
				label: 'Less than a 100,000'
			}, {
				value: 'v2',
				label: 'More than a 100,000'
			}, {
				value: 'v3',
				label: 'More than 500,000'
			}, {
				value: 'v4',
				label: 'More than a 1,000,000'
			}, {
				value: 'v5',
				label: 'Not a Production App'
			}],
			numberOfUsersSelected: '',
			tos: false,
			valid: true,
			message: '',
			success: false
		}
	}

	private submitHandler() {
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		if (!$state.firstName
			|| !$state.lastName
			|| !$state.password
			|| !$state.passwordAgain
			|| !$state.productsSelected
			|| !$state.numberOfUsersSelected
			|| !$state.tos) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		if (!emailValidation($state.email)) {
			state = false;
			message += 'Email not valid.'
		}

		if ($state.password !== $state.passwordAgain) {
			state = false;
			message += 'Passwords are not equals.'
		}

		$t.setState(update($state, {
			message: {$set: message},
			valid: {$set: state}
		}));

		if (!state && message) return false;

		signUp($state)
			.then((response) => {
				if (response && response.type === 'error') {
					throw {message: response.error.message}
				} else {
					$t.setState(update($state, {
						success: {$set: true}
					}));
				}
			})
			.catch((error) => {
				$t.setState(update($state, {
					message: {$set: error.message}
				}));
			})
	}

	private changeHandler(value: string, stateItem: string) {
		let newState = {};
		newState[stateItem] = {$set: value};
		this.setState(update(this.state, newState));
	}

	render() {
		const {
			firstName,
			lastName,
			companyName,
			email,
			password,
			passwordAgain,
			products,
			productsSelected,
			numberOfUsers,
			numberOfUsersSelected,
			tos,
			valid,
			message,
			success
		} = this.state;

		return (
			<div className="register_content register_signup">
				<div className="register_logo">
					<img className="register_logo_img" src={require('../../static/media/poweredbyhss_light.svg')}
							 alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				{success && <div className="register_success">
					<p>A confirmation letter was sent to the specified mailbox.<br/>Please confirm your account in order to start
						using the application</p>
					<div className="register_success_actions">
						<a href="/auth/signin">Sign in</a>
						<a href="/">Main page</a>
					</div>
				</div>}
				{!success && <Form submit={() => this.submitHandler()}>
					<div className="register_error-message">{message}</div>

					<div className="register_header">
						<h1 className="register_header_name">Sign Up</h1>
						<a className="register_header_link" href="/auth/signin">I have an account</a>
					</div>

					<FormGroup>
						<Input
							type="text"
							label="First name"
							value={firstName}
							notValid={!valid && !firstName}
							onChange={(e) => this.changeHandler(e.target.value, 'firstName')}>
							<IconPerson width="24" height="24"/>
						</Input>
						<Input
							type="text"
							label="Last name"
							value={lastName}
							notValid={!valid && !lastName}
							onChange={(e) => this.changeHandler(e.target.value, 'lastName')}>
							<IconPerson width="24" height="24"/>
						</Input>
					</FormGroup>

					<FormRow>
						<Input
							type="text"
							label="Company name"
							value={companyName}
							onChange={(e) => this.changeHandler(e.target.value, 'companyName')}>
							<IconPerson width="24" height="24"/>
						</Input>
					</FormRow>

					<br/>

					<FormRow>
						<Input
							type="email"
							label="Email"
							value={email}
							notValid={!valid && (!email || !emailValidation(email))}
							onChange={(e) => this.changeHandler(e.target.value, 'email')}>
							<IconPerson width="24" height="24"/>
						</Input>
					</FormRow>

					<FormGroup>
						<Input
							type="password"
							label="Choose password"
							value={password}
							notValid={!valid && !password || password !== passwordAgain}
							onChange={(e) => this.changeHandler(e.target.value, 'password')}>
							<IconLock width="24" height="24"/>
						</Input>

						<Input
							type="password"
							label="Repeat password"
							value={passwordAgain}
							notValid={!valid && !passwordAgain || password !== passwordAgain}
							onChange={(e) => this.changeHandler(e.target.value, 'passwordAgain')}>
							<IconLock width="24" height="24"/>
						</Input>
					</FormGroup>

					<br/>

					<FormRow>
						<Select
							notValid={!valid && !productsSelected}
							value={productsSelected}
							options={products}
							onChange={(e) => this.changeHandler(e.target.value, 'productsSelected')}>
							Which product do you want to use first
						</Select>
					</FormRow>

					<FormRow>
						<Select
							notValid={!valid && !numberOfUsersSelected}
							value={numberOfUsersSelected}
							options={numberOfUsers}
							onChange={(e) => this.changeHandler(e.target.value, 'numberOfUsersSelected')}>
							Number of daily users of your app
						</Select>
					</FormRow>

					<br/>

					<FormRow>
						<Checkbox
							notValid={!valid && !tos}
							checked={tos}
							onChange={(e) => this.changeHandler(e.target.checked, 'tos')}>
							I agree with <a target="_blank"
															href="/docs/AnchorFree_Self_Service_Developer_Platform_Terms_of_Service.pdf">TOS</a>
						</Checkbox>
					</FormRow>

					<div className="form_row register_actions">
						<Button type="submit" className="register_submit">Sign In</Button>
					</div>
				</Form>}
			</div>
		);
	}
}