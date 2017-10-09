import { handleActions, Action } from 'redux-actions';

import { projectsModel, IProjects } from './model';
import * as types from './constants';

const initialState: IProjects = <projectsModel>{
	loading: true,
	list: [],
	createProjectResult: false
};

export default handleActions<any>({
	[`${types.LOAD_PROJECTS}_SUCCESS`] : (state: IProjects, action: Action<string>) : IProjects => {
		return {
			...state,
			list: action.payload['projects'],
			loading: false
		};
	},
	[`${types.CREATE_PROJECT}_ERROR`] : (state: IProjects, action: Action<any>) : IProjects => {
		return {
			...state,
			createProjectResult: {
				type: 'error',
				reason: action.payload.response.data.error
			}
		};
	},
	[`${types.CREATE_PROJECT}_SUCCESS`] : (state: IProjects, action: Action<string>) : IProjects => {
		return {
			...state,
			createProjectResult: {
				type: 'success'
			}
		};
	}
}, initialState);

