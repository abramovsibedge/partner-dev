import axios from 'axios';
import config from '../config';

export const loadProjects = () => {
	const request = config.host + 'portal/projects?access_token=' + config.firebaseToken;

	return axios(request)
		.then(response => response.data)
		.catch(error => error);
};

export const loadProjectItem = (id: string) => {
	const countriesRequest = config.host + 'portal/project/countries?access_token=' + config.firebaseToken+ '&publickey=' + id;
	const countries = axios(countriesRequest, { method: 'POST' }).then(response => response.data);

	const emailsRequest = config.host + 'portal/project/access?access_token=' + config.firebaseToken + '&publickey=' + id;
	const emails = axios(emailsRequest).then(response => response.data);

	const authentificationsRequest = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken+ '&publickey=' + id;
	const authentifications = axios(authentificationsRequest, { method: 'GET' })
		.then(response => response.data)
		.catch(response => response.data);

	const paymentsRequest = config.host + 'portal/project/payments_settings?access_token=' + config.firebaseToken+ '&publickey=' + id;
	const payments = axios(paymentsRequest, { method: 'GET' })
		.then(response => response.data)
		.catch(response => response.data);

	const combinedData = {"countries":{},"emails":{}, "authentifications": {}};

	return Promise.all([countries, emails, authentifications, payments]).then(result => {
		combinedData["countries"] = result[0];
		combinedData["emails"] = result[1];
		combinedData["authentifications"] = result[2]?result[2]:{all_auth_settings:[]};
		combinedData["payments"] = result[3]?result[3]:{all_purchase_settings:[]};
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
	let request:string = config.host + 'portal/project/country?access_token=' + config.firebaseToken;
	request += '&publickey=' + project;
	request += '&country=' + country;
	request += '&visibility=' + visibility;

	return axios(request, { method: 'PUT' }).then(response => response.data)
};

export const addAuthentificationsSetting = (id:string, auth_method: string, auth_settings: string) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken;

	request += '&publickey=' + id;
	request += '&auth_method=' + auth_method;
	if(auth_settings) request += '&auth_settings=' + auth_settings;

	return axios(request, { method: 'POST' }).then(response => response.data)
};

export const updateAuthentificationsSetting = (id:string, auth_method: string, auth_settings: string) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken;

	request += '&publickey=' + id;
	request += '&auth_method=' + auth_method;
	if(auth_settings) request += '&auth_settings=' + auth_settings;

	return axios(request, { method: 'PUT' }).then(response => response.data)
};

export const deleteAuthentificationsSetting = (id:string, auth_method: string) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken;

	request += '&publickey=' + id;
	request += '&auth_method=' + auth_method;

	return axios(request, { method: 'DELETE' }).then(response => response.data)
};

export const addPaymentsSettings = (id:string, purchase_type: string, purchase_settings: string) => {
	let request:string = config.host + 'portal/project/payments_settings?access_token=' + config.firebaseToken;

	request += '&publickey=' + id;
	request += '&purchase_type=' + purchase_type;
	if(purchase_settings) request += '&purchase_settings=' + purchase_settings;

	return axios(request, { method: 'POST' }).then(response => response.data)
};

export const updatePaymentsSettings = (id:string, purchase_type: string, purchase_settings: string) => {
	let request:string = config.host + 'portal/project/payments_settings?access_token=' + config.firebaseToken;

	request += '&publickey=' + id;
	request += '&purchase_type=' + purchase_type;
	if(purchase_settings) request += '&purchase_settings=' + purchase_settings;

	return axios(request, { method: 'PUT' }).then(response => response.data)
};

export const deletePaymentsSettings = (id:string, purchase_type: string) => {
	let request:string = config.host + 'portal/project/payments_settings?access_token=' + config.firebaseToken;

	request += '&publickey=' + id;
	request += '&purchase_type=' + purchase_type;

	return axios(request, { method: 'DELETE' }).then(response => response.data)
};