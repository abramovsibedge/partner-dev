import * as React from 'react';
import '../../static/scss/routes/auth.scss';

interface Props {
	isSigned: boolean
}

export class AuthMessage extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			isSigned
		} = this.props;

		return (
			<div className="register_content register_signip">
				<div className="register_logo">
					<img className="register_logo_img" src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="32"/>
				</div>
				<div className="register_success">
					{!isSigned && <p>Please, sign in to continue.</p>}
					{isSigned && <p>You are already signed in.</p>}
					<div className="register_success_actions">
						{!isSigned && <a href="/auth/signin">Sign in</a>}
						{isSigned && <a href="/projects">Dashboard</a>}

						<a href="/">Main page</a>
					</div>
				</div>
			</div>
		);
	}
}