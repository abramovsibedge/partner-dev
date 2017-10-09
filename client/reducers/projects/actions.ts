import * as ReduxActions from "redux-actions";
import * as types from './constants';
import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';

import axios from 'axios';
import config from '../../config';

import { projectsModel } from './model';
import { IProjects } from './model';

import { logOut } from '../../utils';

/* Load projects */
const loadProjects = () => {
	const request = config.host + 'portal/projects?access_token=' + config.firebaseToken();

	return axios(request)
		.then(response => response.data)
		.catch(error => {
			let result = error.response.data.result;

			if (result === 'NOT_AUTHORIZED') logOut();
		});
};

export const getProjects = ReduxActions.createAction<any, projectsModel>(
	types.LOAD_PROJECTS,
	() => loadProjects()
);
/**/

/* Edit project item */
const editProjectItem = async (project: string, description: string) => {
	let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken();
	request += '&publickey=' + project;
	request += '&description=' + description;

	return axios(request, { method: 'PUT' }).then(response => response.data);
};

export const editProject: ActionCreator<ThunkAction<Promise<Action>, IProjects, void>> = (project:string, description: string) => {
	return async (dispatch: Dispatch<IProjects>): Promise<Action> => {
		let result = await editProjectItem(project, description);

		return dispatch({
			type: types.EDIT_PROJECT,
			result
		});
	};
};
/**/

/* Add new project */
const addProject = (data: object) => {
	let request:string = config.host + 'portal/project?access_token=' + config.firebaseToken();
	request += '&publickey=' + data['public_key'];
	request += '&privatekey=' + data['private_key'];
	request += '&description=' + data['description'];
	request += '&project_type=' + data['project_type'];

	return axios(request, { method: 'POST' }).then(response => response.data)
};

export const createProject = ReduxActions.createAction<any, object>(
	types.CREATE_PROJECT,
	(data: object) => addProject(data)
);
/**/