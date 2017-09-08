"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const storage = new utils_1.storageHelper;
const firebaseToken = storage.get('tokens') ? JSON.parse(storage.get('tokens')).firebaseToken : null;
exports.default = {
    host: 'https://vpn-backend.northghost.com/',
    firebaseToken,
    firebaseKey: ' AIzaSyBjJGXAQW9wuT7O1_bHMoLPaT6YSM1ELGU',
    firebaseAuthDomain: 'web-portal-for-partners.firebaseapp.com',
    firebasedatabaseURL: 'https://web-portal-for-partners.firebaseio.com',
    authState: null
};
//# sourceMappingURL=index.js.map