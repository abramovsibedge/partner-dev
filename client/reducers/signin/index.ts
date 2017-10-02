import { handleActions, Action } from 'redux-actions';
import { SignInModel, IState } from './model';

import *  as types from './constants';

const initialState: IState = <SignInModel>{
    errorMessages: '',
};

export default handleActions<any>({
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