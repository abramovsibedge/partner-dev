import * as React from 'react';
import * as firebase from 'firebase';
import config from '../config';

export class App extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		firebase.initializeApp({
			apiKey: config.firebaseKey,
			authDomain: config.firebaseAuthDomain,
			databaseURL: config.firebasedatabaseURL
		});
	}

	render() {
		return (
			<div className="content">
				{this.props.children}
			</div>
		);
	}
}