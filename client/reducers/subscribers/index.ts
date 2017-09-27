import { handleActions, Action } from 'redux-actions';
import { subscribersModel, IState } from './model';

import * as types from './constants';

const initialState: IState = <subscribersModel>{
	activeProject: null,
	list: [],
	licenses: [],
	addSubscriberStatus: null,
	subscriber: null
};

export default handleActions<any>({
	[`${types.SET_ACTIVE_PROJECT}`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			activeProject: action.payload
		}
	},
	[`${types.LOAD_SUBSCRIBERS}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			list: action.payload['subscribers'],
			addSubscriberStatus: null
		}
	},
	[`${types.SEARCH_SUBSCRIBERS}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			list: action.payload
		}
	},
	[`${types.LOAD_LICENSES}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			licenses: action.payload
		}
	},
	[`${types.ADD_SUBSCRIBER}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			addSubscriberStatus: action.payload
		};
	}
}, initialState);