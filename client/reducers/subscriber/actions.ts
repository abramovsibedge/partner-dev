import * as ReduxActions from "redux-actions";
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';

import axios from 'axios';
import config from '../../config';

import { ISubscriber } from './model';
import * as types from './constants';

/* Change loading state */
export const loadingState: ActionCreator<ThunkAction<Promise<Action>, ISubscriber, void>> = (value: boolean) => {
	return async (dispatch: Dispatch<ISubscriber>): Promise<Action> => {
		return dispatch({
			type: types.SUBSCRIBER_LOADING_STATUS,
			value
		});
	};
};
/**/

/* Load subscriber traffic */
const loadTraffic = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/traffic?access_token=' + config.restToken();

	return axios.get(request).then(response => response.data);
};

export const getTraffic = ReduxActions.createAction<any, any>(
	types.GET_TRAFFIC,
	(id: any) => loadTraffic(id)
);
/**/

/* Load subscriber sessions */
const loadSessions = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/sessions?access_token=' + config.restToken();

	for (let k in params) {
		if (params.hasOwnProperty(k)) {
			request += '&' + k + '=' + params[k];
		}
	}

	return axios.get(request).then(response => response);
};

export const getSessions = ReduxActions.createAction<any, any, any>(
	types.GET_SESSIONS,
	(id: any, data: any) => loadSessions(id, data)
);
/**/

/* Load subscriber devices */
const loadDevices = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/devices?access_token=' + config.restToken();

	return axios.get(request).then(response => response.data)
};

export const getDevices = ReduxActions.createAction<any, any>(
	types.GET_DEVICES,
	(id: any) => loadDevices(id)
);
/**/

/* Load subscriber purchases */
const loadPurchases = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/purchase?access_token=' + config.restToken();

	return axios.get(request).then(response => response);
};
export const getPurchases = ReduxActions.createAction<any, any, any>(
	types.GET_PURCHASES,
	(id: any) => loadPurchases(id)
);
/**/

/* Change subscriber data */
const changeSubscriber = async (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '?access_token=' + config.restToken();

	for(let k in params) {
		if (params.hasOwnProperty(k)) {
			request += '&' + k + '=' + params[k];
		}
	}

	return axios.put(request).then(response => response);
};

export const modifySubscriber: ActionCreator<ThunkAction<Promise<Action>, ISubscriber, void>> = (id: any, data: any) => {
	return async (dispatch: Dispatch<ISubscriber>): Promise<Action> => {
		let result = await changeSubscriber(id, data);

		return dispatch({
			type: types.MODIFY_SUBSCRIBER,
			result
		});
	};
};
/**/

/* Delete device */
const removeDevice = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/devices/' + params + '?access_token=' + config.restToken();

	return axios.delete(request).then(response => response);
};

export const deleteDevice = ReduxActions.createAction<any, any, any>(
	types.REMOVE_DEVICE,
	(id: any, params: any) => removeDevice(id, params)
);
/**/

/* Delete purchase */
const removePurchase = async (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/purchase?access_token=' + config.restToken() + '&purchase_id='+params;

	return axios.delete(request).then(response => response);
};

export const deletePurchase: ActionCreator<ThunkAction<Promise<Action>, ISubscriber, void>> = (id: any, params: any) => {
	return async (dispatch: Dispatch<ISubscriber>): Promise<Action> => {
		let result = await removePurchase(id, params);

		return dispatch({
			type: types.REMOVE_PURCHASE,
			result
		});
	};
};
/**/

/* Set limit for subscriber */
const changeLimit = async (type: string, id: any, params: any) => {
	let request:string = config.host + 'partner/subscribers/' + id + '/traffic?access_token=' + config.restToken();

	if (type === 'update') {
		for(let k in params) {
			if (params.hasOwnProperty(k)) {
				request += '&' + k + '=' + params[k];
			}
		}

		return axios.post(request).then(response => response);
	} else {
		return axios.delete(request).then(response => response);
	}
};

export const setLimit: ActionCreator<ThunkAction<Promise<Action>, ISubscriber, void>> = (type: string, id: any, data: any) => {
	return async (dispatch: Dispatch<ISubscriber>): Promise<Action> => {
		let result = await changeLimit(type, id, data);

		return dispatch({
			type: types.SET_LIMIT,
			result
		});
	};
};
/**/