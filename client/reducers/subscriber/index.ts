import { handleActions, Action } from 'redux-actions';
import { subscriberModel, IState } from './model';

import * as types from './constants';

const initialState: IState = <subscriberModel>{
	data: null,
	sessions: null,
	devices: null,
	purchases: null
};

export default handleActions<any>({
	[`${types.LOAD_TRAFFIC}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			data: action.payload
		};
	},
	[`${types.GET_DEVICES}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			devices: action.payload['data'].devices
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