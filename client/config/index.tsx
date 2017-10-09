import {storageHelper} from '../utils';
const storage = new storageHelper;

export default {
	host: 'https://vpn-backend.northghost.com/',
	firebaseKey: ' AIzaSyBjJGXAQW9wuT7O1_bHMoLPaT6YSM1ELGU',
	firebaseAuthDomain: 'web-portal-for-partners.firebaseapp.com',
	firebasedatabaseURL: 'https://web-portal-for-partners.firebaseio.com',
	restToken() {
		return storage.get('rest') ? JSON.parse(storage.get('rest')).restToken : null;
	},
	firebaseToken() {
		return storage.get('firebase') ? JSON.parse(storage.get('firebase')).firebaseToken : null;
	}
};