import * as firebase from 'firebase';
import config from '../config';

export const firebaseInit = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: config.firebaseKey,
			authDomain: config.firebaseAuthDomain,
			databaseURL: config.firebasedatabaseURL
		});
	}
};