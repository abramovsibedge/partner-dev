import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import * as types from './constants';

import {storageHelper} from '../../utils';
const storage = new storageHelper;

import axios from 'axios';
import config from '../../config';

export const loadTraffic = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/traffic?access_token=' + config.restToken;

	return axios.get(request)
		.then(response => response.data)
		.catch(error => error);
};

export const changeSubscriber = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '?access_token=' + config.restToken;

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return axios.put(request)
		.then(response => response);
};

export const changeLimit = (id: any, params: any) => {
	let request:string = config.host + 'partner/subscribers/' + id + '/traffic?access_token=' + config.restToken;

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return axios.post(request)
		.then(response => response);
};

export const loadSessions = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/sessions?access_token=' + config.restToken;

	for(let k in params) {
		request += '&'+k+'='+params[k];
	}

	return axios.get(request)
		.then(response => response);
};

export const loadDevices = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/devices?access_token=' + config.restToken;

	return axios.get(request)
		.then(response => response);
};

export const removeDevice = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/devices/' + params + '?access_token=' + config.restToken;

	return axios.delete(request)
		.then(response => response);
};

export const loadPurchases = (id: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/purchase?access_token=' + config.restToken;

	return axios.get(request)
		.then(response => response);
};

export const removePurchase = (id: any, params: any) => {
	let request: string = config.host + 'partner/subscribers/' + id + '/purchase?access_token=' + config.restToken + '&purchase_id='+params;

	return axios.delete(request)
		.then(response => response);
};


const getTraffic = ReduxActions.createAction<any, any>(
	types.LOAD_TRAFFIC,
	(id: any) => loadTraffic(id)
);

const modifySubscriber = ReduxActions.createAction<any, any, any>(
	types.MODIFY_SUBSCRIBER,
	(id: any, data: any) => changeSubscriber(id, data)
);

const setLimit = ReduxActions.createAction<any, any, any>(
	types.SET_LIMIT,
	(id: any, data: any) => changeLimit(id, data)
);

const getSessions = ReduxActions.createAction<any, any, any>(
	types.GET_SESSIONS,
	(id: any, data: any) => loadSessions(id, data)
);

const getDevices = ReduxActions.createAction<any, any, any>(
	types.GET_DEVICES,
	(id: any) => loadDevices(id)
);

const deleteDevice = ReduxActions.createAction<any, any, any>(
	types.GET_DEVICES,
	(id: any, params: any) => removeDevice(id, params)
);

const getPurchases = ReduxActions.createAction<any, any, any>(
	types.GET_PURCHASES,
	(id: any) => loadPurchases(id)
);

const deletePurchase = ReduxActions.createAction<any, any, any>(
	types.GET_PURCHASES,
	(id: any, params: any) => removePurchase(id, params)
);

export {
  getTraffic,
	modifySubscriber,
	setLimit,
	getSessions,
	getDevices,
	deleteDevice,
	getPurchases,
	deletePurchase
}