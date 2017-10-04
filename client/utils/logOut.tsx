import {storageHelper} from './storage';
const storage = new storageHelper;
import * as firebase from 'firebase';

export function logOut() {
	firebase.auth().signOut().then(() => {
		storage.remove('firebase');
		storage.remove('rest');
		storage.remove('username');
		window.location.replace("#/auth/signin");
	});
}