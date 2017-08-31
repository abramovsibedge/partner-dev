"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function emailValidation(email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}
exports.emailValidation = emailValidation;
//# sourceMappingURL=emailValidation.js.map