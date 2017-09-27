import axios from 'axios';
import config from '../config';

export const loadProjects = () => {
	const request = config.host + 'portal/projects?access_token=' + config.firebaseToken;

	return axios(request)
		.then(response => response.data)
		.catch(error => error);
};

export const loadProjectItem = (id: string) => {
	const countriesRequest = config.host + 'portal/project/countries?access_token=' + config.firebaseToken()+ '&publickey=' + id;
	const countries = axios(countriesRequest, { method: 'POST' })
      .then(response => response.data)
      .catch(error => {
        console.log('1', error);
      });

  const emailsRequest = config.host + 'portal/project/access?access_token=' + config.firebaseToken() + '&publickey=' + id;

	const emails = axios(emailsRequest)
      .then(response => response.data)
      .catch(error => {
        console.log('2', error);
      });

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

	return axios(request, { method: 'POST' }).then(response => response.data)
};

export const deleteProject = (item: object) => {
	let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken;
	request += '&publickey=' + item['publickey'];
	request += '&privatekey=' + item['privatekey'];

	return axios(request, { method: 'DELETE' }).then(response => response.data)
};

export const addUser = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken;
	request += '&publickey=' + project;
	request += '&email=' + email;

	return axios(request, { method: 'POST' }).then(response => response.data)
};

export const deleteUser = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken;
	request += '&publickey=' + project;
	request += '&email=' + email;

	return axios(request, { method: 'DELETE' }).then(response => response.data)
};

export const setVisibility = (project: string, country: string, visibility: boolean) => {
	let request:string = config.host + 'portal/project/country?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&country=' + country;
	request += '&visibility=' + visibility;

	return axios(request, { method: 'PUT' }).then(response => response.data)
};