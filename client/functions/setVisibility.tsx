import config from '../config';

const setVisibility = (project: string, country: string, visibility: boolean) => {
	let request:string = '';
	request += '&publickey=' + project;
	request += '&country=' + country;
	request += '&visibility=' + visibility;

	return fetch(config.host + 'portal/project/country ?access_token=' + config.firebaseToken + request, {
		method: 'PUT',
	})
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export default setVisibility;