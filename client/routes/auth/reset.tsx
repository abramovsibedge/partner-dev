import * as React from 'react';
import * as update from 'immutability-helper';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import {
	Form,
	FormRow,
	Input
} from '../../components/form';
import {Button} from '../../components/button';
import {IconPerson} from '../../components/icons';
import {emailValidation} from '../../utils';

import * as model from '../../reducers/reset/model';
import * as actions from '../../reducers/reset/actions';

import {reset} from '../../functions/auth';

interface State {
	email: string
	valid: boolean
	message: string,
	success: boolean
}


interface Props {
    resetModelStatus: model.resetModelStatus;
    actionReset: (email: string)=>void;
}

class Reset extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			valid: true,
			message: '',
			success: false
		}
	}

    componentWillReceiveProps(nextProps:any) {
        if (!nextProps.resetModelStatus.statusReset) {

            this.setState(update(this.state, {
                message: {$set: nextProps.resetModelStatus.errorMessages}
            }));

        }
        else {
            this.setState(update(this.state, {
                success: {$set: true}
            }));
        }
    }

	private submitHandler() {
		const $t = this;
		const $state = $t.state;
		const $email = $state.email;

		let state: boolean = true;
		let message: string = '';

		if (!$email || !emailValidation($email)) {
			state = false;
			message += 'Email not valid.';
		}

		$t.setState(update($state, {
			message: {$set: message},
			valid: {$set: state}
		}));

		if (!state && message) return false;

		this.props.actionReset($email);

	}

	private changeHandler(value: string, stateItem: string) {
		let newState = {};
		newState[stateItem] = {$set: value};
		this.setState(update(this.state, newState));
	}

	render() {
		const {
			email,
			valid,
			message,
			success
		} = this.state;


		return (
			<div className="register_content register_signip">
				<div className="register_logo">
					<img className="register_logo_img" src={require('../../static/media/poweredbyhss_light.svg')}
							 alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				{success && <div className="register_success">
					<p>Reset link sended to your email.</p>
					<div className="register_success_actions">
						<a href="/auth/signin">Sign in</a>
						<a href="/">Main page</a>
					</div>
				</div>}

				{!success && <Form submit={() => this.submitHandler()}>
					<div className="register_error-message">{message}</div>

					<div className="register_header">
						<Link className="register_header_link" to="auth/signup">I don`t have an account</Link>
					</div>

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

					<div className="form_row register_actions">
						<Button type="submit" className="register_submit">Reset password</Button>
					</div>
				</Form>}
			</div>
		);
	}
}

export default connect(
    state => ({
        resetModelStatus: state.reset
    }),
    ({
        actionReset: actions.actionReset
    })
)(Reset);
