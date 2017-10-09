import * as ReduxActions from "redux-actions";
import * as types from './constants';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from 'axios';
import config from '../../config';

import { IProject } from './model';

/* Get project data */
const loadProjectItem = (id: string) => {
	const countriesRequest = config.host + 'portal/project/countries?access_token=' + config.firebaseToken()+ '&publickey=' + id;
	const countries = axios(countriesRequest, { method: 'POST' })
		.then(response => response.data)
		.catch(error => {
			throw (error.message);
		});

	const emailsRequest = config.host + 'portal/project/access?access_token=' + config.firebaseToken() + '&publickey=' + id;
	const emails = axios(emailsRequest)
		.then(response => response.data)
		.catch(error => {
			throw (error.message);
		});

	const authRequest = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken() + '&publickey=' + id;
	const auth = axios(authRequest)
		.then(response => response.data)
		.catch(error => {
			throw (error.message);
		});

	const paymentsRequest = config.host + 'portal/project/payments_settings?access_token=' + config.firebaseToken() + '&publickey=' + id;
	const payments = axios(paymentsRequest)
		.then(response => response.data)
		.catch(error => {
			throw (error.message);
		});

	const combinedData = {"countries": {},"emails": {}, "auth": {}, "payments": {}};

	return Promise.all([countries, emails, auth, payments]).then(result => {
		combinedData["countries"] = result[0];
		combinedData["emails"] = result[1];
		combinedData["auth"] = result[2];
		combinedData["payments"] = result[3];
		combinedData["id"] = id;
		return combinedData;
	});
};

export const getProject = ReduxActions.createAction<any, string>(
	types.LOAD_PROJECT,
	(id: string) => loadProjectItem(id)
);
/**/

/* Edit project */

/**/

/* Change country visibility */
const setVisibility = (project: string, country: string, visibility: boolean) => {
	let request:string = config.host + 'portal/project/country?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&country=' + country;
	request += '&visibility=' + visibility;

	return axios.put(request).then(response => response.data);
};

export const changeVisibility = ReduxActions.createAction<any, string, string, boolean>(
	types.SET_VISIBILITY,
	(project: string, country: string, visibility: boolean) => setVisibility(project, country, visibility)
);
/**/

/* Delete access email */
const removeUser = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&email=' + email;

	return axios.delete(request).then(response => response.data)
};

export const deleteUser = ReduxActions.createAction<any, string, string>(
	types.DELETE_USER,
	(project: string, email: string) => removeUser(project, email)
);
/**/

/* Delete project */
const removeProject = async (project: any) => {
	let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken();
	request += '&publickey=' + project['publickey'];
	request += '&privatekey=' + project['privatekey'];

	return axios.delete(request).then(response => response.data);
};

export const deleteProject: ActionCreator<ThunkAction<Promise<Action>, IProject, void>> = (project: any) => {
	return async (dispatch: Dispatch<IProject>): Promise<Action> => {
		let result = await removeProject(project);

		return dispatch({
			type: types.DELETE_PROJECT,
			result
		});
	};
};
/**/

/* Add user access email */
const addUserEmail = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&email=' + email;

	return axios.post(request).then(response => response.data)
};

export const addUser = ReduxActions.createAction<any, string, string>(
	types.ADD_USER,
	(project: string, email: string) => addUserEmail(project, email)
);
/**/

/* Add auth */
const addAuth = (project: string, auth: any) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + auth.name;
	request += '&auth_settings=' + JSON.stringify(auth.settings);

	return axios.put(request).then(response => response.data)
};

export const addAuthMethod = ReduxActions.createAction<any, string, string>(
	types.ADD_AUTH,
	(project: string, value: string) => addAuth(project, value)
);
/**/

/* remove auth */
const removeAuth = (project: string, auth: string) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + auth;

	return axios.delete(request).then(response => response.data)
};

export const deleteAuthMethod = ReduxActions.createAction<any, string, string>(
	types.DELETE_AUTH,
	(project: string, auth: string) => removeAuth(project, auth)
);
/**/

/* Add payment method */
const addPayment = (project: string, auth: any) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + auth.name;
	request += '&auth_settings=' + JSON.stringify(auth.settings);

	return axios.put(request).then(response => response.data)
};

export const addPaymentMethod = ReduxActions.createAction<any, string, string>(
	types.ADD_PAYMENT,
	(project: string, value: string) => addPayment(project, value)
);
/**/

/* Delete payment method */
const removePayment = (project: string, payment: string) => {
	let request:string = config.host + 'portal/project/payments_settings?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + payment;

	return axios.delete(request).then(response => response.data)
};

export const deletePaymentMethod = ReduxActions.createAction<any, string, string>(
	types.DELETE_PAYMENTS,
	(project: string, payment: string) => removePayment(project, payment)
);
/**/