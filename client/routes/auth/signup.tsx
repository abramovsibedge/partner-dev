import * as React from 'react';
import * as classnames from 'classnames/bind';
import * as update from 'immutability-helper';

import {
	Form,
	FormRow,
	FormGroup,
	Input,
	Checkbox,
	Select } from '../../components/form';
import { Button } from '../../components/button';
import {
	IconPerson,
	IconLock
} from '../../components/icons';
import { emailValidation } from '../../utils';

const s = require('../../static/scss/routes/auth.scss');
const cx = classnames.bind(s);

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
	validationState: boolean
}

export class Signup extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			companyName: "",
			email: "",
			password: "",
			passwordAgain: "",
			products: [{
				value: "explore",
				label: "I am just exploring"
			},{
				value: "proxy",
				label: "Proxy - protection for your app only"
			},{
				value: "vpn",
				label: "VPN - protection for the whole OS"
			},{
				value: "other",
				label: "Other"
			}],
			productsSelected: "",
			numberOfUsers: [{
				value: "v1",
				label: "Less than a 100,000"
			},{
				value: "v2",
				label: "More than a 100,000"
			},{
				value: "v3",
				label: "More than 500,000"
			},{
				value: "v4",
				label: "More than a 1,000,000"
			},{
				value: "v5",
				label: "Not a Production App"
			}],
			numberOfUsersSelected: "",
			tos: false,
			validationState: true
		}
	}

	private submitHandler() {
		this.setState(update(this.state, {
			validationState: { $set: false }
		}));
	}

	private changeHandler(value: string, stateItem: string) {
		let newState = {};
		newState[stateItem] = { $set: value } ;
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
			validationState
		} = this.state;

		return (
			<div className={cx('register_signup')}>
				<div className="register_logo">
					<img className={cx('register_logo_img')} src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				<Form submit={() => this.submitHandler()}>
					<div className="register_error-message">test</div>

					<div className="register_header">
						<h1 className="register_header_name">Sign Up</h1>
						<a className="register_header_link" href="/auth/signin">I have an account</a>
					</div>

					<FormGroup>
						<Input
							type="text"
							label="First name"
							value={firstName}
							notValid={!validationState && !firstName}
							onChange={(e) => this.changeHandler(e.target.value, 'firstName')}>
							<IconPerson width="24" height="24" />
						</Input>
						<Input
							type="text"
							label="Last name"
							value={lastName}
							notValid={!validationState && !lastName}
							onChange={(e) => this.changeHandler(e.target.value, 'lastName')}>
							<IconPerson width="24" height="24" />
						</Input>
					</FormGroup>

					<FormRow>
						<Input
							type="text"
							label="Company name"
							value={companyName}
							onChange={(e) => this.changeHandler(e.target.value, 'companyName')}>
							<IconPerson width="24" height="24" />
						</Input>
					</FormRow>

					<br/>

					<FormRow>
						<Input
							type="email"
							label="Email"
							value={email}
							notValid={!validationState && (!lastName || !emailValidation(email))}
							onChange={(e) => this.changeHandler(e.target.value, 'email')}>
							<IconPerson width="24" height="24" />
						</Input>
					</FormRow>

					<FormGroup>
						<Input
							type="password"
							label="Choose password"
							value={password}
							notValid={!validationState && !password}
							onChange={(e) => this.changeHandler(e.target.value, 'password')}>
							<IconLock width="24" height="24" />
						</Input>

						<Input
							type="password"
							label="Repeat password"
							value={passwordAgain}
							notValid={!validationState && !passwordAgain}
							onChange={(e) => this.changeHandler(e.target.value, 'passwordAgain')}>
							<IconLock width="24" height="24" />
						</Input>
					</FormGroup>

					<br/>

					<FormRow>
						<Select
							notValid={!validationState && !productsSelected}
							value={productsSelected}
							options={products}
							onChange={(e) => this.changeHandler(e.target.value, 'productsSelected')}>
							Which product do you want to use first
						</Select>
					</FormRow>

					<FormRow>
						<Select
							notValid={!validationState && !numberOfUsersSelected}
							value={numberOfUsersSelected}
							options={numberOfUsers}
							onChange={(e) => this.changeHandler(e.target.value, 'numberOfUsersSelected')}>
							Number of daily users of your app
						</Select>
					</FormRow>

					<br/>

					<FormRow>
						<Checkbox
							notValid={!validationState && !tos}
							checked={tos}
							onChange={(e) => this.changeHandler(e.target.checked, 'tos')}>
							I agree with <a target="_blank" href="/docs/AnchorFree_Self_Service_Developer_Platform_Terms_of_Service.pdf">TOS</a>
						</Checkbox>
					</FormRow>

					<div className={cx('form_row register_actions')}>
						<Button type="submit" className={cx('register_submit')}>Sign In</Button>
					</div>
				</Form>
			</div>
		);
	}
}