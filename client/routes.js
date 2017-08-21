"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const app_1 = require("./routes/app");
const _1 = require("./routes/main/");
const _2 = require("./routes/auth/");
const reset_1 = require("./routes/auth/reset");
const signin_1 = require("./routes/auth/signin");
const signup_1 = require("./routes/auth/signup");
const _3 = require("./routes/projects/");
const _4 = require("./routes/subscribers/");
const _5 = require("./routes/404/");
exports.routes = (React.createElement(react_router_1.Route, { path: '/', component: app_1.App },
    React.createElement(react_router_1.IndexRoute, { component: _1.default }),
    React.createElement(react_router_1.Route, { path: 'projects', component: _3.Projects }),
    React.createElement(react_router_1.Route, { path: 'subscribers', component: _4.Subscribers }),
    React.createElement(react_router_1.Route, { path: 'auth', component: _2.Auth },
        React.createElement(react_router_1.Route, { path: 'reset', component: reset_1.Reset }),
        React.createElement(react_router_1.Route, { path: 'signin', component: signin_1.Signin }),
        React.createElement(react_router_1.Route, { path: 'signup', component: signup_1.Signup })),
    React.createElement(react_router_1.Route, { path: '*', component: _5.NotFound })));
exports.default = exports.routes;
//# sourceMappingURL=routes.js.map