import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import * as types from './constants';

function signIn(email: string, password: string) {
	return firebase.auth().signInWithEmailAndPassword(email, password)
		.then((response) => {
			if (!response.emailVerified) {
				throw ('Please, verify your email before Sign In!');
			} else {
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