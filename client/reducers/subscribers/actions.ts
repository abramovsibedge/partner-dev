import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as ReduxActions from "redux-actions";

import { storageHelper } from '../../utils';
const storage = new storageHelper;

import axios from 'axios';
import config from '../../config';

import * as types from './constants';
import {
	ISubscribers,
	subscribersModel
} from './model';

/* Change loading state */
export const loadingState: ActionCreator<ThunkAction<Promise<Action>, ISubscribers, void>> = (value: boolean) => {
	return async (dispatch: Dispatch<ISubscribers>): Promise<Action> => {
		return dispatch({
			type: types.SET_LOADING_STATUS,
			value
		});
	};
};
/**/

/* Get project REST token */
const logIn = async (project: any) => {
	let request: string = config.host + 'partner/login?access_token=' + config.firebaseToken();
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
/**/

/* Set active project */
export const setActiveProject = ReduxActions.createAction<any, number>(
	types.SET_ACTIVE_PROJECT,
	(project: any) => project
);
/**/

/* Get subscribers list */
const loadSubscribers = async (project: any) => {
	let restToken = await logIn(project);

	let request: string = config.host + 'partner/subscribers?access_token=' + restToken;

	return axios.get(request)
		.then(response => response.data)
		.catch(error => error);
};

export const getSubscribers = ReduxActions.createAction<any, any, string>(
	types.LOAD_SUBSCRIBERS,
	(project: any) => loadSubscribers(project)
);
/**/

/* Set active subscriber */
export const setActiveSubscriber = ReduxActions.createAction<any, any, string>(
	types.SET_ACTIVE_SUBSCRIBER,
	(subscriber: any) => subscriber
);
/**/

/* Load licenses */
const loadLicenses = () => {
	if (config.restToken()) {
		return axios.get(config.host + 'partner/licenses?access_token=' + config.restToken())
			.then((response) => response.data.licenses);
	}
};

export const getLicenses = ReduxActions.createAction<any, subscribersModel>(
	types.LOAD_LICENSES,
	() => loadLicenses()
);
/**/

/* Search for subscribers */
const findSubscribers = (type: string, value: string) => {
	const filterType: string = type === 'userId' ? '/' : '/' + type + '/';
	let request: string = config.host + 'partner/subscribers' + filterType + value + '?access_token=' + config.restToken();

	return axios.get(request)
		.then(response => {
			let result = response.data;

			return result.result === 'OK' ? result.subscriber ? [result.subscriber] : result.subscribers : [];
		})
		.catch(error => []);
};

export const searchSubscriber = ReduxActions.createAction<any, string, string>(
	types.SEARCH_SUBSCRIBERS,
	(type: string, value: string) => findSubscribers(type, value)
);
/**/

/**/
const addNewSubscriber = async (data: any) => {
	let request:string = config.host + 'partner/subscribers?access_token=' + config.restToken();
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

export const addSubscriber: ActionCreator<ThunkAction<Promise<Action>, ISubscribers, void>> = (data: any) => {
	return async (dispatch: Dispatch<ISubscribers>): Promise<Action> => {
		let result = await addNewSubscriber(data);

		return dispatch({
			type: types.ADD_SUBSCRIBER,
			result
		});
	};
};
/**/