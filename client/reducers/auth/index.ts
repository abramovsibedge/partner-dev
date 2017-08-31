import { handleActions, Action } from 'redux-actions';
import { AuthModel, IState } from './model';

import *  as types from './constants';

const initialState: IState = <AuthModel>{
    errorMessages: ''
};

export default handleActions<IState>({
    [`${types.ACTIONS_SIGNIN}_LOADING`] : (state: IState, action: Action<string>) : IState => {
        return {statusAuth: false, errorMessages: ''};
    },
    [`${types.ACTIONS_SIGNIN}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
        return {statusAuth: true, errorMessages: ''};
    },
    [`${types.ACTIONS_SIGNIN}_ERROR`] : (state: IState, action: Action<string>) : IState => {
        return {statusAuth: false, errorMessages: action.payload};
    },

}, initialState);