import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import * as types from './constants';

import {storageHelper} from '../../utils';
const storage = new storageHelper;

function signIn(email: string, password: string) {
	return firebase.auth().signInWithEmailAndPassword(email, password)
		.then((response) => {
			if (!response.emailVerified) {
				throw ('Please, verify your email before Sign In!');
			} else {

				storage.add('firebase', JSON.stringify({firebaseToken: response.He}));
				storage.add('username', (response.displayName) ? response.displayName : response.email);

				return response;
			}
		})
		.catch((error: any) => {
				throw (error.message);
		});
}

const actionSignIn = ReduxActions.createAction<any, string, string>(
    types.ACTIONS_SIGNIN,
    (email: string, password: string) => signIn(email, password)
);

export {
    actionSignIn
}