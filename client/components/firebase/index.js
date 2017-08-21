"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const config = {
    apiKey: " AIzaSyALn32lO1RSMPiBopHtUFNx2wiJs5uu-Fw",
    authDomain: "partner-dev-88932.firebaseapp.com",
    databaseURL: "https://partner-dev-88932.firebaseio.com"
};
exports.firebaseApp = firebase.initializeApp(config);
exports.db = exports.firebaseApp.database();
exports.auth = exports.firebaseApp.auth();
//# sourceMappingURL=index.js.map