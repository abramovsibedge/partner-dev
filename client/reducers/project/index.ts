import { handleActions, Action } from 'redux-actions';
import { projectModel, IProject } from './model';

import * as types from './constants';

const initialState: IProject = <projectModel>{
	loading: true,
	data: null,
	updateProject: false
};

export default handleActions<any>({
	[`${types.LOAD_PROJECT}_SUCCESS`] : (state: IProject, action: Action<string>) : IProject => {
		return {
			...state,
			loading: false,
			data: action.payload,
			updateProject: false
		};
	},
	[`${types.SET_VISIBILITY}_SUCCESS`] : (state: IProject) : IProject => {
		return {
			...state,
			updateProject: true
		};
	},
	[`${types.DELETE_USER}_SUCCESS`] : (state: IProject) : IProject => {
		return {
			...state,
			updateProject: true
		};
	},
	[`${types.ADD_USER}_SUCCESS`] : (state: IProject, action: Action<string>) : IProject => {
	  return {
	    ...state,
			updateProject: true,
	  };
	}
}, initialState);