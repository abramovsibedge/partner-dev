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

export const loadProjectItem = (id: string) => {
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

  const combinedData = {"countries":{},"emails":{}};

  return Promise.all([countries, emails]).then(result => {
    combinedData["countries"] = result[0];
    combinedData["emails"] = result[1];
    return combinedData;
  });
}


export const getProjects = ReduxActions.createAction<any, projectsModel>(
    types.LOAD_PROJECTS,
    () => loadProjects()
);

export const getProject = ReduxActions.createAction<any, string>(
    types.LOAD_PROJECT,
    (id: string) => loadProjectItem(id)
);
