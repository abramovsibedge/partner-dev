import {storageHelper} from '../utils';

const storage = new storageHelper;

export default {
	host: 'https://vpn-backend.northghost.com/',
	firebaseToken() {
		return storage.get('firebase') ? JSON.parse(storage.get('firebase')).firebaseToken : null;
	},
	firebaseKey: ' AIzaSyBjJGXAQW9wuT7O1_bHMoLPaT6YSM1ELGU',
	firebaseAuthDomain: 'web-portal-for-partners.firebaseapp.com',
	firebasedatabaseURL: 'https://web-portal-for-partners.firebaseio.com',
	restToken: storage.get('rest') && JSON.parse(storage.get('rest')).restToken,
	authState: null
};