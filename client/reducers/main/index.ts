import { handleActions, Action } from 'redux-actions';
import { MainModel, IState } from './model';

import *  as types from './constants';

const initialState: IState = [<MainModel>{
    id: 0
}];

export default handleActions<IState, MainModel>({
    [types.CHANGE_ID] : (state: IState, action: Action<MainModel>) : IState => {
        return [{
            id: 5,
        }, ...state];
    },
}, initialState);