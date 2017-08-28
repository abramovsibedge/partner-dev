import { handleActions, Action } from 'redux-actions';
import { AuthModel, IState } from './model';

import *  as types from './constants';

const initialState: IState = <AuthModel>{
    statusSignin: false
};

export default handleActions<IState, AuthModel>({
    [types.CNANGE_STATUS_SIGNIN] : (state: IState, action: Action<AuthModel>) : IState => {
        return [statusSignin: action.payload.status , ...state];
    },

}, initialState);