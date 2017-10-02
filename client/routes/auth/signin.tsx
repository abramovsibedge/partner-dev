import * as React from 'react';
import * as update from 'immutability-helper';
import { connect } from 'react-redux';
import {Link, hashHistory} from 'react-router';

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

import * as model from '../../reducers/signin/model';
import * as actions from '../../reducers/signin/actions';

interface State {
	login: string
	password: string
	valid: boolean,
	message: string
}

interface Props {
	signInModel: model.SignInModel;
	actionSignIn: (email: string, password: string)=>void;
}

class Signin extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			login: '',
			password: '',
			valid: true,
			message: ''
		}
	}

	componentDidMount() {
		if (!this.props.signInModel.statusAuth) {
			this.setState(update(this.state, {
				message: {$set: this.props.signInModel.errorMessages}
			}));
		}
	}

	componentWillReceiveProps(nextProps:any) {
		if (!nextProps.signInModel.statusAuth) {
			this.setState(update(this.state, {
				message: {$set: nextProps.signInModel.errorMessages}
			}));
		}
		else {
			hashHistory.push('/subscribers');
		}
	}

	private submitHandler() {
		const $t = this;
		const $state = $t.state;

		let state: boolean = true;
		let message: string = '';

		if (!$state.login || !$state.password) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		$t.setState(update($state, {
			message: {$set: message},
			valid: {$set: state}
		}));

		if (!state && message) return false;

		this.props.actionSignIn($state.login, $state.password);
	}

	private changeHandler(value: string, stateItem: string) {
		let newState = {};
		newState[stateItem] = {$set: value};
		this.setState(update(this.state, newState));
	}

	render() {
		const {
			login,
			password,
			valid,
			message
		} = this.state;

		return (
			<div className="register_content register_signip">
				<div className="register_logo">
					<img className="register_logo_img" src={require('../../static/media/poweredbyhss_light.svg')}
							 alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				<Form submit={() => this.submitHandler()}>
					<div className="register_error-message">{message}</div>

					<div className="register_header">
						<Link className="register_header_link" to="/auth/signup">I don`t have an account</Link>
					</div>

					<FormRow>
						<Input
							type="email"
							label="Email"
							value={login}
							notValid={!valid && !login}
							onChange={(e) => this.changeHandler(e.target.value, 'login')}>
							<IconPerson width="24" height="24"/>
						</Input>
					</FormRow>

					<FormRow>
						<Input
							type="password"
							label="Password"
							value={password}
							notValid={!valid && !password}
							onChange={(e) => this.changeHandler(e.target.value, 'password')}>
							<IconLock width="24" height="24"/>
						</Input>
					</FormRow>

					<div className="register_footer">
						<Link className="register_footer_reset" to="auth/reset">Forgot password</Link>
					</div>

					<div className="form_row register_actions">
						<Button type="submit" className="register_submit">Sign In</Button>
					</div>
				</Form>
			</div>
		);
	}
}

export default connect(
	state => ({
		signInModel: state.signin
	}),
	({
		actionSignIn: actions.actionSignIn
	})
)(Signin);