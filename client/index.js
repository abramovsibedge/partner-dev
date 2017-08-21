"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const react_router_1 = require("react-router");
// redux
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const redux_logger_1 = require("redux-logger");
const routes_1 = require("./routes");
const reducers_1 = require("./reducers");
const logger = redux_logger_1.createLogger({ duration: true });
const initialState = {};
const store = redux_1.createStore(reducers_1.default, initialState, redux_1.applyMiddleware(logger));
react_dom_1.render((React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_1.Router, { routes: routes_1.routes, history: react_router_1.browserHistory }))), document.getElementById('root'));
//# sourceMappingURL=index.js.map