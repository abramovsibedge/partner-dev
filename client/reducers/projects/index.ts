import { handleActions, Action } from 'redux-actions';
import { projectsModel, IPojects } from './model';

import * as types from './constants';

const initialState: IPojects = <projectsModel>{
  list: [],
  loading: true,
  selectedProject: {}
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
      loading: false
    };
  },

  

}, initialState);