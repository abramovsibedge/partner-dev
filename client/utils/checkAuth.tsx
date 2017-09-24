import * as firebase from 'firebase';
import {storageHelper} from './storage';
const storage = new storageHelper;

export function checkAuth(): boolean {
	let isSigned: boolean = true;

	if (!storage.get('firebase')) isSigned = false;

	return isSigned;
}