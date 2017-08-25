const firebaseToken = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')).firebaseToken : null;

export default {
	host: 'http://vpn-backend.northghost.com/',
	firebaseToken,
	firebaseKey: ' AIzaSyBjJGXAQW9wuT7O1_bHMoLPaT6YSM1ELGU',
	firebaseAuthDomain: 'web-portal-for-partners.firebaseapp.com',
	firebasedatabaseURL: 'https://web-portal-for-partners.firebaseio.com',
	authState: null
};