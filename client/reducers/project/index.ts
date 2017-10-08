import { handleActions, Action } from 'redux-actions';
import { projectModel, IProject } from './model';

import * as types from './constants';

const initialState: IProject = <projectModel>{
	subscriberLoading: true,
	traffic: null,
	devices: null,

	data: null,
	sessions: null,
	purchases: null
};

export default handleActions<any>({
	[`${types.DELETE_PROJECT}`] : (state: IProject, action: Action<string>) : IProject => {
		return {
			...state,
			subscriberLoading: action['value']
		};
	}
}, initialState);