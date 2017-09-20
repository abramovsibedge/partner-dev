import * as React from 'react';
import * as firebase from 'firebase';
import * as update from 'immutability-helper';

import config from '../../config';

import '../../static/scss/routes/pages.scss';

import {check} from '../../functions/auth';

interface State {
    content: string
}

export class Veryfy extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
            content: ''
		}
	}

    componentDidMount() {
		// TODO in function
        var getParameterByName = function (name:any, url?:any) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var mode = getParameterByName('mode'),
            actionCode = getParameterByName('oobCode'),
            apiKey = getParameterByName('apiKey');

	    var auth = firebase.auth();

        switch (mode) {
            case 'verifyEmail':
            	this.handleVerifyEmail(auth, actionCode);
                break;
            default:
            // Error: invalid mode.
        }

    }

	handleVerifyEmail(auth:any, actionCode:any) {
		let thisC = this;

        auth.applyActionCode(actionCode).then(function(resp:any) {
            this.setState(update(this.state, {
                content: {$set: 'veryfy_success'},
            }));

        }).catch(function(error:any) {
            thisC.setState(update(thisC.state, {
                content: {$set: 'veryfy_error'}
            }));
        });
    };

	render() {
		const {content} = this.state;

		let contentBlock = (<div></div>);

		if (content=='veryfy_error') {
            contentBlock = (
				<section className="ui-container">
					<div className="ui-container-card-header">
						<h1 className="ui-container-title">Trying to verify email</h1>
					</div>
					<div className="ui-container-card-content">
						<p className="ui-container-text">The action code is invalid. This can happen if the code is malformed, expired, or has already been used.</p>
					</div>
					<div className="ui-container-card-footer"></div>
				</section>
            );
		}
		if (content=='veryfy_success') {
			contentBlock = (
				<section className='ui-container'>
					<div className="ui-container-card-header">
						<h1 className="ui-container-title">Your email has been verified</h1>
					</div>
					<div className='ui-container-card-content'>
						<p className='ui-container-text'>You can now sign in with your new account</p>
					</div>
					<div className='ui-container-card-footer'>
						<div className='ui-container-form-actions'>
							<a href="https://developer.anchorfree.com/#/login">Sign In</a>
						</div>
					</div>
				</section>

            )
		}



		return (
			<div id="templates">
				{contentBlock}
			</div>
		);
	}
}