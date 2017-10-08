import * as ReduxActions from "redux-actions";
import * as types from './constants';
import { hashHistory } from 'react-router';

import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';

import axios from 'axios';
import config from '../../config';

import {
	storageHelper,
  logOut } from '../../utils';
const storage = new storageHelper;

import { projectsModel } from './model';
import { IPojects } from './model';

export const loadProjects = () => {
	const request = config.host + 'portal/projects?access_token=' + config.firebaseToken();

	return axios(request)
		.then(response => response.data)
		.catch(error => {
			let result = error.response.data.result;

			if (result === 'NOT_AUTHORIZED') logOut();
		});
};

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
}

const editProjectItem = async (project: string, description: string) => {
  let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken();
  request += '&publickey=' + project;
  request += '&description=' + description;

  return axios(request, { method: 'PUT' }).then(response => response.data);
}


const setVisibility = (project: string, country: string, visibility: boolean) => {
  let request:string = config.host + 'portal/project/country?access_token=' + config.firebaseToken();
  request += '&publickey=' + project;
  request += '&country=' + country;
  request += '&visibility=' + visibility;

  return axios(request, { method: 'PUT' })
		.then(response => {
			response.data
		})
		.catch((error: any) => {
			throw (error.message);
		});
};

const deletePr = (item: object) => {
  let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken();
  request += '&publickey=' + item['publickey'];
  request += '&privatekey=' + item['privatekey'];

  return axios(request, { method: 'DELETE' })
		.then(response => response.data)
		.catch((error: any) => {
			throw (error.message);
		});
};

const addProject = (data: object) => {
  let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken();
  request += '&publickey=' + data['public_key'];
  request += '&privatekey=' + data['private_key'];
  request += '&description=' + data['description'];
  request += '&project_type=' + data['project_type'];

  return axios(request, { method: 'POST' }).then(response => response.data)
};



const removeAuth = (project: string, auth: string) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + auth;

	return axios(request, { method: 'DELETE' }).then(response => response.data)
};

const authAdd = (project: string, auth: any) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + auth.name;
	request += '&auth_settings=' + JSON.stringify(auth.settings);

	return axios(request, { method: 'PUT' }).then(response => response.data)
};


export const deleteAuth = ReduxActions.createAction<any, string, string>(
	types.DELETE_AUTH,
	(project: string, auth: string) => removeAuth(project, auth)
);

export const addAuth = ReduxActions.createAction<any, string, string>(
	types.ADD_AUTH,
	(project: string, value: string) => authAdd(project, value)
);



const removePayment = (project: string, payment: string) => {
	let request:string = config.host + 'portal/project/payments_settings?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + payment;

	return axios(request, { method: 'DELETE' }).then(response => response.data)
};


const authPayment = (project: string, auth: any) => {
	let request:string = config.host + 'portal/project/authentifications_setting?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&auth_method=' + auth.name;
	request += '&auth_settings=' + JSON.stringify(auth.settings);

	return axios(request, { method: 'PUT' }).then(response => response.data)
};

export const deletePayment = ReduxActions.createAction<any, string, string>(
	types.DELETE_PAYMENTS,
	(project: string, payment: string) => removePayment(project, payment)
);

export const addPayment = ReduxActions.createAction<any, string, string>(
	types.ADD_PAYMENT,
	(project: string, value: string) => authPayment(project, value)
);

// ____________________________>>

export const getProjects = ReduxActions.createAction<any, projectsModel>(
    types.LOAD_PROJECTS,
    () => loadProjects()
);

export const getProject = ReduxActions.createAction<any, string>(
    types.LOAD_PROJECT,
    (id: string) => loadProjectItem(id)
);

export const changeVisibility = ReduxActions.createAction<any, string, string, boolean>(
    types.SET_VISIBILITY,
    (project: string, country: string, visibility: boolean) => setVisibility(project, country, visibility)
);

export const deleteProject = ReduxActions.createAction<any, object>(
    types.DELETE_PROJECT,
    (item: object) => deletePr(item)
);


export const createProject = ReduxActions.createAction<any, object>(
    types.CREATE_PROJECT,
    (data: object) => addProject(data)
);

export const editProject: ActionCreator<ThunkAction<Promise<Action>, IPojects, void>> = (project:string, description: string) => {
	return async (dispatch: Dispatch<IPojects>): Promise<Action> => {
		let result = await editProjectItem(project, description);

		return dispatch({
			type: types.EDIT_PROJECT,
			result
		});
	};
};