import * as ReduxActions from "redux-actions";
import * as types from './constants';

import axios from 'axios';
import config from '../../config';

import { projectsModel } from './model';

export const loadProjects = () => {
	const request = config.host + 'portal/projects?access_token=' + config.firebaseToken();

	return axios(request)
		.then(response => response.data)
		.catch(error => error);
};

const getProjects = ReduxActions.createAction<any, projectsModel>(
    types.LOAD_PROJECTS,
    () => loadProjects()
);

export {
	getProjects
}