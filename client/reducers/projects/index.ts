import { handleActions, Action } from 'redux-actions';
import { projectsModel, IPojects } from './model';

import * as types from './constants';

const initialState: IPojects = <projectsModel>{
  list: [],
  loading: true,
  selectedProject: {},
  update_project: false,
  createProjectResult: false
};

export default handleActions<any>({
  [`${types.LOAD_PROJECTS}_LOADING`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      loading: true
    };
  },
  [`${types.LOAD_PROJECTS}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      list: action.payload['projects'],
      loading: false
    };
  },
  [`${types.LOAD_PROJECTS}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      loading: false
    };
  },

  [`${types.LOAD_PROJECT}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      selectedProject: action.payload,
      update_project: false,
    };
  },

  [`${types.SET_VISIBILITY}_LOADING`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: false,
    };
  },
  [`${types.SET_VISIBILITY}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: true,
    };
  },
  [`${types.SET_VISIBILITY}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: false,
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
      update_project: false,
    };
  },
  [`${types.ADD_USER}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: true,
    };
  },
  [`${types.ADD_USER}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      update_project: false,
    };
  },

  [`${types.CREATE_PROJECT}_LOADING`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      createProjectResult: false,
    };
  },
  [`${types.CREATE_PROJECT}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      createProjectResult: true,
    };
  },
  [`${types.CREATE_PROJECT}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      ...state,
      createProjectResult: false,
    };
  },

}, initialState);

