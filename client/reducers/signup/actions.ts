import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import *  as types from './constants';

export const signUp = (state: any) => {
    return firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification();

            firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                first_name: state.firstName,
                last_name: state.lastName,
                company: state.companyName,
                email: state.email,
                plan: state.productsSelected,
                users: state.numberOfUsersSelected,
                tos: Math.floor((new Date()).getTime() / 1000),
                first: true
            });

            return {type: 'OK'};
        })
        .catch((error: any) => {
            return {type: 'error', error: error};
        });
};

const actionSignIn = ReduxActions.createAction<any, string, string>(
    types.ACTIONS_SIGNUP,
    (email: string, password: string) => signUp(email, password)
)

export {
    actionSignIn
}