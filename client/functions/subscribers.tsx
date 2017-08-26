import config from '../config';

export const logIn = (login: string, password: string) => {
	let request:string = config.host + 'partner/login?access_token=' + config.firebaseToken;
	request += '&login=' + login;
	request += '&password=' + password;

	return fetch(request, { method: 'POST'})
		.then(response => response.json())
		.then(responseJson => {
			if(responseJson['result'] === 'OK') {
				try {
					let rest = localStorage.getItem('REST') ? JSON.parse(localStorage.getItem('REST')) : {};
					rest['token'] = responseJson['access_token'];
					rest['activeProject'] = login;

					localStorage.setItem('REST', JSON.stringify(rest));
					return true;
				} catch (e) {
					// @todo fallback
					return false;
				}
			}
		});
};

export const checkLogin = () => {
	try {
		let rest = JSON.parse(localStorage.getItem('REST'));
		if(rest['token']) return true;
	} catch(e) {
		return false;
	}
};

export const getActiveProject = () => {
	try {
		let rest = JSON.parse(localStorage.getItem('REST'));
		if(rest['activeProject']) return rest['activeProject'];
	} catch(e) {
		return '';
	}
};

export const getAccessToken = () => {
	try {
		let rest = JSON.parse(localStorage.getItem('REST'));
		if(rest['token']) return rest['token'];
	} catch(e) {
		return '';
	}
};

export const addSubscriber = (subscriber: object) => {
	let request:string = config.host + 'partner/subscribers?access_token=' + getAccessToken();
	request += '&extref='+subscriber['extref'];
	request += '&username='+subscriber['username'];
	request += '&license_id='+subscriber['license_id'];
	request += '&family_name='+subscriber['oauth_token'];

	return fetch(request, { method: 'POST'})
		.then(response => response.json())
		.then(responseJson => {return responseJson});
};

export const getLicences = () => {
	return fetch(config.host + 'partner/licenses?access_token=' + getAccessToken())
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const getSubscribersList = () => {
	return fetch(config.host + 'partner/subscribers?access_token=' + getAccessToken())
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};