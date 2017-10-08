import {storageHelper} from './storage';
const storage = new storageHelper;
import * as firebase from 'firebase';
import { hashHistory } from 'react-router';

export function logOut() {
	firebase.auth().signOut().then(() => {
		storage.remove('firebase');
		storage.remove('rest');
		storage.remove('username');
		hashHistory.push('/auth/signin');
	});

	return false;
}