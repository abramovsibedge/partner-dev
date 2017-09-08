import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import *  as types from './constants';


export const reset = (email: string) => {
    return firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            return true;
        })
        .catch((error: any) => {
            throw (error.message);
        });
};

const actionReset = ReduxActions.createAction<any, string>(
    types.ACTIONS_RESET,
    (email: string) => reset(email)
)

export {
    actionReset
}