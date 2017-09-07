import * as firebase from 'firebase';
import * as ReduxActions from "redux-actions";
import *  as types from './constants';

import { SignUpModel} from './model';

export const signUp = (state: SignUpModel) => {
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

            return true;
        })
        .catch((error: any) => {
            throw (error.message);
        });
};

const actionSignUp = ReduxActions.createAction<any, SignUpModel>(
    types.ACTIONS_SIGNUP,
    (staty: SignUpModel) => signUp(staty)
)

export {
    actionSignUp
}