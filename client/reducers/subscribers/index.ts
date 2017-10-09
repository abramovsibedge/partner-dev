import { handleActions, Action } from 'redux-actions';
import { subscribersModel, ISubscribers } from './model';

import * as types from './constants';

const initialState: ISubscribers = <subscribersModel>{
	subscribersLoading: true,
	activeProject: null,
	list: [],
	activeSubscriber: null,
	licenses: []
};

export default handleActions<any>({
	[`${types.SET_LOADING_STATUS}`] : (state: ISubscribers, action: Action<string>) : ISubscribers => {
		return {
			...state,
			subscribersLoading: action['value']
		};
	},
	[`${types.SET_ACTIVE_PROJECT}`] : (state: ISubscribers, action: Action<string>) : ISubscribers => {
		return {
			...state,
			activeProject: action.payload
		}
	},
	[`${types.LOAD_SUBSCRIBERS}_SUCCESS`] : (state: ISubscribers, action: Action<string>) : ISubscribers => {
		return {
			...state,
			subscribersLoading: false,
			list: action.payload['subscribers']
		}
	},
	[`${types.SET_ACTIVE_SUBSCRIBER}`] : (state: ISubscribers, action: Action<string>) : ISubscribers => {
		return {
			...state,
			activeSubscriber: action.payload
		}
	},
	[`${types.LOAD_LICENSES}_SUCCESS`] : (state: ISubscribers, action: Action<string>) : ISubscribers => {
		return {
			...state,
			licenses: action.payload
		}
	},
	[`${types.SEARCH_SUBSCRIBERS}_SUCCESS`] : (state: ISubscribers, action: Action<string>) : ISubscribers => {
		return {
			...state,
			list: action.payload,
			subscribersLoading: false
		}
	}
}, initialState);