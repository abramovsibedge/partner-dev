import config from '../config';
import {storageHelper} from '../utils';

const storage = new storageHelper;

export const logIn = (login: string, password: string) => {
	let request:string = config.host + 'partner/login?access_token=' + config.firebaseToken;
	request += '&login=' + login;
	request += '&password=' + password;

	return fetch(request, { method: 'POST'})
		.then(response => response.json())
		.then(responseJson => {
			if(responseJson['result'] === 'OK') {
				try {
					let rest = storage.get('REST') ? JSON.parse(storage.get('REST')) : {};
					rest['token'] = responseJson['access_token'];
					rest['activeProject'] = login;

					storage.add('REST', JSON.stringify(rest));
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
		let rest = JSON.parse(storage.get('REST'));
		if(rest['token']) return true;
	} catch(e) {
		return false;
	}
};

export const getActiveProject = () => {
	try {
		let rest = JSON.parse(storage.get('REST'));
		if(rest['activeProject']) return rest['activeProject'];
	} catch(e) {
		return '';
	}
};

export const getAccessToken = () => {
	try {
		let rest = JSON.parse(storage.get('REST'));
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

export const getSubscriber = (subscriberId: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '?access_token=' + getAccessToken())
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const deleteSubscriber = (subscriberId: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '?access_token=' + getAccessToken(), {method: 'POST'})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const modifySubscriber = (subscriberId: number, params: any) => {
	let request:string = config.host + 'partner/subscribers/' + subscriberId + '?access_token=' + getAccessToken();

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return fetch(request, {method: 'PUT'})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const getTraffic = (subscriberId: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '/traffic?access_token=' + getAccessToken())
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const deleteTraffic = (subscriberId: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '/traffic?access_token=' + getAccessToken(), {method: 'DELETE'})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const modifyTraffic = (subscriberId: number, params: any) => {
	let request:string = config.host + 'partner/subscribers/' + subscriberId + '/traffic?access_token=' + getAccessToken();

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return fetch(request, {method: 'POST'})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const getPurchases = (subscriberId: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '/purchase?access_token=' + getAccessToken())
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const deletePurchase = (subscriberId: number, purchase_id: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '/purchase?access_token=' + getAccessToken() + '&purchase_id='+purchase_id, {method: 'DELETE'})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const getDevices = (subscriberId: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '/devices?access_token=' + getAccessToken())
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const deleteDevice = (subscriberId: number, device_id: number) => {
	return fetch(config.host + 'partner/subscribers/' + subscriberId + '/devices/' + device_id + '?access_token=' + getAccessToken(), {method: 'DELETE'})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const dateString = (time: number) => {
	let date = new Date(time);
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

	return (date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + ((date.getMinutes()>10)?date.getMinutes():('0'+date.getMinutes().toString())));
};

export const searchSubscriber = (params: any) => {
	const filterType: string = params.type === 'userId' ? '/' : '/' + params.type + '/';
	let request: string = config.host + 'partner/subscribers' + filterType + params.value + '?access_token=' + getAccessToken();

	return fetch(request, {method: 'GET'})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};


export const getSessions = (subscriberId: number, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + subscriberId + '/sessions?access_token=' + getAccessToken();

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return fetch(request)
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
};

export const byteConvert = (bytes: number) => {
	if((bytes / (1024*1024*1024)) > 1) return ((bytes / (1024*1024*1024)).toFixed(2) + ' Gb');
	else if((bytes / (1024*1024)) > 1) return ((bytes / (1024*1024)).toFixed(2) + ' Mb');
	else if((bytes / (1024)) > 1) return ((bytes / (1024)).toFixed(2) + ' Kb');

	return (bytes.toString() + ' B');
};