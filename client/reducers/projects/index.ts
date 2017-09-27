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
      loading: true
    };
  },
  [`${types.LOAD_PROJECTS}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      list: action.payload['projects'],
      loading: false
    };
  },
  [`${types.LOAD_PROJECTS}_ERROR`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      loading: false
    };
  },

  [`${types.LOAD_PROJECT}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    return {
      selectedProject: action.payload['selectedProject'],
      loading: false
    };
  },

}, initialState);