"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const types = require("./constants");
const initialState = [{
        id: 0
    }];
exports.default = redux_actions_1.handleActions({
    [types.ADD_ID]: (state, action) => {
        return [{
                id: 5,
            }, ...state];
    },
}, initialState);
//# sourceMappingURL=index.js.map