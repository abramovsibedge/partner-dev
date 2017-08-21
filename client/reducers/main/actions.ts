import { createAction, Action } from 'redux-actions';

import *  as types from './constants';

import { MainModel, IState } from './model';

const addId = createAction<void>(
    types.ADD_ID,
    () => {}
);

export {
    addId
}