import config from '../config';

const deleteProject = (item: object) => {

	console.log( item );

	let request:string = '';
	request += '&publickey=' + item['publickey'];
	request += '&privatekey=' + item['privatekey'];

	return fetch(config.host + 'portal/project?access_token=' + config.firebaseToken + request, {
			method: 'DELETE',
		})
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export default deleteProject;