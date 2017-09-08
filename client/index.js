"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const react_router_1 = require("react-router");
const routes_1 = require("./routes");
react_dom_1.render((React.createElement(react_router_1.Router, { routes: routes_1.routes, history: react_router_1.browserHistory })), document.getElementById('root'));
//# sourceMappingURL=index.js.map