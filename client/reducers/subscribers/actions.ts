import * as firebase from 'firebase';

import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';

import * as ReduxActions from "redux-actions";
import * as types from './constants';

import {storageHelper} from '../../utils';
const storage = new storageHelper;

import axios from 'axios';
import config from '../../config';

import { IState, subscribersModel } from './model';

const logIn = async function(project: any) {
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

export const loadLicenses = () => {
	if (config.restToken()) {
		return axios.get(config.host + 'partner/licenses?access_token=' + config.restToken())
			.then((response) => response.data.licenses)
			.then((responseJson) => {
				return responseJson;
			});
	}
};

export const loadSubscribers = async (project: any) => {
	let restToken = await logIn(project);

	let request: string = config.host + 'partner/subscribers?access_token=' + restToken;

	return axios.get(request)
		.then(response => response.data)
		.catch(error => error);
};

export const findSubscribers = (type: string, value: string) => {
	const filterType: string = type === 'userId' ? '/' : '/' + type + '/';
	let request: string = config.host + 'partner/subscribers' + filterType + value + '?access_token=' + config.restToken();

	return axios.get(request)
		.then(response => {
			let result = response.data;

      return result.result === 'OK' ? result.subscriber ? [result.subscriber] : result.subscribers : [];
		})
		.catch(error => {
			return [];
		});
};

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

const loadingState: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = (value: boolean) => {
	return async (dispatch: Dispatch<IState>): Promise<Action> => {
		return dispatch({
			type: types.SET_LOADING_STATUS,
			value
		});
	};
};

const setActiveProject = ReduxActions.createAction<any, number>(
	types.SET_ACTIVE_PROJECT,
	(project: any) => project
);

const getSubscribers = ReduxActions.createAction<any, any, string>(
	types.LOAD_SUBSCRIBERS,
	(project: any) => loadSubscribers(project)
);

const setActiveSubscriber = ReduxActions.createAction<any, any, string>(
	types.SET_ACTIVE_SUBSCRIBER,
	(subscriber: any) => subscriber
);










const getLicenses = ReduxActions.createAction<any, subscribersModel>(
	types.LOAD_LICENSES,
	() => loadLicenses()
);



const searchSubscriber = ReduxActions.createAction<any, string, string>(
	types.SEARCH_SUBSCRIBERS,
	(type: string, value: string) => findSubscribers(type, value)
);






const addSubscriber: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = (data: any) => {
	return async (dispatch: Dispatch<IState>): Promise<Action> => {
		let result = await addNewSubscriber(data);

		return dispatch({
			type: types.ADD_SUBSCRIBER,
			result
		});
	};
};





/* ------------------------------------------------------------------------------------------------------------------ */


// let test = async () => {
// 	console.log(123213);
// };
//
//
// const reduxAction: ActionCreator<Action> = (text: string) => {
//   return {
//     type: 'qqq',
//     text
//   };
// };
//
// const asyncThinkAction: ActionCreator<
//   ThunkAction<Promise<Action>, IState, void>
//   > = () => {
//   return async (dispatch: Dispatch<IState>): Promise<Action> => {
//     try {
//       const text = await test();
//       return dispatch({
//         type: 'qqq',
//         text
//       });
//     } catch (e) {}
//   };
// };



















export {
	loadingState,
	setActiveProject,
	getSubscribers,
	setActiveSubscriber,



	getLicenses,
	searchSubscriber,
	addSubscriber
}