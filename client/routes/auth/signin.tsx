import * as React from 'react';
import * as update from 'immutability-helper';
import { connect } from 'react-redux';

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

// TODO delete functions
import {signIn} from '../../functions/auth';

import * as model from '../../reducers/auth/model';
import * as actions from '../../reducers/auth/actions';

interface State {
	login: string
	password: string
	valid: boolean,
	message: string
}

interface Props {
    authmodel: model.AuthModel;
    changeStatusSignIn: (authmodel:string)=>void;
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
		this.props.changeStatusSignIn('ololo');
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

		signIn($state.login, $state.password)
			.then((response) => {
				if (response && response.type === 'error') {
					throw {message: response.error}
				} else {
					window.location.replace("/projects");
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

        const {authmodel} = this.props;
        console.log('mainmodel', authmodel);


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
						<a className="register_header_link" href="/auth/signup">I don`t have an account</a>
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
						<a className="register_footer_reset" href="/auth/reset">Forgot password</a>
					</div>

					<div className="form_row register_actions">
						<Button type="submit" className="register_submit">Sign Up</Button>
					</div>
				</Form>
			</div>
		);
	}
}

export default connect(
    state => ({
        authmodel: state.auth
    }),
    ({
        changeStatusSignIn: actions.changeStatusSignIn
    })
)(Signin);