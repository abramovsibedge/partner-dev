"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const utils_1 = require("../utils");
const storage = new utils_1.storageHelper;
exports.check = () => {
    let isSigned = true;
    if (!storage.get('tokens'))
        isSigned = false;
    firebase.auth().onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
            const data = JSON.stringify({ firebaseToken: user.De });
            storage.add('tokens', data);
            storage.add('username', (user.displayName) ? user.displayName : user.email);
            isSigned = true;
        }
        else {
            storage.remove('tokens');
            storage.remove('username');
            isSigned = false;
        }
    });
    return isSigned;
};
exports.logOut = () => firebase.auth().signOut().then(() => {
    storage.remove('tokens');
    window.location.replace("/");
});
exports.signIn = (login, password) => {
    return firebase.auth().signInWithEmailAndPassword(login, password)
        .then((response) => {
        if (!response.emailVerified) {
            return { type: 'error', error: 'Please, verify your email before Sign In!' };
        }
    })
        .catch((error) => {
        return { type: 'error', error: error };
    });
};
exports.signUp = (state) => {
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
        return { type: 'OK' };
    })
        .catch((error) => {
        return { type: 'error', error: error };
    });
};
exports.reset = (email) => {
    return firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
        return { type: 'OK' };
    })
        .catch((error) => {
        return { type: 'error', error: error };
    });
};
//# sourceMappingURL=auth.js.map