import { handleActions, Action } from 'redux-actions';
import { subscribersModel, IState } from './model';

import * as types from './constants';

const initialState: IState = <subscribersModel>{
	subscribersLoading: true,
	activeProject: null,
	activeSubscriber: null,


	list: [],
	licenses: [],
	addSubscriberStatus: null,
	subscriber: null
};

export default handleActions<any>({
	[`${types.SET_LOADING_STATUS}`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			subscribersLoading: action['value']
		};
	},
	[`${types.SET_ACTIVE_PROJECT}`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			activeProject: action.payload
		}
	},
	[`${types.LOAD_SUBSCRIBERS}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			subscribersLoading: false,
			list: action.payload['subscribers'],
			addSubscriberStatus: null
		}
	},
	[`${types.SET_ACTIVE_SUBSCRIBER}`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			activeSubscriber: action.payload
		}
	},
	[`${types.SEARCH_SUBSCRIBERS}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			list: action.payload,
			subscribersLoading: false
		}
	},
	[`${types.LOAD_LICENSES}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		return {
			...state,
			licenses: action.payload
		}
	},
	[`${types.ADD_SUBSCRIBER}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
		console.log( action );

		return {
			...state,
			addSubscriberStatus: action.payload
		};
	},
	[`${types.ADD_SUBSCRIBER}_LOADING`] : (state: IState, action: Action<string>) : IState => {
		console.log( action );

		return {};
	},
	[`${types.ADD_SUBSCRIBER}_ERROR`] : (state: IState, action: Action<string>) : IState => {
		console.log( action );

		return {};
	}
}, initialState);