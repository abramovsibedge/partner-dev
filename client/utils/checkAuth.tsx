import * as firebase from 'firebase';
import {storageHelper} from './storage';
const storage = new storageHelper;

export function checkAuth(): boolean {
	let isSigned: boolean = true;

	if (!storage.get('tokens')) isSigned = false;

	firebase.auth().onAuthStateChanged((user: any) => {
		if (user && user.emailVerified) {
			const data = JSON.stringify({firebaseToken: user.He});
			storage.add('firebase', data);
			storage.add('username', (user.displayName) ? user.displayName : user.email);
			isSigned = true;
		} else {
			storage.remove('firebase');
			storage.remove('username');
			isSigned = false;
		}
	});

	console.log( isSigned );

	return isSigned;
}