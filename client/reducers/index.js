"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const main_1 = require("./main");
const rootReducer = redux_1.combineReducers({
    mains: main_1.default
});
exports.default = rootReducer;
//# sourceMappingURL=index.js.map