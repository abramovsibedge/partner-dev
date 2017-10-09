import { handleActions, Action } from 'redux-actions';
import { subscriberModel, ISubscriber } from './model';

import * as types from './constants';

const initialState: ISubscriber = <subscriberModel>{
	subscriberLoading: true,
	traffic: null,
	sessions: null,
	devices: null,
	purchases: null
};

export default handleActions<any>({
	[`${types.SUBSCRIBER_LOADING_STATUS}`] : (state: ISubscriber, action: Action<string>) : ISubscriber => {
		return {
			...state,
			subscriberLoading: action['value']
		};
	},
	[`${types.GET_TRAFFIC}_SUCCESS`] : (state: ISubscriber, action: Action<string>) : ISubscriber => {
		return {
			...state,
			traffic: action.payload,
			subscriberLoading: false
		};
	},
	[`${types.GET_SESSIONS}_SUCCESS`] : (state: ISubscriber, action: Action<string>) : ISubscriber => {
		return {
			...state,
			sessions: action.payload['data'].sessions
		};
	},
	[`${types.GET_DEVICES}_SUCCESS`] : (state: ISubscriber, action: Action<string>) : ISubscriber => {
		return {
			...state,
			devices: action.payload['devices']
		};
	},
	[`${types.GET_PURCHASES}_SUCCESS`] : (state: ISubscriber, action: Action<string>) : ISubscriber => {
		return {
			...state,
			purchases: action.payload['data'].purchases
		};
	}
}, initialState);