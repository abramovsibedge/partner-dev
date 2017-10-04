import { handleActions, Action } from 'redux-actions';
import { subscriberModel, IState } from './model';

import * as types from './constants';

const initialState: IState = <subscriberModel>{
	subscriberLoading: true,
	traffic: null,
	devices: null,

	data: null,
	sessions: null,
	purchases: null
};

export default handleActions<any>({
	[`${types.SUBSCRIBER_LOADING_STATUS}`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			subscriberLoading: action['value']
		};
	},

	[`${types.LOAD_TRAFFIC}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			traffic: action.payload,
			subscriberLoading: false
		};
	},
	[`${types.GET_DEVICES}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			devices: action.payload['devices']
		};
	},
	[`${types.GET_SESSIONS}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			sessions: action.payload['data'].sessions
		};
	},
	[`${types.GET_PURCHASES}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			purchases: action.payload['data'].purchases
		};
	}
}, initialState);