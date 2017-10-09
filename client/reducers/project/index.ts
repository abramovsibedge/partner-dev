import { handleActions, Action } from 'redux-actions';
import { projectModel, IProject } from './model';

import * as types from './constants';

const initialState: IProject = <projectModel>{
	loading: true,


	subscriberLoading: true,
	traffic: null,
	devices: null,

	data: null,
	sessions: null,
	purchases: null
};

export default handleActions<any>({
	[`${types.LOAD_PROJECT}_SUCCESS`] : (state: IProject, action: Action<string>) : IProject => {
		return {
			...state,
			loading: false
		};
	},







	[`${types.DELETE_PROJECT}`] : (state: IProject, action: Action<string>) : IProject => {
		return {
			...state,
			subscriberLoading: action['value']
		};
	}
}, initialState);