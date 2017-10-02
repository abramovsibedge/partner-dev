import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import * as types from './constants';


import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {storageHelper} from '../../utils';
const storage = new storageHelper;

import axios from 'axios';
import config from '../../config';

import { IState } from './model';

export const loadTraffic = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/traffic?access_token=' + config.restToken();

	return axios.get(request)
		.then(response => response.data)
		.catch(error => error);
};

export const loadDevices = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/devices?access_token=' + config.restToken();

	return axios.get(request)
		.then(response => response.data)
		.catch(error => error);
};

const changeSubscriber = async (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '?access_token=' + config.restToken();

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return axios.put(request).then(response => response);
};

const changeLimit = async (type: string, id: any, params: any) => {
	let request:string = config.host + 'partner/subscribers/' + id + '/traffic?access_token=' + config.restToken();

	if (type === 'update') {
		for(let k in params) {
			request += '&'+k+'='+params[k];
		}

		return axios.post(request).then(response => response);
	}

	return axios.delete(request).then(response => response);
};

export const loadSessions = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/sessions?access_token=' + config.restToken();

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return axios.get(request)
		.then(response => response);
};

export const removeDevice = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/devices/' + params + '?access_token=' + config.restToken();

	return axios.delete(request)
		.then(response => response);
};

export const loadPurchases = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/purchase?access_token=' + config.restToken();

	return axios.get(request)
		.then(response => response);
};

const removePurchase = async (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/purchase?access_token=' + config.restToken() + '&purchase_id='+params;

	return axios.delete(request)
		.then(response => response);
};

const loadingState: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = (value: boolean) => {
	return async (dispatch: Dispatch<IState>): Promise<Action> => {
		return dispatch({
			type: types.SUBSCRIBER_LOADING_STATUS,
			value
		});
	};
};

const setLimit: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = (type: string, id: any, data: any) => {
	return async (dispatch: Dispatch<IState>): Promise<Action> => {
		let result = await changeLimit(type, id, data);

		return dispatch({
			type: types.SET_LIMIT,
			result
		});
	};
};

const modifySubscriber: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = (id: any, data: any) => {
	return async (dispatch: Dispatch<IState>): Promise<Action> => {
		let result = await changeSubscriber(id, data);

		return dispatch({
			type: types.MODIFY_SUBSCRIBER,
			result
		});
	};
};

const getTraffic = ReduxActions.createAction<any, any>(
	types.LOAD_TRAFFIC,
	(id: any) => loadTraffic(id)
);

const getDevices = ReduxActions.createAction<any, any>(
	types.GET_DEVICES,
	(id: any) => loadDevices(id)
);

const getSessions = ReduxActions.createAction<any, any, any>(
	types.GET_SESSIONS,
	(id: any, data: any) => loadSessions(id, data)
);

const deleteDevice = ReduxActions.createAction<any, any, any>(
	types.GET_DEVICES,
	(id: any, params: any) => removeDevice(id, params)
);

const getPurchases = ReduxActions.createAction<any, any, any>(
	types.GET_PURCHASES,
	(id: any) => loadPurchases(id)
);

const deletePurchase: ActionCreator<ThunkAction<Promise<Action>, IState, void>> = (id: any, params: any) => {
	return async (dispatch: Dispatch<IState>): Promise<Action> => {
		let result = await removePurchase(id, params);

		return dispatch({
			type: types.GET_PURCHASES,
			result
		});
	};
};

export {
	loadingState,
  getTraffic,
	modifySubscriber,
	setLimit,
	getSessions,
	getDevices,
	deleteDevice,
	getPurchases,
	deletePurchase
}