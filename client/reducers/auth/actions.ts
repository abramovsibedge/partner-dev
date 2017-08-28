import * as ReduxActions from "redux-actions";

import *  as types from './constants';

import { AuthModel, IState } from './model';

const changeStatusSignIn = ReduxActions.createAction<AuthModel, AuthModel>(
    types.CNANGE_STATUS_SIGNIN,
    (authmodel: AuthModel) => ({authmodel})
)

export {
    changeStatusSignIn
}