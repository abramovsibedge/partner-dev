import { handleActions, Action } from 'redux-actions';

import { projectsModel, IPojects } from './model';
import * as types from './constants';

const initialState: IPojects = <projectsModel>{
	loading: true,
	list: [],
	createProjectResult: false,




	selectedProject: 0,
  update_project: false,
  reload_project: false,
};

export default handleActions<any>({
	[`${types.LOAD_PROJECTS}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
		return {
			...state,
			list: action.payload['projects'],
			loading: false
		};
	},
	[`${types.CREATE_PROJECT}_ERROR`] : (state: IPojects, action: Action<any>) : IPojects => {
		return {
			...state,
			createProjectResult: {
				type: 'error',
				reason: action.payload.response.data.error
			}
		};
	},
	[`${types.CREATE_PROJECT}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
		return {
			...state,
			createProjectResult: {
				type: 'success'
			}
		};
	},








  [`${types.SET_VISIBILITY}_LOADING`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: false,
    };
  },
  [`${types.SET_VISIBILITY}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: true,
    };
  },
  [`${types.SET_VISIBILITY}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: false,
    };
  },

	[`${types.ADD_AUTH}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
		return {
			...state,
			reload_project: true,
		};
	},

  [`${types.DELETE_PROJECT}_LOADING`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: false,
    };
  },
      [`${types.DELETE_PROJECT}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: true,
    };
  },
    [`${types.DELETE_PROJECT}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: false,
    };
  },

  [`${types.ADD_USER}_LOADING`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: false,
    };
  },
  [`${types.ADD_USER}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: true,
    };
  },
  [`${types.ADD_USER}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: false,
    };
  },

  [`${types.DELETE_USER}_LOADING`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: false,
    };
  },
  [`${types.DELETE_USER}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: true,
    };
  },
  [`${types.DELETE_USER}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      reload_project: false,
    };
  },


}, initialState);

