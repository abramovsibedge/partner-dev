import { handleActions, Action } from 'redux-actions';
import { projectsModel, IPojects } from './model';

import * as types from './constants';

const initialState: IPojects = <projectsModel>{
	list: []
};

export default handleActions<any>({
    [`${types.LOAD_PROJECTS}_SUCCESS`] : (state: IPojects, action: Action<string>) : IPojects => {
    	return {
				list: action.payload['projects']
			};
    }
}, initialState);