import { handleActions, Action } from 'redux-actions';
import { resetModelStatus, IState } from './model';

import *  as types from './constants';

const initialState: IState = <resetModelStatus>{
    errorMessages: ''
};

export default handleActions<IState>({

    [`${types.ACTIONS_RESET}_LOADING`] : (state: IState, action: Action<string>) : IState => {
        return {statusReset: false, errorMessages: ''};
    },
    [`${types.ACTIONS_RESET}_SUCCESS`] : (state: IState, action: Action<string>) : IState => {
        return {statusReset: true};
    },
    [`${types.ACTIONS_RESET}_ERROR`] : (state: IState, action: Action<string>) : IState => {
        return {statusReset: false, errorMessages: action.payload};
    },

}, initialState);