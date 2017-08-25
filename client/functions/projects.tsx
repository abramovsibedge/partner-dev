import config from '../config';

export const loadProjects = () => {
	const request = config.host + 'portal/projects?access_token=' + config.firebaseToken;

	return fetch(request)
		.then(response => response.json())
		.then(responseJson => responseJson)
		.catch(error => error);
};

export const loadProjectItem = (id: string) => {
	const countriesRequest = config.host + 'portal/project/countries?access_token=' + config.firebaseToken+ '&publickey=' + id;
	const countries = fetch(countriesRequest, { method: 'POST' }).then(response => response.json());

	const emailsRequest = config.host + 'portal/project/access?access_token=' + config.firebaseToken + '&publickey=' + id;
	const emails = fetch(emailsRequest).then(response => response.json());

	const combinedData = {"countries":{},"emails":{}};

	return Promise.all([countries, emails]).then(result => {
		combinedData["countries"] = result[0];
		combinedData["emails"] = result[1];
		return combinedData;
	});
};

export const addProject = (data: object) => {
	let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken;
	request += '&publickey=' + data['public_key'];
	request += '&privatekey=' + data['private_key'];
	request += '&description=' + data['description'];
	request += '&project_type=' + data['project_type'];

	return fetch(request, { method: 'POST', })
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export const deleteProject = (item: object) => {
	let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken;
	request += '&publickey=' + item['publickey'];
	request += '&privatekey=' + item['privatekey'];

	return fetch(request, { method: 'DELETE', })
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export const addUser = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken;
	request += '&publickey=' + project;
	request += '&email=' + email;

	return fetch(request, { method: 'POST' })
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export const deleteUser = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken;
	request += '&publickey=' + project;
	request += '&email=' + email;

	return fetch(request, { method: 'DELETE' })
		.then(response => response.json())
		.then(responseJson => responseJson)
};

export const setVisibility = (project: string, country: string, visibility: boolean) => {
	let request:string = config.host + 'portal/project/country?access_token=' + config.firebaseToken;
	request += '&publickey=' + project;
	request += '&country=' + country;
	request += '&visibility=' + visibility;

	return fetch(request, { method: 'PUT' })
		.then(response => response.json())
		.then(responseJson => responseJson)
};