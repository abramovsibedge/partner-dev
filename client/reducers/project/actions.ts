import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import * as types from './constants';

import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {storageHelper} from '../../utils';
const storage = new storageHelper;

import axios from 'axios';
import config from '../../config';

import { IProject } from './model';

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