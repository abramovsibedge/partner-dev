import { handleActions, Action } from 'redux-actions';
import { AuthModel, IState } from './model';

import *  as types from './constants';

const initialState: IState = <AuthModel>{
    errorMessages: '',
};

export default handleActions<IState>({
    [`${types.ACTIONS_SIGNUP}_LOADING`] : (state: IState, action: Action<string>) : IState => {
        return {statusSignUp: false, errorMessages: ''};
    },
    [`${types.ACTIONS_SIGNUP}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
        return {statusSignUp: true, errorMessages: ''};
    },
    [`${types.ACTIONS_SIGNUP}_ERROR`] : (state: IState, action: Action<string>) : IState => {
        return {statusSignUp: false, errorMessages: action.payload};
    },

}, initialState);