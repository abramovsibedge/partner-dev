import * as ReduxActions from "redux-actions";
import * as types from './constants';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from 'axios';
import config from '../../config';

import { IProject } from './model';

/*  */
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




























const addUserEmail = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&email=' + email;

	return axios(request, { method: 'POST' }).then(response => response.data)
};

const removeProject = async (project: any) => {
	let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken();
	request += '&publickey=' + project['publickey'];
	request += '&privatekey=' + project['privatekey'];

	return axios(request, { method: 'DELETE' })
		.then(response => response.data)
		.catch((error: any) => {
			console.log('error.message', error.message);
			throw (error.message);
		});
};

const removeUser = (project: string, email: string) => {
	let request:string = config.host + 'portal/project/access?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&email=' + email;

	return axios(request, { method: 'DELETE' }).then(response => response.data)
};

const addUser = ReduxActions.createAction<any, string, string>(
	types.ADD_USER,
	(project: string, email: string) => addUserEmail(project, email)
);

const deleteProject: ActionCreator<ThunkAction<Promise<Action>, IProject, void>> = (project: any) => {
	return async (dispatch: Dispatch<IProject>): Promise<Action> => {
		let result = await removeProject(project);

		return dispatch({
			type: types.DELETE_PROJECT,
			result
		});
	};
};

const deleteUser = ReduxActions.createAction<any, string, string>(
	types.DELETE_USER,
	(project: string, email: string) => removeUser(project, email)
);

export {
	addUser,
	deleteProject,
	deleteUser
}