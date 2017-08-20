import * as firebase from 'firebase';

const config = {
	apiKey: " AIzaSyALn32lO1RSMPiBopHtUFNx2wiJs5uu-Fw",
	authDomain: "partner-dev-88932.firebaseapp.com",
	databaseURL: "https://partner-dev-88932.firebaseio.com"
};

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();