import { handleActions, Action } from 'redux-actions';

import { projectsModel, IProjects } from './model';
import * as types from './constants';

const initialState: IProjects = <projectsModel>{
	loading: true,
	list: [],
	createProjectResult: false,




	selectedProject: 0,
  update_project: false,
  reload_project: false,
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
	},










	// [`${types.ADD_AUTH}_SUCCESS`] : (state: IProjects, action: Action<string>) : IProjects => {
		// return {
		// 	...state,
		// 	reload_project: true,
		// };
	// },
	//


}, initialState);

