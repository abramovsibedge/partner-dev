import * as ReduxActions from "redux-actions";
import * as types from './constants';
import { hashHistory } from 'react-router';

import axios from 'axios';
import config from '../../config';

import {storageHelper} from '../../utils';
const storage = new storageHelper;

import { projectsModel } from './model';

export const loadProjects = () => {
	const request = config.host + 'portal/projects?access_token=' + config.firebaseToken();

	return axios(request)
		.then(response => response.data)
		.catch(error => {
			let result = error.response.data.result;

			if (result === 'NOT_AUTHORIZED') {
        storage.remove('rest');
        storage.remove('firebase');
        hashHistory.push('/auth/signin');
        return false;
			}

      return error;
		});
};

const getProjects = ReduxActions.createAction<any, projectsModel>(
    types.LOAD_PROJECTS,
    () => loadProjects()
);

export {
	getProjects
}