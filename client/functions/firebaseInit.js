"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const config_1 = require("../config");
exports.firebaseInit = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: config_1.default.firebaseKey,
            authDomain: config_1.default.firebaseAuthDomain,
            databaseURL: config_1.default.firebasedatabaseURL
        });
    }
};
//# sourceMappingURL=firebaseInit.js.map