import * as firebase from 'firebase';
import {storageHelper} from '../utils';

const storage = new storageHelper;

export const check = () => {
	let isSigned: boolean = true;

	if (!storage.get('tokens')) isSigned = false;

	firebase.auth().onAuthStateChanged((user: any) => {
		if (user && user.emailVerified) {
			const data = JSON.stringify({firebaseToken: user.He});
			storage.add('tokens', data);
			storage.add('username', (user.displayName) ? user.displayName : user.email);
			isSigned = true;
		} else {
			storage.remove('tokens');
			storage.remove('username');
			isSigned = false;
		}
	});

	return isSigned;
};

export const logOut = () => firebase.auth().signOut().then(() => {
	storage.remove('tokens');
	window.location.replace("/");
});

export const signIn = (login: string, password: string) => {
	return firebase.auth().signInWithEmailAndPassword(login, password)
		.then((response) => {
			if (!response.emailVerified) {
				return {type: 'error', error: 'Please, verify your email before Sign In!'};
			}
		})
		.catch((error: any) => {
			return {type: 'error', error: error};
		});
};

export const signUp = (state: any) => {
	return firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
		.then(() => {
			firebase.auth().currentUser.sendEmailVerification();

			firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
				first_name: state.firstName,
				last_name: state.lastName,
				company: state.companyName,
				email: state.email,
				plan: state.productsSelected,
				users: state.numberOfUsersSelected,
				tos: Math.floor((new Date()).getTime() / 1000),
				first: true
			});

			return {type: 'OK'};
		})
		.catch((error: any) => {
			return {type: 'error', error: error};
		});
};

export const reset = (email: any) => {
	return firebase.auth().sendPasswordResetEmail(email)
		.then(() => {
			return {type: 'OK'};
		})
		.catch((error: any) => {
			return {type: 'error', error: error};
		});
};