import config from '../config';

const addProject = (data: object) => {
	let request:string = '';
	request += '&publickey=' + data['public_key'];
	request += '&privatekey=' + data['private_key'];
	request += '&description=' + data['description'];
	request += '&project_type=' + data['project_type'];

	return fetch(config.host + 'portal/project?access_token=' + config.firebaseToken + request, {
			method: 'POST',
		})
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export default addProject;