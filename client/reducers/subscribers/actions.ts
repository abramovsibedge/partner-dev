import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import * as types from './constants';

import {storageHelper} from '../../utils';
const storage = new storageHelper;

import axios from 'axios';
import config from '../../config';

import { subscribersModel } from './model';

const logIn = async function(project: any) {
	let request: string = config.host + 'partner/login?access_token=' + config.firebaseToken;
	request += '&login=' + project['publickey'];
	request += '&password=' + project['privatekey'];

	return axios.post(request)
		.then(response => {
			let result = response.data;

			if (result.result === 'OK') {
				const data = JSON.stringify({restToken: result.access_token});
				storage.add('rest', data);

				return result.access_token;
			}
		})
		.catch(error => error);
};

export const loadLicenses = () => {
	return axios.get(config.host + 'partner/licenses?access_token=' + JSON.parse(storage.get('rest')).restToken)
		.then((response) => response.data.licenses)
		.then((responseJson) => {
			return responseJson;
		});
};

export const setProject = (project: any) => project;

export const loadSubscribers = async (project: any) => {
	let restToken = await logIn(project);

	let request: string = config.host + 'partner/subscribers?access_token=' + restToken;

	return axios.get(request)
		.then(response => response.data)
		.catch(error => error);
};

export const loadSubscriber = (type: string, value: string) => {
	const filterType: string = type === 'userId' ? '/' : '/' + type + '/';
	let request: string = config.host + 'partner/subscribers' + filterType + value + '?access_token=' + JSON.parse(storage.get('rest')).restToken;

	return axios.get(request)
		.then(response => {
			let result = response.data;

			if (result.result === 'OK') {
				return result.subscriber ? [result.subscriber] : result.subscribers
			}
		})
		.catch(error => {
			return [];
		});
};

export const addNewSubscriber = (data: any) => {
	let request:string = config.host + 'partner/subscribers?access_token=' + JSON.parse(storage.get('rest')).restToken;
	request += '&extref=' + data['extref'];
	request += '&username=' + data['username'];
	request += '&license_id=' + data['license_id'];
	request += '&family_name=' + data['oauth_token'];

	return axios.post(request)
		.then(response => {
			if (response.data.result === 'USER_ALREADY_EXISTS') {
				return {type: 'error', reason: 'User already exist'}
			}
			if (response.data.result === 'OK') {
				return {type: 'success'}
			}
		})
		.catch(error => error)
};

const getLicenses = ReduxActions.createAction<any, subscribersModel>(
	types.LOAD_LICENSES,
	() => loadLicenses()
);

const getSubscribers = ReduxActions.createAction<any, any, string>(
	types.LOAD_SUBSCRIBERS,
	(project: any) => loadSubscribers(project)
);

const searchSubscriber = ReduxActions.createAction<any, string, string>(
	types.SEARCH_SUBSCRIBERS,
	(type: string, value: string) => loadSubscriber(type, value)
);

const setActiveProject = ReduxActions.createAction<any, number>(
	types.SET_ACTIVE_PROJECT,
	(project: any) => setProject(project)
);

const addSubscriber = ReduxActions.createAction<any, any>(
	types.ADD_SUBSCRIBER,
	(data: any) => addNewSubscriber(data)
);

export {
	getLicenses,
	getSubscribers,
	searchSubscriber,
	setActiveProject,
	addSubscriber
}