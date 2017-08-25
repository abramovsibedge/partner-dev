import * as firebase from 'firebase';

const authHandler = (user: any) => {
	const data = JSON.stringify({firebaseToken: user.De});
	localStorage.setItem('tokens', data);
};

const notAuthHandler = () => {
	localStorage.removeItem('tokens');
	window.location.replace("/");
};

export const check = () => {
	let isSigned: boolean = true;

	if (!JSON.parse(localStorage.getItem('tokens'))) {
		notAuthHandler();
		isSigned = false;
	}

	firebase.auth().onAuthStateChanged((user: any) => {
		if (user) {
			authHandler(user);
			isSigned = true;
		} else {
			notAuthHandler();
			isSigned = false;
		}
	});

	return isSigned;
};

export const logOut = () => firebase.auth().signOut().then(() => notAuthHandler());

export const signIn = (login: string, password: string) => {
	return firebase.auth().signInWithEmailAndPassword(login, password)
		.then(() => firebase.auth().onAuthStateChanged((user: any) => user && authHandler(user)))
		.catch((error: any) => {
			return {type: 'error', error: error};
		});
};

export const signUp = (state: any) => {
	return firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
		.then(() => firebase.auth().onAuthStateChanged(() => {
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
		}))
		.catch((error: any) => {
			return {type: 'error', error: error};
		});
};

export const reset = (email: any) => {
	return firebase.auth().sendPasswordResetEmail(email)
		.catch((error: any) => {
			return {type: 'error', error: error};
		});
};