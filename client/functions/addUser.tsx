import config from '../config';

const addUser = (project: string, email: string) => {
	let request:string = '';
	request += '&publickey=' + project;
	request += '&email=' + email;

	return fetch(config.host + 'portal/project/access?access_token=' + config.firebaseToken + request, {
		method: 'POST',
	})
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export default addUser;